import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { size, forEach } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getFavoriteApi } from "../api/favorite";
import ListGames from "../components/ListGames/ListGames";

const wishlist = () => {
  const [games, setGames] = useState(null);

  const { logout, auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      const favorites = response.map(({ game }) => game);
      console.log(favorites);
      setGames(favorites);
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de favoritos</div>
        <div className="data">
          {!games && <Loader active>Cargando juegos...</Loader>}
          {games && size(games) === 0 && (
            <div className="data__not-found">No hay juegos</div>
          )}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
};

export default wishlist;
