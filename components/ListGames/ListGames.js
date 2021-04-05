import { map } from "lodash";
import React from "react";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointsUpLg,
  breakpointsUpMd,
  breakpointsUpSm,
} from "../../utils/breakpoints";

const ListGames = ({ games }) => {
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointsUpLg:
        return 5;

      case width > breakpointsUpMd:
        return 3;

      case width > breakpointsUpSm:
        return 2;

      default:
        return 1;
    }
  };

  return (
    <div className="games__container">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game) => (
            <GameItem key={game._id} game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ListGames;

const GameItem = ({ game }) => {
  return (
    <Grid.Column className="list-games__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image src={game.poster.url} alt={game.title} />
            <div className="list-games__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}%</span>
              ) : (
                <span />
              )}
              <span className="price">${game.price}</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
};
