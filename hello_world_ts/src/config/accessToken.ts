
import { useContext } from "react";
import { TeamsFxContext } from "../components/Context";
import { useData } from "@microsoft/teamsfx-react";

export const Get_access_token: any = () => {
    const { teamsUserCredential } = useContext(TeamsFxContext);
    let userAccessToken: any;
    useData(async () => {
        if (teamsUserCredential) {
            userAccessToken = await teamsUserCredential;
            console.log("teamsUserCredential=====", teamsUserCredential)
            console.log("user Access Token=====", userAccessToken?.ssoToken?.token)
            return  userAccessToken?.ssoToken?.token
        }

    });
    // if (teamsUserCredential) {
    //     userAccessToken = userAccessToken?.ssoToken?.token;
    //     console.log("userAccessToken=====", userAccessToken)
    //     return userAccessToken
    // }

}
