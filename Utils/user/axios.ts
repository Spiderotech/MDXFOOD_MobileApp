import axios from "axios";

export const baseUrl = "https://infiniteworldofscience.com/api/v1/user";

const instance = axios.create({
  baseURL: baseUrl,                  
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;

