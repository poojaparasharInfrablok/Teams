import { TabContext, TabPanel, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import { Box, Typography } from '@mui/material';
import React from 'react';
import User from "../../TabForms/User";
import UserList from "../../TabForms/List";
import { Welcome } from "../../sample/Welcome";
import config from "../../sample/lib/config";
import LoginUser from "../../TabForms/LoginUser";
const Dashboard = () => {
    const showFunction = Boolean(config.apiName);
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', mt: 1, ml: 5 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Create User" value="1" />
                        <Tab label="User List" value="2" />
                        <Tab label="Login User Info" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Box sx={{ mt: 1, ml: 1, mr: 1 }}> <Typography variant="h4" >
                        Create User Form
                    </Typography><User />
                    </Box>

                </TabPanel>
                <TabPanel value="2">
                    <Box sx={{ mt: 1, ml: 1, mr: 1 }}><UserList /></Box>
                </TabPanel>
                <TabPanel value="3">
                    <Box sx={{ mt: 1, ml: 1, mr: 1 }}>
                        {/* <Welcome showFunction={showFunction} /> */}
                        <LoginUser />
                    </Box>

                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default Dashboard
