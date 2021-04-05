import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout/index";
import { getGamesByPlatform, getTotalGamesPlatform } from "../../api/games";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import ListGames from "../../components/ListGames/ListGames";
import Pagination from "../../components/Pagination/Pagination";

const limitPerPage = 10;

const Platforms = () => {
  const { query } = useRouter();
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(null);

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    return currentPage * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getGamesByPlatform(
          query.platform,
          limitPerPage,
          getStartItem()
        );
        setGames(response);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatform(query.platform);
      setTotalGames(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      {!games ? (
        <Loader active>Cargando juegos</Loader>
      ) : size(games) > 0 ? (
        <ListGames games={games} />
      ) : (
        <h3>No hay juegos</h3>
      )}
      {!!totalGames && (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      )}
    </BasicLayout>
  );
};

export default Platforms;
