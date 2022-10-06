import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Layout = ({
  children,
  title,
  getsShared,
  summary,
  activeNav,
  navButtons,
  navBtnLeftText,
  navBtnRightText,
  navBtnLeftURL,
  navBtnRightURL,
  titleItalic,
}) => {
  return (
    <Container>
      <Row className="pt-4 justify-content-center">
        <Col>
          <Nav active={activeNav} />
        </Col>
      </Row>
      <Row className="py-4 justify-content-center">
        <Col lg={10}>
          {navButtons ? (
            <Row className="justify-content-center">
              <Col lg={4}>
                <div className="d-flex justify-content-center flex-column h-100">
                  <Link
                    to={navBtnLeftURL}
                    className="text-black text-decoration-none btn btn-light btn-lg"
                  >
                    <FontAwesomeIcon
                      className="me-1"
                      icon={faCircleArrowLeft}
                      size="sm"
                    />
                    {navBtnLeftText}
                  </Link>
                </div>
              </Col>
              <Col lg={4}>
                {titleItalic ? (
                  <h1 className="fw-bolder display-5 fst-italic">{title}</h1>
                ) : (
                  <h1 className="fw-bolder display-5">{title}</h1>
                )}
              </Col>
              <Col lg={4}>
                <div className="d-flex justify-content-center flex-column h-100">
                  <Link
                    to={navBtnRightURL}
                    className="text-black text-decoration-none btn btn-lg btn-light"
                  >
                    {navBtnRightText}
                    <FontAwesomeIcon
                      className="ms-1"
                      icon={faCircleArrowRight}
                      size="sm"
                    />
                  </Link>
                </div>
              </Col>
            </Row>
          ) : (
            <h1 className="fw-bolder display-5">{title}</h1>
          )}
          {getsShared ? (
            <ul className="small list-unstyled d-flex justify-content-center">
              <li className="text-muted">Share on:</li>
              <li className="px-4">
                <a
                  className="text-decoration-none"
                  href="https://twitter.com/intent/tweet?text=The%20National%20Emergency%20Training%20Center%20library%27s%20thesaurus%20is%20available%20at%20http://bit.ly/2ezZAwj"
                >
                  Twitter
                </a>
              </li>
              <li className="px-4">
                <a
                  className="text-decoration-none"
                  href="https://www.facebook.com/sharer/sharer.php?u=https://apps.usfa.fema.gov/thesaurus/"
                >
                  Facebook
                </a>
              </li>
              <li className="px-4">
                <a
                  className="text-decoration-none"
                  href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//apps.usfa.fema.gov/thesaurus/"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          ) : null}
        </Col>
      </Row>
      {summary ? (
        <Row className="justify-content-center pb-4">
          <Col lg={6}>
            <p className="fw-bold">{summary}</p>
          </Col>
        </Row>
      ) : null}
      {children}
    </Container>
  );
};

export default Layout;
