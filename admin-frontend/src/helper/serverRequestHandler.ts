import axios from "axios";
import { API_URL } from "./constant";
import { cookies } from "next/headers";

export const requestHandlerUserId = (link: string, params: any, type: string, headers: any = {}) => {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("auth");
    const userIdCookie = cookieStore.get("userId");
    if (!tokenCookie || !userIdCookie) {
        throw new Error("Missing auth or userId cookie");
    }

    const token = tokenCookie.value;
    const userId = userIdCookie.value;
    let config = {
        method: type,
        url: API_URL + link + userId,
        data: params,
        headers: {
            Authorization: `${token}`,
            ...headers,
        },
    };
    return axios
        .request(config)
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            return error.response?.data;
        });
};
