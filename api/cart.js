import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_URL, CART } from "../utils/constants";

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
