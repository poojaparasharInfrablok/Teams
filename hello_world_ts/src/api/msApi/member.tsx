import { Client } from '@microsoft/microsoft-graph-client';
import { Access_Token } from '../token/token';

export const get_all_teams_member =
    (team_id: any, callback: Function) =>
        async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
            const graphClient = Client.init({
                authProvider: (done: any) => {
                    // Use your OAuth2 token here
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


export const chat_with_team_member =
    (chatbody: any, callback: Function) =>
        async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
            const graphClient = Client.init({
                authProvider: (done: any) => {
                    done(null, Access_Token);
                }
            });
            graphClient.api(`chats`).post(chatbody).then((response: any) => {
                callback(response);

            })
                .catch((error: any) => {
                    console.error('Error fetching team members:', error);
                });

        }


export const send_message_to_team_member =
    (messageBody: any, chat_id: any, callback: Function) =>
        async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
            const graphClient = Client.init({
                authProvider: (done: any) => {
                    done(null, Access_Token);
                }
            });
            graphClient.api(`chats/${chat_id}/messages`).post(JSON.stringify(messageBody)).then((response: any) => {
                console.log("message api response=====", response)
                callback(response);

            })
                .catch((error: any) => {
                    console.error('Error fetching team members:', error);
                });

        }