import axios from "axios";
import { API_URL } from "./constant";
import { getTokenCookie } from "./auth";

export const publicHandler = (link: any, params: any, type: any) => {
  let config = {
    method: type,
    url: API_URL + link,
    data: params,
  };
  return axios
    .request(config)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response;
    });
};

export const requestHandler = (link: any, params: any, type: any, headers: any = {}) => {
  const token = getTokenCookie("auth");
  let config = {
    method: type,
    url: API_URL + link,
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
export const requestHandlerBackend = (link: any, body: any, type: any, headers: any = {}) => {
  const token = getTokenCookie("auth");
  let config = {
    method: type,
    url: API_URL + link,
    data: body,
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
export const requestHandlerUserId = (link: any, params: any, type: any, headers: any = {}) => {
  const token = getTokenCookie("auth");
  const userId = getTokenCookie("userId");
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
