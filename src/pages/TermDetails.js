import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import TermContext, {
  sortItemsAlph,
  indexLocation,
  getPageID,
  getMatch,
} from "../TermContext";

const TermDetails = () => {
  let { termID } = useParams();
  const [pageIDLeft, setPageIDLeft] = useState();
  const [pageIDRight, setPageIDRight] = useState();
  const [searchURL, setSearchURL] = useState();
  // const [relatedMatch, setRelatedMatch] = useState()
  const allTerms = useContext(TermContext);

  //Logic to filter array of terms by letter.
  let terms = allTerms.terms;
  let np = allTerms.np;

  //Gathers full list of terms so navBtnLeft & navBtnRight may have accurate data on which terms are next in the array
  let currentTermsList = sortItemsAlph(terms.concat(np));

  let navBtnLeftIndex = termID.includes("np")
    ? indexLocation(currentTermsList, termID) - 1
    : indexLocation(currentTermsList, Number(termID)) - 1;
  let navBtnRightIndex = termID.includes("np")
    ? indexLocation(currentTermsList, termID) + 1 >= currentTermsList.length
      ? 0
      : indexLocation(currentTermsList, termID)
    : indexLocation(currentTermsList, Number(termID)) + 1 >=
      currentTermsList.length
    ? 0
    : indexLocation(currentTermsList, Number(termID));

  let navBtnLeft = currentTermsList.at(navBtnLeftIndex);
  let navBtnRight = currentTermsList.at(navBtnRightIndex);


  //Logic to gather current term item
  let currentTerm = termID.includes("np")
    ? allTerms.np.filter((term) => term.id === termID)
    : allTerms.terms.filter((term) => term.id === Number(termID));

  //Function calls before page daata is ready which causes a break, useEffect fixes that
  useEffect(() => {
    if (document.readyState === "complete") {
       getPageID(navBtnRight) === "undefined"
       ? setPageIDRight("123")
       : setPageIDRight(getPageID(navBtnRight));
       // setPageIDRight(getPageID(navBtnRight));
       getPageID(navBtnRight) === "undefined"
         ? setPageIDRight("123")
         : setPageIDRight(getPageID(navBtnRight));
      setSearchURL(
        `http://usfa.bibliovation.com/app/search/subject:("${
          currentTerm[0].preferred || currentTerm[0].nonPreferred
        }")`
      );
    }
  }, [navBtnLeft, navBtnRight, searchURL, currentTerm]);

  //Initial gathering of matches for current term
  let relatedMatch = getMatch(allTerms.related, termID);
  let npMatch = getMatch(allTerms.np, termID);
  let broadMatch = getMatch(allTerms.broad, termID);
  let narrowMatch = getMatch(allTerms.narrow, termID);
  let preferredMatch = allTerms.terms.filter(
    (term) => term.id === Number(currentTerm[0].termId)
  );

  //Index locating of all terms in relation to the current term
  let relatedIndex = relatedMatch.map((term) => {
    return indexLocation(currentTermsList, term.relatedTermId);
  });

  let npIndex = npMatch.map((term) => {
    return indexLocation(currentTermsList, term.id);
  });

  let broadIndex = broadMatch.map((term) => {
    return indexLocation(currentTermsList, term.broadTermId);
  });

  let narrowIndex = narrowMatch.map((term) => {
    return indexLocation(currentTermsList, term.narrowTermId);
  });

  let preferredIndex = preferredMatch.map((term) => {
    return indexLocation(currentTermsList, term.id);
  });

  //Return value of each index gathered
  let relatedLinks = relatedIndex.map((term) => {
    return currentTermsList.at(term);
  });

  let npLinks = npIndex.map((term) => {
    return currentTermsList.at(term);
  });

  let broadLinks = broadIndex.map((term) => {
    return currentTermsList.at(term);
  });

  let narrowLinks = narrowIndex.map((term) => {
    return currentTermsList.at(term);
  });

  let preferredLinks = preferredIndex.map((term) => {
    return currentTermsList?.at(term);
  });

  return (
    <>
      {currentTerm.length >= 1 ? (
        termID.includes("np") ? (
          <Layout
            title={currentTerm[0].nonPreferred}
            titleItalic
            activeNav={currentTerm[0].nonPreferred}
            navButtons
            navBtnLeftText={navBtnLeft.preferred || navBtnLeft.nonPreferred}
            navBtnRightText={navBtnRight.preferred || navBtnRight.nonPreferred}
            navBtnLeftURL={`/results/${pageIDLeft}/${navBtnLeft.id}`}
            navBtnRightURL={`/results/${pageIDRight}/${navBtnRight.id}`}
          >
            <Row className="justify-content-center pt-5">
              <Col>
                <h3>Use the preferred term instead:</h3>
                <ul className="list-unstyled">
                  {preferredLinks.map((term, i) => {
                    return (
                      <li key={i}>
                        <Link>{term.preferred}</Link>
                      </li>
                    );
                  })}
                </ul>
              </Col>
            </Row>
          </Layout>
        ) : (
          <Layout
            title={currentTerm[0].preferred || currentTerm[0].nonPreferred}
            activeNav={currentTerm[0].preferred || currentTerm[0].nonPreferred}
            navButtons
            navBtnLeftText={navBtnLeft.preferred || navBtnLeft.nonPreferred}
            navBtnRightText={navBtnRight?.preferred || navBtnRight.nonPreferred}
            navBtnLeftURL={`/results/${pageIDLeft}/${navBtnLeft.id}`}
            navBtnRightURL={`/results/${pageIDRight}/${navBtnRight?.id}`}
          >
            <Row>
              <Col>
                <a href={searchURL}>
                  Search our library’s catalog with this term
                </a>
              </Col>
            </Row>
            <Row className="justify-content-center pt-5">
              {currentTerm[0].scopeNotes ? (
                <Col lg={8}>
                  <p className="fw-bold">{currentTerm[0].scopeNotes}</p>
                </Col>
              ) : null}
            </Row>
            {npLinks.length > 0 ? (
              <Row className="justify-content-center pt-5">
                <Col lg={8}>
                  <h3 className="fw-bold">Used for:</h3>
                  <ul className="list-unstyled">
                    {npLinks.map((term, i) => {
                      return (
                        <li key={i} className="mt-3">
                          {term.nonPreferred}
                        </li>
                      );
                    })}
                  </ul>
                </Col>
              </Row>
            ) : null}
            {relatedLinks.length > 0 ? (
              <Row className="justify-content-center pt-2">
                <Col lg={8}>
                  <h3 className="fw-bold">Related:</h3>
                  <ul className="list-unstyled">
                    {relatedLinks.map((term, i) => {
                      return (
                        <li key={i} className="mt-3">
                          <Link
                            className="textLink text-decoration-none"
                            to={`/results/${getPageID(term)}/${term.id}`}
                          >
                            {term.preferred}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Col>
              </Row>
            ) : null}
            {broadLinks.length > 0 ? (
              <Row className="justify-content-center pt-2">
                <Col lg={8}>
                  <h3 className="fw-bold">Broad Terms:</h3>
                  <ul className="list-unstyled">
                    {broadLinks.map((term, i) => {
                      return (
                        <li key={i} className="mt-3">
                          <Link
                            className="textLink text-decoration-none"
                            to={`/results/${getPageID(term)}/${term.id}`}
                          >
                            {term.preferred}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Col>
              </Row>
            ) : null}
            {narrowLinks.length > 0 ? (
              <Row className="justify-content-center pt-2">
                <Col lg={8}>
                  <h3 className="fw-bold">Narrower Terms:</h3>
                  <ul className="list-unstyled">
                    {narrowLinks.map((term, i) => {
                      return (
                        <li key={i} className="mt-3">
                          <Link
                            className="textLink text-decoration-none"
                            to={`/results/${getPageID(term)}/${term.id}`}
                          >
                            {term.preferred}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Col>
              </Row>
            ) : null}
          </Layout>
        )
      ) : null}
    </>
  );
};

export default TermDetails;
