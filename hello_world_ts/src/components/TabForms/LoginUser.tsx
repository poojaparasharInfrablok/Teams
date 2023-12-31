import { useData } from '@microsoft/teamsfx-react';
import { Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { TeamsFxContext } from '../Context';

const LoginUser = () => {
    const { teamsUserCredential } = useContext(TeamsFxContext);
    const [loginUserName, setLoginUserName] = useState("");
    const [loginUserEmail, setLoginUserEmail] = useState("");

    const { loading, data, error } = useData(async () => {
        if (teamsUserCredential) {
            const userInfo = await teamsUserCredential.getUserInfo();
            return userInfo;
        }
    });
    useEffect(() => {
        setLoginUserName(loading || error ? "" : data!.displayName);
        setLoginUserEmail(loading || error ? "" : data!.preferredUserName);
    }, [loading, data, error])



    return (
        <Stack className="thead">
            <Typography variant="body1">{loginUserName}</Typography>
            <Typography variant="body1">{loginUserEmail}</Typography>
        </Stack>
    )
}

export default LoginUser
