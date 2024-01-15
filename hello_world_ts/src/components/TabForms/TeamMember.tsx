import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField, Typography } from '@mui/material'
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { chat_with_team_member, get_all_teams_member } from '../../api/msApi/member';
import { useLocation } from 'react-router-dom';

const TeamMember = () => {
    const dispatch = useDispatch<any>();
    const location = useLocation();
    let { teamDetail } = location.state ? location?.state : "";
    const [teamMemberData, setTeamMemberData] = useState([]);
    const [toChatMemberDetail, setToChatMemberDetail] = useState<any>();
    const [open, setOpen] = useState(false);

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
    }, [dispatch])

    const handleClickOpen = (item: any) => {
        console.log("chat item=====", item)
        setOpen(true);
        setToChatMemberDetail(item)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMessageSend = (formData: any) => {
        setOpen(false);
        console.log("formData===", formData);

        let chatbody = {
            "chatType": "oneOnOne",
            "members": [
                {
                    "@odata.type": "#microsoft.graph.aadUserConversationMember",
                    "roles": [
                    ],
                    "user@odata.bind": `https://graph.microsoft.com/v1.0/users(${toChatMemberDetail?.userId})`
                }
            ],
            "topic": formData.Message
        }
        console.log("chat body===", chatbody);
        dispatch(
            chat_with_team_member(chatbody, (response: any) => {
                if (response) {
                    setTeamMemberData(response)
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
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={toChatMemberDetail?.email} />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="Message"
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
