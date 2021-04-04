import { BASE_URL } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const createAdressApi = async (address, logout) => {
  try {
    console.log(address);
    const url = `${BASE_URL}/adresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAddressesApi = async (idUser, logout) => {
  try {
    const url = `${BASE_URL}/adresses?user=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw "error del servidor";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteAddressApi = async (idAddress, logout) => {
  try {
    const url = `${BASE_URL}/adresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw "error del servidor";
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
