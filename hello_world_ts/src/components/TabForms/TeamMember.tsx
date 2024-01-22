import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TeamsFxContext } from '../Context';
import { useData } from '@microsoft/teamsfx-react';
import { chat_with_team_member, get_all_teams_member, send_message_to_team_member } from '../../api/msApi/member';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField, Typography } from '@mui/material'

const TeamMember = () => {
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const { teamDetail } = location.state ? location?.state : "";
    const { teamsUserCredential } = useContext(TeamsFxContext);
    const [open, setOpen] = useState(false);
    const [teamMemberData, setTeamMemberData] = useState([]);
    const [toChatMemberDetail, setToChatMemberDetail] = useState<any>();

    const loggedInUserDetail = useData(async () => {
        if (teamsUserCredential) {
            const userInfo = await teamsUserCredential.getUserInfo();
            return userInfo;
        }
    });
    useEffect(() => {
        dispatch(
            get_all_teams_member(teamDetail?.id, (response: any) => {
                if (response) {
                    setTeamMemberData(response)
                } else {
                    console.log("api error===", response);
                }
            })
        );
    }, [dispatch, teamDetail?.id,])

    const handleClickOpen = (item: any) => {
        setOpen(true);
        setToChatMemberDetail(item)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMessageSend = (formData: any) => {
        setOpen(false);
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
                    "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${toChatMemberDetail?.userId}')`
                }
            ]
        }
        dispatch(
            chat_with_team_member(chatbody, (response: any) => {
                if (response !== null) {
                    console.clear()
                    console.log("chat api response=====",toChatMemberDetail)
                    let chat_id = response?.id;
                    let chatMemberName = toChatMemberDetail?.displayName;
                    let messageBody = {
                        "subject": null,
                        "body": {
                            "contentType": "html",
                            "content": "<attachment id=\"74d20c7f34aa4a7fb74e2b30004247c5\"></attachment>"
                        },
                        "attachments": [
                            {
                                "id": "74d20c7f34aa4a7fb74e2b30004247c5",
                                "contentType": "application/vnd.microsoft.card.thumbnail",
                                "contentUrl": null,
                                "content": `{\r\n  \"title\": \"Hello, ${toChatMemberDetail?.displayName}\",\r\n  \"subtitle\": \"<h3>This message is sent to you by  ${loggedInUserDetail?.data?.displayName}</h3>\",\r\n  \"text\": \"${formData.message} <br>\"}`,
                                "name": null,
                                "thumbnailUrl": null
                            }
                        ]

                    }

                    dispatch(send_message_to_team_member(messageBody, chat_id, (msgresponse: any) => {
                        if (msgresponse) {
                            console.log("message sent successfully!!!!!")
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
        <><Stack
            id="user role column"
            sx={{
                marginTop: 2,
                border: 1,
                borderColor: "#E8E8E8",
                padding: 1,
                borderRadius: "8px",
            }}
        >
            <Box id="user-role and action container">
                <Stack className="tableContainer" id="column" direction="row" spacing={10}>
                    <Stack className="thead" sx={{ width: "18%", }}>
                        <Typography variant="body1">Name</Typography>
                    </Stack>
                    <Stack className="thead" sx={{ width: "18%", }}>
                        <Typography variant="body1">Email</Typography>
                    </Stack>
                </Stack>
                <Divider className="thead"></Divider>

                {teamMemberData.length > 0 ? teamMemberData?.map((item: any) => (
                    <Stack
                        key={item?.id}
                        direction={"row"}
                        sx={{
                            display: "flex",
                            backgroundColor: "#FFFFFF",
                            padding: 2,
                            maxWidth: 1200,
                            minWidth: 200,
                        }}
                    >
                        <Stack
                            sx={{
                                display: "flex",
                                width: "22%",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    textTransform: "none",
                                    fontFamily: "Inter",
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: "#0A2540",
                                }}
                            >
                                {item?.displayName || "----"}
                            </Typography>
                        </Stack>
                        <Stack sx={{ display: "flex", width: "22%" }}>
                            <Typography
                                sx={{
                                    textTransform: "none",
                                    fontFamily: "Inter",
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: "#0A2540",
                                    marginLeft: 1,
                                }}
                            >
                                {item?.email || "----"}
                            </Typography>
                        </Stack>
                        <Stack sx={{ display: "flex", width: "22%" }}>
                            <Button variant="outlined" onClick={() => { handleClickOpen(item); }}>
                                Send Message
                            </Button>
                        </Stack>
                    </Stack>
                )) : "no record found"}

            </Box>
        </Stack>
            <Box id="user-role and action container" sx={{ width: 600, height: 600 }}  >
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            handleMessageSend(formJson);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Send Message to user</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="To"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={toChatMemberDetail?.email} />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="message"
                            name="message"
                            label="Message"
                            fullWidth
                            variant="standard" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {/* <Button type="submit" onClick={handleMessageSend}>Send</Button> */}
                        <Button type="submit" >Send</Button>
                    </DialogActions>
                </Dialog>
            </Box></>
    )

}

export default TeamMember
