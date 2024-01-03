
import { useContext } from "react";
import { TeamsFxContext } from "../components/Context";
import { useData } from "@microsoft/teamsfx-react";


 export const Get_access_token = () => {
    const teamsUserCredential = useContext(TeamsFxContext);
    let userAccessToken: any;
    if (teamsUserCredential) {
        userAccessToken = teamsUserCredential;
        console.log("AccessToken =====", teamsUserCredential)
        return userAccessToken?.ssoToken?.token;
    }
      // useData(async () => {
    //     if (teamsUserCredential) {
    //         userAccessToken = await teamsUserCredential;
    //         console.log("userAccessToken=====", userAccessToken?.ssoToken?.token)
    //         return userAccessToken
    //     }

    // }); 
  }