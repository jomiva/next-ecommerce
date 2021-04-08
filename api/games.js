import { BASE_URL } from "../utils/constants";

export const getGamesApi = async (limit) => {
  try {
    const url = `${BASE_URL}/games?_limit=${limit}&_sort=createdAt:desc`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGamesByPlatform = async (platform, limit, start) => {
  try {
    const url = `${BASE_URL}/games?platform.url=${platform}&_limit=${limit}&_start=${start}&_sort=createdAt:desc`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTotalGamesPlatform = async (platform) => {
  try {
    const url = `${BASE_URL}/games/count?platform.url=${platform}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGameByUrlApi = async (gameUrl) => {
  try {
    const url = `${BASE_URL}/games?url=${gameUrl}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const searchGamesApi = async (query) => {
  try {
    const url = `${BASE_URL}/games?_q=${query}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
