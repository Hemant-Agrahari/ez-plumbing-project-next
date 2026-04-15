import Cookies from "js-cookie";

export const setTokenCookie = (name: any, token: any) => {
  Cookies.set(name, token, { expires: 1 });
};

export const getTokenCookie = (name: any) => {
  return Cookies.get(name);
};
export const removeTokenCookie = (name: any) => {
  return Cookies.remove(name);
};
export const setUserIdCookie = (name: any, userId: any) => {
  Cookies.set(name, userId, { expires: 1 });
};
export const getUserIdCookie = (name: any) => {
  return Cookies.get(name);
};
export const removeuserIdCookie = (name: any) => {
  return Cookies.remove(name);
};
export const removeAllCookies = () => {
  const allCookies = Cookies.get();
  for (let cookie in allCookies) {
    Cookies.remove(cookie);
  }
};