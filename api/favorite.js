import { size } from "lodash";
import { BASE_URL } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const isFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const url = `${BASE_URL}/favorites?user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound) > 0 || dataFound === null) {
      return "Este juego ya está en favoritos";
    }
    const url = `${BASE_URL}/favorites`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: idUser, game: idGame }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound) > 0) {
      const url = `${BASE_URL}/favorites/${dataFound[0]?._id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFavoriteApi = async (idUser, logout) => {
  try {
    const url = `${BASE_URL}/favorites?user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
