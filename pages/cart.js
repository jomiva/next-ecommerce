import React, { useEffect, useState } from "react";
import { getGameByUrlApi } from "../api/games";
import Payment from "../components/Cart/Payment/Payment";
import SummaryCart from "../components/Cart/SummaryCart/SummaryCart";
import useCart from "../hooks/useCart";
import BasicLayout from "../layouts/BasicLayout/index";

const Cart = () => {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
};

const EmptyCart = () => {
  return (
    <BasicLayout className="empty-cart">
      <h1>No hay productos en el carrito</h1>
    </BasicLayout>
  );
};

const FullCart = ({ products }) => {
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);

  console.log(address);

  useEffect(() => {
    (async () => {
      let productsTemp = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BasicLayout className="empty-cart">
      <SummaryCart
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
        products={productsData}
        setAddress={setAddress}
      />

      {address && <Payment products={productsData} address={address} />}
    </BasicLayout>
  );
};

export default Cart;
