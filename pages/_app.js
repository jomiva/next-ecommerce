import { useEffect, useMemo, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../scss/global.scss";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { getToken, removeToken, setToken } from "../api/token";
import {
  addProductCart,
  countProductsCart,
  getProductsCart,
  removeAllProductsCart,
  removeProductCard,
} from "../api/cart";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning("Para comprar un juego tienes que iniciar sesión");
    }
  };

  useEffect(() => {
    setTotalProductsCart(countProductsCart);
    setReloadCart(false);
  }, [reloadCart, auth]);

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => {
        addProduct(product);
      },
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductsCart]
  );

  const removeProduct = (product) => {
    removeProductCard(product);
    setReloadCart(true);
  };

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
