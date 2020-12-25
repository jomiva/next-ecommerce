import jwtDecode from "jwt-decode";
import { TOKEN } from "../utils/constants";

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => localStorage.getItem(TOKEN);

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const expiredToken = (token) => {
  const tokenDecoded = jwtDecode(token);
  const expiredDate = tokenDecoded.exp * 1000;
  const currentDate = new Date().getTime();
  if (currentDate > expiredDate) {
    return true;
  }
  return false;
};
