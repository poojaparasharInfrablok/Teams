
import { useContext } from "react";
import { TeamsFxContext } from "../components/Context";

export const Get_access_token = () => {
    const { teamsUserCredential } = useContext(TeamsFxContext);
    let userAccessToken: any = teamsUserCredential ?? "";
    if (teamsUserCredential) {
        userAccessToken = userAccessToken?.ssoToken?.token;
        return userAccessToken
    }
}
