import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch } from "react-redux";
import { login } from '../../api/user';
import { useState } from 'react';
import UserList from './List';

const User = () => {
    const dispatch = useDispatch<any>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [userListData, setUserListData] = useState<any>([]);
    const handleSubmit = () => {
        let body = {
            name: name,
            username: email,
            password: "Pooja!2345",
            otp: false,
        };
        console.log("api send data====", body)
        dispatch(
            login(body, (response: any) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    if ("response" in response) {
                        console.log("api response ====", response)
                        setUserListData(response)
                    }
                } else {
                    console.log("api error===", response?.data?.message);
                }
            })
        );
    };

    return (
        <><Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: 200 },
            }}
            noValidate
            autoComplete="on"
        >
            <TextField
                id="outlined-required"
                label="Name"
                onChange={(event: any) => setName(event.target.value)} />
            <TextField
                id="outlined-required"
                label="Email"
                onChange={(event: any) => setEmail(event.target.value)} />
            <TextField
                id="outlined-password-input"
                label="Phone"
                onChange={(event: any) => setPhone(event.target.value)} />
            <TextField
                id="outlined-read-only-input"
                label="Gender"
                onChange={(event: any) => setGender(event.target.value)} />
            <Button sx={{ mt: 1, width: 200, mb: 1, height: 50 }}
                variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Box>
            <Box sx={{ mt: 1, ml: 1, mr: 1 }}>
                <Typography variant="h4">
                    User List
                </Typography>
                {/* <UserList userListData={userListData} /> */}
            </Box></>
    )
}

export default User
