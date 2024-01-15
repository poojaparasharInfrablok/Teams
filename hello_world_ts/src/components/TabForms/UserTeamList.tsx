
import { Typography, Divider, Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { TeamsFxContext } from '../../components/Context';
import { get_all_teams } from '../../api/msApi/teams';
import { useData } from '@microsoft/teamsfx-react';
import { useNavigate } from 'react-router-dom';

const UserTeamList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const [userListData, setuserListData] = useState([]);

  const { data } = useData(async () => {
    if (teamsUserCredential) {
      const token = teamsUserCredential.getToken("");
      return token;
    }
  });
  useEffect(() => {
    console.log("token before api====", data)
    dispatch(
      get_all_teams(data?.token, (response: any) => {
        if (response) {
          setuserListData(response)
          console.log("api response ====", response)
        } else {
          console.log("api error===", response);
        }
      })
    );
  }, [dispatch, data])

  const handleGetTeamMember = (item: any) => {
      navigate("/teammember", { state: { teamDetail: item } });
  }
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
          <Stack className="thead">
            <Typography
              sx={{
                fontSize: "16px",
                textAlign: "center",
                color: "rgb(11, 114, 196)",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Actions
            </Typography>
          </Stack>
        </Stack>
        <Divider className="thead"></Divider>
        {userListData?.map((item: any) => (
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
            <Stack sx={{ display: "flex", width: "16%", alignItems: "center" }}>
              <Stack
                direction={"row"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleGetTeamMember(item);
                }}
              >
                <Typography
                  sx={{
                    textTransform: "none",
                    color: "#2188FF",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "20px",
                    marginLeft: 5,
                    marginRight: 1,
                  }}
                >
                  {"Get Member"}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
        {/* {memberData ? <TeamMember memberData={memberData} /> : ""} */}
      </Box>
    </Stack>
  )
}

export default UserTeamList
