import { Client } from '@microsoft/microsoft-graph-client';

const access_token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkdUUEhGWk1wTmMxT0NXZE5nb2JHbExUc3VCUWtka2pqYS0xemphMXRHSTAiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVCM25SeHRRN2ppOGVORGMzRnkwNUtmOTdaRSIsImtpZCI6IjVCM25SeHRRN2ppOGVORGMzRnkwNUtmOTdaRSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9lZjA5YmIyOS05Njk5LTQxOTMtOTU0Zi00OTAzZmFmNWFmY2QvIiwiaWF0IjoxNzAzNjc4MTA3LCJuYmYiOjE3MDM2NzgxMDcsImV4cCI6MTcwMzc2NDgwNywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhWQUFBQTVYUzJ6b2JhMjdTL2I1cmlveHJlVGpoUWhkMzNsZ0ZEUUdFbzJEeUNleVIrd0pCY3ErbFVmMzlXRVBrVVZlK3giLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IlBhcmFzaGFyIiwiZ2l2ZW5fbmFtZSI6IlBvb2phIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTIyLjE2MS41My43OSIsIm5hbWUiOiJQb29qYSBQYXJhc2hhciIsIm9pZCI6IjY4Y2I2YTBlLTVmOWEtNGQzNy1iNTM5LTRlNjgwYWIyZjM2OCIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMDlCQjlGQTI5IiwicmgiOiIwLkFSSUFLYnNKNzVtV2swR1ZUMGtELXZXdnpRTUFBQUFBQUFBQXdBQUFBQUFBQUFBU0FCYy4iLCJzY3AiOiJBUElDb25uZWN0b3JzLlJlYWQuQWxsIEFQSUNvbm5lY3RvcnMuUmVhZFdyaXRlLkFsbCBEaXJlY3RvcnkuUmVhZC5BbGwgRGlyZWN0b3J5LlJlYWRXcml0ZS5BbGwgR3JvdXAuUmVhZC5BbGwgR3JvdXAuUmVhZFdyaXRlLkFsbCBNYWlsLlJlYWRCYXNpYyBvcGVuaWQgcHJvZmlsZSBTaXRlcy5SZWFkLkFsbCBTaXRlcy5SZWFkV3JpdGUuQWxsIFRhc2tzLlJlYWQgVGFza3MuUmVhZFdyaXRlIFRlYW0uUmVhZEJhc2ljLkFsbCBUZWFtTWVtYmVyLlJlYWQuQWxsIFVzZXIuUmVhZCBVc2VyLlJlYWQuQWxsIFVzZXIuUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWRXcml0ZSBVc2VyLlJlYWRXcml0ZS5BbGwgZW1haWwiLCJzdWIiOiJNRjlJMERtMFZjTW5qYlhQbmlDU2JDdzRHU19SNmhmS1h0OFRhdDdCb01rIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiZWYwOWJiMjktOTY5OS00MTkzLTk1NGYtNDkwM2ZhZjVhZmNkIiwidW5pcXVlX25hbWUiOiJwcGFyYXNoYXJAaW5mcmFibG9rLmNvbSIsInVwbiI6InBwYXJhc2hhckBpbmZyYWJsb2suY29tIiwidXRpIjoiX2JnMTJWVW9Ia2lHMTZCcFJxTE5BUSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3NzbSI6IjEiLCJ4bXNfc3QiOnsic3ViIjoicE9Jb2M5UFpkUXZRVjQxYjJtbVdoOTNFZ3l6Y2xoUUpmV1owTTNTdFo2WSJ9LCJ4bXNfdGNkdCI6MTQyNDA3NjIyNX0.aHkZYKo-KWczNaIBvAjrFW2T3wZQAPA-kyqrYnmE2Lcr1vLSg4gC8f5BQOBmRoHeLM0eXg2B56dJVFUlCN4W0NzH7hZ-6UvZb3UxLeUBSg1bW33oEFDaNgyIZhbVW3qDpfz6J4PrGPIAusklwXp1JBB0BjoyFOAo6D-L4z_X_M23mZ4n2oW79qcLY-ArFqy6r-4Lcjdo_Mn-_Hk8fXcPxYraBNa4CMfH3a3qQ27dSz83BxnJp5qnwfQPFEKuStu2c49L25gbwEXL0E0Z2-gyeeBBmfEL3dFAb6AW8saKgEaDc7No2xkBVDVdYNFAJCFUL8aYcefniQBnmSlAuMHT-Q"
export const get_all_teams = (callback: Function) =>
    async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
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