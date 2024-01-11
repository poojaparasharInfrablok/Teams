import { Client } from '@microsoft/microsoft-graph-client';

import { Get_access_token } from '../../config/accessToken';
import { Access_Token } from '../token/token';

export const get_all_teams_member =
    (team_id: any, access_token: any, callback: Function) =>
        async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
            const graphClient = Client.init({
                authProvider: (done: any) => {
                    // Use your OAuth2 token here
                    console.log("user AccessToken in member api=====", access_token)
                    done(null, Access_Token);
                }
            });
            //https://graph.microsoft.com/v1.0/teams/{team-id}/members
            graphClient.api(`teams/${team_id}/members`).get().then((response: any) => {
                callback(response?.value);

            })
                .catch((error: any) => {
                    console.error('Error fetching team members:', error);
                });

        }
