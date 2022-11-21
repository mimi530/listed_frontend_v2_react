import axios from "axios";

export const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT, 10),
    headers: {
        Accept: "application/json",
        "Accept-Language": localStorage.getItem("lang") || "en",
    },
    withCredentials: true,
});