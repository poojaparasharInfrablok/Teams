import { Box, Divider, Stack, Typography } from '@mui/material'
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { TeamsFxContext } from '../../components/Context';
import { get_all_teams_member } from '../../api/msApi/member';

const TeamMember = (memberData: any) => {
    const dispatch = useDispatch<any>();
    const teamsUserCredential = useContext(TeamsFxContext);
    const [access_token, setaccess_token] = useState("")
    console.log("memberData====", memberData)
    useEffect(() => {
        if (teamsUserCredential) {
            let token: any = teamsUserCredential;

            setaccess_token(token?.ssoToken?.token);
        }
        dispatch(
            get_all_teams_member(access_token, (response: any) => {
                if (response) {

                    console.log("AccessToken =====", access_token)
                    //setuserListData(response)
                    console.log("api response ====", response)
                } else {
                    console.log("api error===", response);
                }
            })
        );
    }, [dispatch])

    return (
        <Stack
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
                <Stack className="tableContainer" id="column" direction="row" spacing={10} >
                    <Stack className="thead" sx={{ width: "18%", }}>
                        <Typography variant="body1">Name</Typography>
                    </Stack>
                    <Stack className="thead" sx={{ width: "18%", }}>
                        <Typography variant="body1">Discription</Typography>
                    </Stack>
                </Stack>
                <Divider className="thead"></Divider>

                {memberData?.filter((item: any) => (
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
                                {item?.description?.slice(0, 15) + "..." || "----"}
                            </Typography>
                        </Stack>

                    </Stack>
                ))}

            </Box>
        </Stack>
    )
}

export default TeamMember
