export const Access_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjVCM25SeHRRN2ppOGVORGMzRnkwNUtmOTdaRSJ9.eyJhdWQiOiIzZGZkZDcyYi0xNjIwLTQ0MjktYjA3Yy0xYjYxNTQ0ZGI3YzEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZWYwOWJiMjktOTY5OS00MTkzLTk1NGYtNDkwM2ZhZjVhZmNkL3YyLjAiLCJpYXQiOjE3MDYwMDE0OTUsIm5iZiI6MTcwNjAwMTQ5NSwiZXhwIjoxNzA2MDA5OTI5LCJhaW8iOiJBVVFBdS84VkFBQUE1RlBtS0ZtdlJ4SS9vUnNhT09JUzI5cEdBWEZ1QlhCY1JWc0V1Nit3ZUxnbkt3QjZ4OGtCUlhkdU9jZ3ZFcmwvTUd2SUdtZElWUkZtWDhaeklEd2gwUT09IiwiYXpwIjoiNWUzY2U2YzAtMmIxZi00Mjg1LThkNGItNzVlZTc4Nzg3MzQ2IiwiYXpwYWNyIjoiMCIsIm5hbWUiOiJQb29qYSBQYXJhc2hhciIsIm9pZCI6IjY4Y2I2YTBlLTVmOWEtNGQzNy1iNTM5LTRlNjgwYWIyZjM2OCIsInByZWZlcnJlZF91c2VybmFtZSI6InBwYXJhc2hhckBpbmZyYWJsb2suY29tIiwicmgiOiIwLkFSSUFLYnNKNzVtV2swR1ZUMGtELXZXdnpTdlhfVDBnRmlsRXNId2JZVlJOdDhFU0FCYy4iLCJzY3AiOiJhY2Nlc3NfYXNfdXNlciIsInN1YiI6IlVYMkp1UHpLX0pMbnlDdkFzcTdBLVhxSXNUM3BSaGJJY3NURnVHSHNGSmMiLCJ0aWQiOiJlZjA5YmIyOS05Njk5LTQxOTMtOTU0Zi00OTAzZmFmNWFmY2QiLCJ1dGkiOiJGclNXU2VtZ2gwR2o5LVlJT3VMUkFBIiwidmVyIjoiMi4wIn0.meGVOzM4bw1ykDvX_7LqHycFmLl2Yw23fVz0eGLyRBxIfwe-hDpte3AURgey7CeAAENm2HpvgFbnFpthKsc4Qs4YobYBES3JqFhZvj-WtAxGL3Rj8rc_QJWUxFS-W41OXRbsTym3dkOxWudUrmONC7Eb9QOOHcQ5whFVuiduMvUhHO1MQMYgQYBWE1-ZzektcaJgph7xk0Ml9S0urWZhogBOj96KJjcOfeIvd2ThqP-h8-0InpR8OLBYb-SMPL9WefWtTYXhLJreStJfVnJcq3UL1clM0x_2wafUmwzRMSa2lEd-legswJBlA2FbdcfIqYUG8pX3ByVYLDhYR4RExA"

const axios = require('axios');
const tenantId = '0a58e330-9d05-4888-af0a-141fdaa4e619';
const clientId = 'da00f2a7-807c-4cb5-89d2-a551d37d0d31';
const clientSecret = 'd7716bfd-ab3d-4be7-9715-163a0f6ba660';
const scope = 'https://helloworldb89823.z13.web.core.windows.net/'; // Replace with your required scope

export const getToken = async () => {
    try {
        //https://login.microsoftonline.com/ef09bb29-9699-4193-954f-4903faf5afcd/oauth2/v2.0/token
        const tokenEndpoint = `https://helloworldb89823.z13.web.core.windows.net/${tenantId}/oauth2/authorize`;
        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('scope', scope);
        params.append('client_secret', clientSecret);
        params.append('grant_type', 'client_credentials');
     //   params.append('Access-Control-Allow-Origin', '*');
        const response = await axios.post(tokenEndpoint, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin':'*'
            }
        });
        console.log("Access Token api response===", response)
        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error: any) {
        console.error('Error:', error.message);
        return null;
    }
};
