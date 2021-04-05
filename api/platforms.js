import { BASE_URL } from "../utils/constants";

export const getPlatoformsApi = async () => {
  try {
    const url = `${BASE_URL}/platforms?_sort=position:asc`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
