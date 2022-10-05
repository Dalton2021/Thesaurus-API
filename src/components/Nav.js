import React from "react";
import { Breadcrumb } from "react-bootstrap";

const Nav = ({ active }) => {

  return (
    <Breadcrumb className="small justify-content-center w-100">
      <div className="d-flex justify-content-center w-100">
        <Breadcrumb.Item href="https://www.usfa.fema.gov/index.html">
          <div className="text-reset">Home</div>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="https://www.usfa.fema.gov/data/library/">Library</Breadcrumb.Item>
        {!active ? (
          <Breadcrumb.Item active>Thesaurus</Breadcrumb.Item>
        ) : (
          <>
            <Breadcrumb.Item href="/">Thesaurus</Breadcrumb.Item>
            <Breadcrumb.Item active>{active}</Breadcrumb.Item>
          </>
        )}
      </div>
    </Breadcrumb>
  );
};

export default Nav;
