import { isArray, size } from "lodash";
import { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { getGamesApi } from "../api/games";
import ListGames from "../components/ListGames/ListGames";
import BasicLayout from "../layouts/BasicLayout";

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getGamesApi(50);
      if (size(response) > 0) setGames(response);
      else setGames([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      {!games ? (
        <Loader active>Cargando juegos</Loader>
      ) : size(games) > 0 ? (
        <ListGames games={games} />
      ) : (
        <h3>No hay juegos</h3>
      )}
    </BasicLayout>
  );
}
