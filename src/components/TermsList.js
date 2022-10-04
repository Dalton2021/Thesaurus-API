import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import TermContext from "../TermContext";

const TermsList = ({ activePage }) => {
  const navigate = useNavigate();
  const { list } = useContext(TermContext);

  const handlePageChange = (page) => {
    navigate(`/results/${page}`);
  };

  return (
    <Pagination className="d-flex justify-content-center list-unstyled flex-wrap mb-0">
      {list.map((page, index) => {
        return (
          <Pagination.Item
            className="px-2 py-2 bg-blue"
            key={index}
            active={index === activePage}
            onClick={() => handlePageChange(page)}>
            <div>{page}</div>
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default TermsList;
