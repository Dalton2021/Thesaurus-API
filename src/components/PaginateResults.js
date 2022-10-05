import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaginateResults = ({
  terms,
  allTerms,
  termsPerPage,
  currentPage,
  paginate,
  pageID,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allTerms.length / termsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => paginate(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <>
      <ul className="list-inline">
        {terms.map((term) => {
          return (
            <li className="list-inline-item m-2" key={term.id}>
              {term.preferred ? (
                <Link
                  className="textLink text-decoration-none"
                  to={`/results/${pageID}/${term.id}`}
                >
                  <strong>{term.preferred}</strong>
                </Link>
              ) : (
                <Link
                  className="textLink text-decoration-none"
                  to={`/results/${pageID}/${term.id}`}
                >
                  <em className="fst-italic">{term.nonPreferred}</em>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      {allTerms.length >= termsPerPage ? (
        <Pagination>{pageNumbers}</Pagination>
      ) : null}
    </>
  );
};

export default PaginateResults;
