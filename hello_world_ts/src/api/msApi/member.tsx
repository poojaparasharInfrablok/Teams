import { Get_access_token } from "../../config/accessToken";

const { Client } = require('@microsoft/microsoft-graph-client');
export const get_all_teams_member =
    (callback: Function) =>
        async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
            let access_token = Get_access_token();
            const graphClient = Client.init({
                authProvider: (done: any) => {
                    // Use your OAuth2 token here
                    done(null, access_token);
                }
            });

            // Replace {team-id} with the actual team ID
            graphClient.api(`/teams/{team-id}/members`).get().then((response: any) => {
                const teamMembers = response.value;
                // Process team members here
                console.log('Team Members:', teamMembers);
            })
                .catch((error: any) => {
                    console.error('Error fetching team members:', error);
                });


        }