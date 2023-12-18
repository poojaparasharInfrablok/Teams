import axios from "axios";
import { BASE_URL } from "../config/server";

export const login =
  (body: any, callback: Function) =>
    async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
     
      try {
        let url = BASE_URL + "/partners/log-in";
        const { data } = await axios.post(url, body);
        if (data) {
          localStorage.setItem("user_info", JSON.stringify(data.response));        
          callback(data);
        }
      } catch (err: any) {
        callback(err.response);      
        console.log("Axios Error Code --", err.code);
      }
    };

