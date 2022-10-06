import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams, useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import TermsList from "../components/TermsList";
import TermContext, { filterTerm, sortItemsAlph } from "../TermContext";
import PaginateResults from "../components/PaginateResults";

const Results = () => {
  const { id } = useParams();
  const { list } = useContext(TermContext);
  let { terms, np } = useContext(TermContext);

  const location = useLocation();

  //Logic to filter array of terms by letter.
  terms = filterTerm(terms, id);
  np = filterTerm(np, id);

  //Combines the two arrays which display terms
  let currentTerms = terms.concat(np);

  //Sorts all of the terms alphabetically
  currentTerms = sortItemsAlph(currentTerms);


  // Get page count
  const [currentPage, setCurrentPage] = useState(1);
  const [termsPerPage] = useState(100);
  const indexOfLastTerm = currentPage * termsPerPage;
  const indexOfFirstTerm = indexOfLastTerm - termsPerPage;
  const currentPaginateTerms = currentTerms.slice(
    indexOfFirstTerm,
    indexOfLastTerm
  );

  // Change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Resets changed page number on reselect of letter
  useEffect(() => {
    paginate(1);
  }, [location]);

  return (
    <Layout title={id} activeNav={id}>
      <Row>
        <Col>
          <p>
            Each term generally includes links to Broader Terms, Narrower Terms
            and/or Related Terms. Other links may include Scope Notes, Used For
            and Use.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <TermsList activePage={list.indexOf(id)} />
        </Col>
      </Row>
      <Row className="justify-content-center pt-5">
        <Col xs={12} md={10} lg={9}>
          {terms ? (
            <PaginateResults
              allTerms={currentTerms}
              terms={currentPaginateTerms}
              termsPerPage={termsPerPage}
              currentPage={currentPage}
              paginate={paginate}
              pageID={id}
            />
          ) : null}
        </Col>
      </Row>
    </Layout>
  );
};

export default Results;
