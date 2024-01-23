import React, { useContext, useEffect, useState } from 'react'
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Snackbar } from '@mui/material';
import { useData } from '@microsoft/teamsfx-react';
import { useDispatch } from 'react-redux';
import { get_all_teams } from '../../../api/msApi/teams';
import { TeamsFxContext } from '../../Context';
import { chat_with_team_member, get_all_teams_member, send_message_to_team_member } from '../../../api/msApi/member';

const ChatMessage = () => {
    const dispatch = useDispatch<any>();
    const { teamsUserCredential } = useContext(TeamsFxContext);
    const [toUserData, setToUserData] = useState<any>([]);
    // const [userAllTeamsData, setUserAllTeamsData] = useState([]);
    const [allTeamMembers, setAllTeamMembers] = useState([]);
    const [toUserMessage, setToUserMessage] = useState('');
    const [snackOpen, setSnackOpen] = useState(false);
    const { data } = useData(async () => {
        if (teamsUserCredential) {
            const token = teamsUserCredential.getToken("");
            return token;
        }
    });
    const loggedInUserDetail = useData(async () => {
        if (teamsUserCredential) {
            const userInfo = await teamsUserCredential.getUserInfo();
            return userInfo;
        }
    });
    useEffect(() => {
        // dispatch(
        //     get_all_teams(data?.token, (response: any) => {
        //         if (response) {
        //             setUserAllTeamsData(response)
        //         } else {
        //             console.log("api error===", response);
        //         }
        //     })
        // );
        let defaultTeam = "6df7b42c-0539-4ea9-9a0a-fd8f516c8a5e"
        dispatch(
            get_all_teams_member(defaultTeam, (response: any) => {
                if (response) {
                    setAllTeamMembers(response)
                } else {
                    console.log("api error===", response);
                }
            })
        );
    }, [dispatch, data])

    // const handleUserTeamChange = (event: any) => {
    //     teamId =event.target.value?.id
    //     let defaultTeam = "6df7b42c-0539-4ea9-9a0a-fd8f516c8a5e"
    //     dispatch(            
    //         get_all_teams_member(defaultTeam, (response: any) => {
    //             if (response) {
    //                 setAllTeamMembers(response)
    //             } else {
    //                 console.log("api error===", response);
    //             }
    //         })
    //     );
    // };
    const handleTeamMemberChange = (event: any) => {
        setToUserData(event.target.value)
        console.log("event.target.value=====", event.target.value)
    };
    const handleMessageSend = () => {
        let chatbody = {
            "chatType": "oneOnOne",
            "members": [
                {
                    "@odata.type": "#microsoft.graph.aadUserConversationMember",
                    "roles": [
                        "owner"
                    ],
                    "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${loggedInUserDetail?.data?.objectId}')`
                },
                {
                    "@odata.type": "#microsoft.graph.aadUserConversationMember",
                    "roles": ["owner"],
                    "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${toUserData?.userId}')`
                }
            ]
        }
        dispatch(
            chat_with_team_member(chatbody, (response: any) => {
                if (response !== null) {
                    let chat_id = response?.id;
                    let messageBody = {
                        "subject": null,
                        "body": {
                            "contentType": "html",
                            "content": `<attachment id=\"${chat_id}\"></attachment>`
                        },
                        "attachments": [
                            {
                                "id": `${chat_id}`,
                                "contentType": "application/vnd.microsoft.card.thumbnail",
                                "contentUrl": null,
                                "content": `{\r\n  \"title\": \"Hello, ${toUserData?.displayName}\",\r\n  \"subtitle\": \"<h3>This message is sent to you by  ${loggedInUserDetail?.data?.displayName}</h3>\",\r\n  \"text\": \"${toUserMessage} <br>\"}`,
                                "name": null,
                                "thumbnailUrl": null
                            }
                        ]
                    }
                    dispatch(send_message_to_team_member(messageBody, chat_id, (msgresponse: any) => {
                        if (msgresponse) {
                            setSnackOpen(true);
                        }
                        else {
                            console.log("api error===", msgresponse);
                        }
                    }))
                } else {
                    console.log("api error===", response);
                }
            })
        );
    };
    return (
        <Box
            component="form" noValidate autoComplete="off"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
        >
            <div>
                <FormControl sx={{ m: 2, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">Teams</InputLabel>
                    <Select autoWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={age}
                        label="Teams"
                    //onChange={handleUserTeamChange}
                    >
                        {/* {userAllTeamsData.map((item: any) => (
                            <MenuItem key={item?.id} value={item}>
                                {item?.displayName}
                            </MenuItem>
                        ))} */}
                        <MenuItem key={"6df7b42c-0539-4ea9-9a0a-fd8f516c8a5e"} value={"6df7b42c-0539-4ea9-9a0a-fd8f516c8a5e"}>
                            {"Infrablok Org"}
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 2, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">To</InputLabel>
                    <Select autoWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={age}
                        label="To"
                        onChange={handleTeamMemberChange}
                    >
                        {allTeamMembers.map((item: any) => (
                            <MenuItem key={item?.id} value={item}>
                                {item?.displayName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    required
                    value={toUserMessage}
                    onChange={(event: any) => { setToUserMessage(event.target.value); }}
                    placeholder="type your message....." />
            </div>
            <div>
                <Button variant="contained" onClick={handleMessageSend}>Submit</Button>
            </div>
            <Box sx={{ width: 500 }}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackOpen}
                    onClose={() => setSnackOpen(false)}
                    autoHideDuration={2000}
                >
                    <Alert
                        onClose={() => setSnackOpen(false)}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        message sent successfully...!!
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}

export default ChatMessage
