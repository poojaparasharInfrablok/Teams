import { Get_access_token } from "../../config/accessToken";
import { Client } from '@microsoft/microsoft-graph-client';
const access_token = "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJ4NXQiOiJzRl9qb2Y2TjRoS2ZIMGV6MVBhOHcxb2JucEkiLCJ6aXAiOiJERUYifQ.CEMDJc2AMYHzM9sMrDE2wA44_4z_mkO8w_98ERf36yiieSw207MTxsG41vFiTo_dUGohS1Ll5fx6QSAc0EKtKmO1knBufiNRmTqPodpmIJuPdEMI1YWBWy_Odb4YJQ-Tq7vUJTIEGEJrf5DnLvPxA0mxL1lJb6RyFi2kjmJDxjK39CTN-oySqDjLLzAFAiRQADvxPud1XJCXTv-NQB1eFXci_6OAt7j-UqM13_vY7JW3xsde-HL71Pg7qWkRc2kkXu8C66739Rx5oBThlvlom6-4BYE-wlqgeK_n7C6TrMdERa9AHs7ym7_mfJhSN4HCaBLVBOQNksHOPygpfaW4zA.firpYj_eOJVL7tI88wEzew.zGIjnI4BnZWdM6CqMK8zHAvqm7eLorkC1hn-sTTZr4kV8CxYGoTJ24bQcdRGdpU1xVp73X4xOYtMkBJ03OziKdFtCsLqpkotY8CimQ8nrBvkgklLwQeZvwtE_MTnTQXdd5aQ1gKlPk_FSgeXijNizqjk1fSLLAU9VSWZM5jveyT7v1i2DPW5NYJztzxWwTDDD0c5bItJ3-ghiD0cyZ7tMI-V3gxlcvs34OQe90lm16dnfFTUgTfr9fskqtPXmi4je8cd9OsR_00KBeeIAENkJz7EoE9tNk5gI56rG8WHDznpZGcg--_2eZQGTKuwFNJeLGAHnZqbQ-dUsk8IpwuSf_R3kb5cYfd2w4sqzVa_aG9gh9_ZjUFM9rRxtIZsHmQA_vkBXvLYnkWwGeHsTn51EznsW4SnumIOmqOsH42GztVYS0gavp_ZAQymeKmCCWI3aqEnITqMOvYyGecDgzk199xBvFgiX5XFPuMj12Nn9W1L454SC3I8AoFwdx4lSjYebxEykQKIjWDwP6X5N9v3krL5vNN6sEPc410pqpX8hzn7Lbn3mt0g4l2auj4nZpFbrBEqpoB6H-TJDW0WdVJZ5HZlCrDcyPcLAEYhoaw8FE3FqcskaofLJuuI01T3uDIeW3-QZ9tNUAyBst_sqbgDg4jWFzQZVRB_GTSEnSjKOIXoQdWqDNOyh6kn7r4iEPLP1RHwbNcjt7-nmgB3PEEu5-UGoJjJToIHZ_ejdRjSInO6Mwn0Xdvqhaz_xbjxYJZg3GN-uoaPHr4sfbxDChjoRWj44NzqEH9aCwzqA0tBvI_LYHmQ3-Hw-GTVKV6v7YJ1lZCj-OdZV0OUY014oQR_AenNM2IagCXT2etD--hk7IXedQd9o5K8O55NDCc35EFCmIBL2Pj8Hbr6yNEId0iHWd-2CHZ2FrYJs9WdKxG3JgD329_3erzUtOxHgGuHldbtobGkFpLexzJE4wpnzvGtQ_G8PWMp0OIntCdmB9YtgGrqa96nzuShQltlqrfTTimk2brolqxecS9nPWAoWbO8fBj4y5tKggY7BZCNH2wloC7okX_CFm2okQqCV7sdgBCLprWqijsB5dWAl8_IpnJb-rTfKTfCWSgjkIgE7Pw2wmV0GmGj0SF4UWPVUkoyPtw2lPUcB-WYqSgorBd9dmi8dU9h3XWb1BLh5sOxlLBWoeMg2EI6wVd3DN_twVHtxFjZ07MuYqgQX_K4B-eM1BKR4IvxAJxRpUUwE9wKxDYm3Rcrn4qJBwGHMLgWfKcXwUH3K8Nt8e5BS2F63qT3rUEzLyvLJBx-0d7Q3VEi6ROa8SjqOGY6BFU0pFFkub_FHJWkJPZsniwaTidNI24b8rRi3QNGmSuN5QiO8hiipkGmc4z9x1vQakvdu0ny8kROkCFquv_sd_D1xTjQxOVvIo7jAuULwKdRInxGl8Qkbi48sO4lHN89SObPODHYaqt33ODbfvDuZYFmCz98MbzPsFxeh45Ek4dc292svO3bJnBD4KplTVvH_vcQzH-XPrwW6roa.J3_xnexw8JNHNCDgzuhdrg"
export const get_all_teams = (callback: Function) =>
    async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    //    let access_token = localStorage.getItem("localAccessToken")
        const graphClient = Client.init({
            authProvider: (done: any) => {
                // Use your OAuth2 token here
                done(null, access_token);
            }
        });

        // Replace {team-id} with the actual team ID
        graphClient.api(`v1.0/me/joinedTeams`).get().then((response: any) => {
            //   const teamMembers = response.value;
            // Process team members here
            console.log('Team Members:=====', response);
        })
            .catch((error: any) => {
                console.error('Error fetching team members:', error);
            });
    }