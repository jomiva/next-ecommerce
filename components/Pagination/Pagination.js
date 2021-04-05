import React from "react";
import { Pagination as PaginationS } from "semantic-ui-react";
import queryString from "query-string";
import { useRouter } from "next/router";

const Pagination = ({ totalGames, page, limitPerPage }) => {
  const totalPages = Math.ceil(totalGames / limitPerPage);

  const router = useRouter();

  const urlParse = queryString.parseUrl(router.asPath);

  const changePage = (_, { activePage }) => {
    urlParse.query.page = activePage;
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };

  return (
    <div className="pagination">
      <PaginationS
        firstItem={null}
        lastItem={null}
        defaultActivePage={page}
        totalPages={2}
        onPageChange={changePage}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
};

export default Pagination;
