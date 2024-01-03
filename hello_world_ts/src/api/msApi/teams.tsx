import { Client } from '@microsoft/microsoft-graph-client';
import { useContext } from 'react';
import { TeamsFxContext } from '../../components/Context';

//const access_token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6Ing2ZjctSEs3NV9HQzJnUm5teGRiazBfeG1lNTFRS3NfRExEdXBqUnJLVzQiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVCM25SeHRRN2ppOGVORGMzRnkwNUtmOTdaRSIsImtpZCI6IjVCM25SeHRRN2ppOGVORGMzRnkwNUtmOTdaRSJ9.eyJhdWQiOiJodHRwczovL2FwaS5zcGFjZXMuc2t5cGUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZWYwOWJiMjktOTY5OS00MTkzLTk1NGYtNDkwM2ZhZjVhZmNkLyIsImlhdCI6MTcwMzc2NjcyOCwibmJmIjoxNzAzNzY2NzI4LCJleHAiOjE3MDM4NTA4ODAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJFMlZnWVBEYzF0a3FJODNEbWNINnJ6eVh5K0hwNWMxL3JwK2IxcnVsUEtjNFhISDlzUVFBIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjVlM2NlNmMwLTJiMWYtNDI4NS04ZDRiLTc1ZWU3ODc4NzM0NiIsImFwcGlkYWNyIjoiMCIsImF1dGhfdGltZSI6MTcwMzc2NzAyMCwiZmFtaWx5X25hbWUiOiJQYXJhc2hhciIsImdpdmVuX25hbWUiOiJQb29qYSIsImlwYWRkciI6IjEyMi4xNjEuNTMuNzkiLCJuYW1lIjoiUG9vamEgUGFyYXNoYXIiLCJvaWQiOiI2OGNiNmEwZS01ZjlhLTRkMzctYjUzOS00ZTY4MGFiMmYzNjgiLCJwdWlkIjoiMTAwMzIwMDA5QkI5RkEyOSIsInJoIjoiMC5BUklBS2JzSjc1bVdrMEdWVDBrRC12V3Z6VmY5RmN4c0xCZEJxSXlEc2RWclM3NFNBQmMuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lkIjoiZjA4NWE0NjUtN2I1Mi00ZTZhLTk1NjgtMjc5MDAzOGQzMTgyIiwic3ViIjoiNmN1MWdKM3ZYTldwM1BDdms5MTZLa1UxVVhISXFTdVhVSTNzY1VRTnRUWSIsInRlbmFudF9jdHJ5IjoiVVMiLCJ0aWQiOiJlZjA5YmIyOS05Njk5LTQxOTMtOTU0Zi00OTAzZmFmNWFmY2QiLCJ1bmlxdWVfbmFtZSI6InBwYXJhc2hhckBpbmZyYWJsb2suY29tIiwidXBuIjoicHBhcmFzaGFyQGluZnJhYmxvay5jb20iLCJ1dGkiOiJ3QVJreElWOXFVZXVFd05kajk5YkFnIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfc3NtIjoiMSJ9.N931Q5p3IuLObp0v4JjlUnzMQ5X_8gCj2yXSJLqa4l1TzFgJmNGz1RfHvltsYpLt8yydnXenEmQSXxHhnJDUBl7CUEPeNb8VmskqTmA1YNRSyhgUr3ORj2LGEj1B79UtsuZkJ_vzhNtp54inPbRYBsRw2zfhm0VaPwKaAXOqz72Ty3dBX3UHqrZPjQ251XBftmhOVm2G4dFgwdOY3jF5bpyLkLxQXLSBySdVOiZ5Er5EnpYebrV1fgsnApYqi5f-uGDNnXaOoO7XijMrCNrv48EiFltN9NqXG47CRKJy7PVu96j99ApMJsMXZGAb9HLWiZcFM5WeyosxnW14w2jzpg"

export const get_all_teams = (access_token:any,callback: Function) =>
    async (dispatch: (arg0: { type: string; payload?: any }) => void) => {     
       
        console.log("user AccessToken in teams api=====", access_token)
        const graphClient = Client.init({
            authProvider: (done: any) => {
                // Use your OAuth2 token here
                done(null, access_token);
            }
        });
        graphClient.api(`/me/joinedTeams`).get().then((response: any) => {
            callback(response?.value);

        })
            .catch((error: any) => {
                console.error('Error fetching team members:', error);
            });
    }