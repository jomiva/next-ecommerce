import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_URL, CART } from "../utils/constants";

import { authFetch } from "../utils/fetch";

export const getProductsCart = () => {
  const cart = localStorage.getItem(CART);

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
};

export const addProductCart = (product) => {
  const cart = getProductsCart();

  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Producto añadido correctamente");
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("Este producto ya está en el carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido correctamente");
    }
  }
};

export const countProductsCart = () => {
  const cart = getProductsCart();
  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
};

export const removeProductCard = (product) => {
  const cart = getProductsCart();
  remove(cart, (item) => {
    return item === product;
  });

  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
};

export const paymentCartApi = async (
  token,
  products,
  idUser,
  address,
  logout
) => {
  try {
    const { user, createdAt, ...addressShipping } = address;

    const url = `${BASE_URL}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, products, idUser, addressShipping }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeAllProductsCart = () => {
  localStorage.removeItem(CART);
};
