import axios from "axios";

const request = axios.create({
    baseURL: "https://chef-memo-webapp-backend.vercel.app/"
});

export default request;
