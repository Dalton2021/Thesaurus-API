import React, { useContext } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import TermsList from "../components/TermsList";
import TermContext from "../TermContext";

const Results = () => {
  const { id } = useParams();
  const { list } = useContext(TermContext);
  let { terms } = useContext(TermContext);

  //Logic to filter array of terms by letter. Also makes sure each word is capped
  terms =
    id === "123"
      ? terms.filter((term) => term.match(new RegExp(/^\d+/g)) !== null)
      : terms
          .map((term) =>
            term
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          )
          .filter((letter) => letter.startsWith(id));

  return (
    <Layout title={id} activeNav={id}>
      <Row>
        <Col>
          <p>
            Each term generally includes links to Broader Terms, Narrower Terms and/or Related Terms. Other
            links may include Scope Notes, Used For and Use.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <TermsList activePage={list.indexOf(id)} />
        </Col>
      </Row>
      <Row className="justify-content-center pt-5">
        <Col xs={12} md={9} lg={7}>
          {terms ? (
            <ul className="list-inline">
              {terms.map((term, index) => {
                return (
                  <li className="list-inline-item m-2" key={index}>
                    <a className="text-decoration-none" href="#">
                      <strong>{term}</strong>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </Col>
      </Row>
    </Layout>
  );
};

export default Results;
