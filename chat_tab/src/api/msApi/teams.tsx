import { Client } from '@microsoft/microsoft-graph-client';
import { Access_Token } from '../token/token';

export const get_all_teams = (access_token: any, callback: Function) =>
    async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        const graphClient = Client.init({
            authProvider: (done: any) => {
                // Use your OAuth2 token here
                done(null, Access_Token);
            }
        });
        graphClient.api(`/me/joinedTeams`).get().then((response: any) => {
            callback(response?.value);

        })
            .catch((error: any) => {
                console.error('Error fetching team members:', error);
            });
    }