import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const styles = {
        flex: 1,
        paperContainer: {
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "100vh",
        },
    };

    const handleSave = () => {
        let body = {
            name: name,
            email: email,
            city: city,
            country: country,
        };
        console.log("user data===", body)
    };

    return (
        <Paper style={styles.paperContainer}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
            >
                <Typography
                    sx={{
                        marginTop: 1.5,
                        fontWeight: "bold",
                        fontSize: "22px",
                        lineHeight: "48px",
                    }}
                >
                    User Data{" "}
                </Typography>
                <TextField
                    size="small"
                    id="outlined-required"
                    label="Name"
                    defaultValue=""
                    onChange={(event: { target: { value: string } }) => {
                        setName(event.target.value);
                    }}
                    sx={{ marginTop: 2, width: 325 }}
                />
                <TextField
                    size="small"
                    label="Email"
                    defaultValue=""
                    onChange={(event: { target: { value: string } }) => {
                        setEmail(event.target.value);
                    }}
                    sx={{ marginTop: 2, width: 325 }}
                />
                <TextField
                    size="small"
                    id="outlined-required"
                    label="City"
                    defaultValue=""
                    onChange={(event: { target: { value: string } }) => {
                        setCity(event.target.value);
                    }}
                    sx={{ marginTop: 2, width: 325 }}
                />
                <div>
                    <TextField
                        size="small"
                        label="Country"
                        defaultValue=""
                        onChange={(event: { target: { value: string } }) => {
                            setCountry(event.target.value);
                        }}
                        sx={{ marginTop: 2, width: 325 }}
                    />
                </div>
                <Stack display={"flex"} alignItems={"center"} marginTop={2}>
                    <Button
                        onClick={handleSave}
                        fullWidth={true}
                        variant="contained"
                        disableElevation
                    >
                        Save
                    </Button>
                </Stack>
            </Grid>
        </Paper>
    );
};

export default Login;