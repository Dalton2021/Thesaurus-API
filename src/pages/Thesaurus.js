import React from "react";
import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";

import TermsList from "../components/TermsList";

const Thesaurus = () => {

  return (
    <Layout
      title={"Library thesaurus"}
      getsShared
      summary={
        "Our thesaurus provides a list of terms commonly used across the fire, Emergency Medical Services and emergency management sectors. It points you to the best terms for searching collections through our online catalog. We welcome your suggestions for new or revised terms."
      }>
      <Row>
        <Col>
          <p className="py-3 mb-0">To find a term, click on one of the letters below to browse alphabetically.</p>
          <TermsList />
          <p className="small py-3">
            Note: the Library of Congress source code designation for this thesaurus is "netc."
          </p>
        </Col>
      </Row>
    </Layout>
  );
};

export default Thesaurus;
