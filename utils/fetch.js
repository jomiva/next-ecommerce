import { getToken, expiredToken } from "../api/token";

export const authFetch = async (url, params, logout) => {
  console.log(params);
  const token = getToken();
  if (!token) {
    logout();
  } else {
    if (expiredToken(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
};
