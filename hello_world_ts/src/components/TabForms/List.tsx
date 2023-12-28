
import { Typography, Divider, Box, Stack, Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get_all_teams } from '../../api/msApi/teams';

const UserList = () => {
  const dispatch = useDispatch<any>();
  const [userListData, setuserListData] = useState([]);

  useEffect(() => {

    dispatch(
      get_all_teams((response: any) => {
        if (response) {
          setuserListData(response)
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
        <Stack className="tableContainer" id="column" direction="row" spacing={10}>
          <Stack className="thead">
            <Typography variant="body1">Name</Typography>
          </Stack>
          <Stack className="thead">
            <Typography variant="body1">Email</Typography>
          </Stack>
          <Stack className="thead">
            <Typography variant="body1">Phone</Typography>
          </Stack>
          <Stack className="thead">
            <Typography variant="body1">Gender</Typography>
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

        {userListData
          ?.filter((item: any, index: any) => {
            <Box
              className="tableContainer"
              id="2ndrow"
              sx={{
                padding: 1,
              }}
            >
              <Stack
                id="icon and  name"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Stack
                  id="icon"
                  sx={{
                    height: "35px",
                    width: "35px",
                    borderRadius: "50%",
                    backgroundColor: "#0ededa",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    marginRight: 1,
                    textTransform: "uppercase",
                  }}
                >
                  <Typography
                    sx={{
                      color: "rgb(255 255 255 / 78%)",
                      fontSize: "14px",
                    }}
                  >
                    {item[1]?.displayName?.toUpperCase()}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "rgb(4, 24, 54)",
                      fontWeight: 550,
                    }}
                  >
                    {/* {userProfileName} */}
                  </Typography>
                </Stack>
              </Stack>

              <Stack className="roleWrapper">
                <Typography
                  sx={{
                    color: "rgb(11, 114, 196)",
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* <small>Role:</small> */}

                </Typography>
              </Stack>
              <Stack className="teamActionBtn">
                <Button
                  // onClick={() => {
                  //   onClickActionButton(userListData);
                  // }}
                  sx={{
                    opacity: 0.2,
                  }}
                  disabled
                >edit
                </Button>
              </Stack>

            </Box>
          })}
      </Box>
    </Stack>
  )
}

export default UserList
