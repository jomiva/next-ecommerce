import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getGameByUrlApi } from "../api/games";
import HeaderGame from "../components/Game/HeaderGame/HeaderGame";
import TabsGame from "../components/Game/TabsGame/TabsGame";

const Game = () => {
  const [game, setGame] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();
  }, [query.game]);

  return (
    <BasicLayout className="game">
      {game && (
        <>
          <HeaderGame game={game} />
          <TabsGame game={game} />
        </>
      )}
    </BasicLayout>
  );
};

export default Game;
