import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack, TextField, Typography } from '@mui/material'
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { TeamsFxContext } from '../../components/Context';
import { get_all_teams_member } from '../../api/msApi/member';
import { useData } from '@microsoft/teamsfx-react';
import { useLocation } from 'react-router-dom';

const TeamMember = () => {
    const dispatch = useDispatch<any>();
    const location = useLocation();
    let { teamMemberDetail } = location.state;
    const { teamsUserCredential } = useContext(TeamsFxContext);
    const [teamMemberData, setTeamMemberData] = useState([]);
    const [senderEmail, setSenderEmail] = useState();
    const [open, setOpen] = useState(false);

    const access_token = useData(async () => {
        if (teamsUserCredential) {
            let token: any = teamsUserCredential.getToken("");
            return token;
        }
    });
    useEffect(() => {
        dispatch(
            get_all_teams_member(teamMemberDetail?.id, access_token, (response: any) => {
                if (response) {
                    setTeamMemberData(response)
                } else {
                    console.log("api error===", response);
                }
            })
        );
    }, [dispatch])

    const handleClickOpen = (item: any) => {
        setOpen(true);
        setSenderEmail(item?.email)
    };

    const handleClose = () => {
        setOpen(false);
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

                {teamMemberData?.map((item: any) => (
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
                ))}

            </Box>
        </Stack>
        <Box id="user-role and action container" sx={{ width: 600,height:600}}  >
                <Dialog                 
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            const email = formJson.email;
                            console.log(email);
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
                            value={senderEmail} />
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
                        <Button type="submit">Send</Button>
                    </DialogActions>
                </Dialog>
            </Box></>
    )

}

export default TeamMember
