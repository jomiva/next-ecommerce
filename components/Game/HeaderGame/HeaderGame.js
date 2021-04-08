import React, { useEffect, useState } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import useAuth from "../../../hooks/useAuth";
import {
  addFavoriteApi,
  deleteFavoriteApi,
  isFavoriteApi,
} from "../../../api/favorite";
import classNames from "classnames";

const HeaderGame = ({ game }) => {
  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={game.poster.url} alt={game.title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
};

export default HeaderGame;

const Info = ({ game }) => {
  const { title, summary, price, discount } = game;
  const [isFavorite, setIsFavorite] = useState(false);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, game.id, logout);
      if (size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
  }, [game]);

  const addFavorite = async () => {
    if (auth) {
      const response = await addFavoriteApi(auth.idUser, game.id, logout);
      if (response) setIsFavorite(true);
      else setIsFavorite(false);
    }
  };

  const removeFavorite = async () => {
    if (auth) {
      const response = await deleteFavoriteApi(auth.idUser, game.id, logout);
      if (response) setIsFavorite(false);
      else setIsFavorite(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({ like: isFavorite })}
          link
          onClick={!isFavorite ? addFavorite : removeFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48 horas</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico ${price}</p>
          <div className="header-game__buy-price-actions">
            <p>-{discount}%</p>
            <p>${(price - Math.floor((price * discount) / 100)).toFixed(2)}</p>
          </div>
        </div>
        <Button className="header-game__buy-btn">Comprar</Button>
      </div>
    </>
  );
};
