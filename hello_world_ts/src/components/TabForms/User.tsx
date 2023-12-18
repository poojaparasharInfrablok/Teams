import { Button, Stack, TextField } from '@mui/material'
import { useDispatch } from "react-redux";
import { login } from '../../api/user';
import { useState } from 'react';

const User = () => {
    const dispatch = useDispatch<any>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const handleSubmit = () => {
        let body = {
            name: name,
            username: email,
            password: "Pooja!2345",
            otp: false,
        };
        console.log("api send data====", body)
        console.log("phone data====", phone)
        console.log("gender data====", gender)
        dispatch(
            login(body, (response: any) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    if ("response" in response) {
                        console.log("api response ====", response)
                    }
                } else {
                    console.log("api error===", response?.data?.message);
                }
            })
        );
    };

    return (
        <Stack
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-required"
                label="Name"
                onChange={(event: any) => setName(event.target.value)}
            />
            <TextField
                id="outlined-required"
                label="Email"
                onChange={(event: any) => setEmail(event.target.value)}
            />
            <TextField
                id="outlined-password-input"
                label="Phone"
                onChange={(event: any) => setPhone(event.target.value)}
            />
            <TextField
                id="outlined-read-only-input"
                label="Gender"
                onChange={(event: any) => setGender(event.target.value)}
            />
            <Stack spacing={2} direction="row" sx={{ justifyItems: 'right' }}>
                <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Stack>
    )
}

export default User
