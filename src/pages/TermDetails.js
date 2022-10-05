import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TermContext, {
  sortItemsAlph,
  indexLocation,
  getPageID,
} from "../TermContext";

const TermDetails = () => {
  let { termID } = useParams();
  const [pageIDLeft, setPageIDLeft] = useState();
  const [pageIDRight, setPageIDRight] = useState();
  const allTerms = useContext(TermContext);
  const searchURL = `http://usfa.bibliovation.com/app/search/subject:${termID}`;

  //Logic to filter array of terms by letter.
  let terms = allTerms.terms;
  let np = allTerms.np;

  //Gathers full list of terms so navBtnLeft & navBtnRight may have accurate data on which terms are next in the array
  let currentTermsList = sortItemsAlph(terms.concat(np));

  let navBtnLeftIndex = indexLocation(currentTermsList, termID) - 1;
  let navBtnRightIndex = indexLocation(currentTermsList, termID) + 1;

  let navBtnLeft = currentTermsList.at(navBtnLeftIndex);
  let navBtnRight = currentTermsList.at(navBtnRightIndex);

  //Logic to gather current term item
  const currentTerm = termID.includes("np")
    ? allTerms.np.filter((term) => term.id === termID)
    : allTerms.terms.filter((term) => term.id === Number(termID));

  //Function calls before page is ready which causes a break, useEffect fixes that
  useEffect(() => {
    if (document.readyState === "complete") {
      setPageIDLeft(getPageID(navBtnLeft));
      setPageIDRight(getPageID(navBtnRight));
    }
  }, [navBtnLeft, navBtnRight]);

  return (
    <>
      {currentTerm.length > 0 ? (
        <Layout
          title={currentTerm[0].preferred || currentTerm[0].nonPreferred}
          activeNav={currentTerm[0].preferred || currentTerm[0].nonPreferred}
          navButtons
          navBtnLeftText={navBtnLeft.preferred || navBtnLeft.nonPreferred}
          navBtnRightText={navBtnRight.preferred || navBtnRight.nonPreferred}
          navBtnLeftURL={`/results/${pageIDLeft}/${navBtnLeft.id}`}
          navBtnRightURL={`/results/${pageIDRight}/${navBtnRight.id}`}
        >
          <Row>
            <Col>
              <a href={searchURL}>
                Search our library’s catalog with this term
              </a>
            </Col>
          </Row>
        </Layout>
      ) : null}
    </>
  );
};

export default TermDetails;
