import React, { Component } from "react";
import Layout from "components/layout";
import { Container, Row, Accordion, Card } from "react-bootstrap";
import InnerPageBanner from "components/Common/InnerPageBanner";
import * as action from "utils/api";
import { withRouter } from "next/router";
import ContentUnavailable from "components/Common/ContentUnavailable";

class UnderMaintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexOpen: null,
      indexOpen2: null,
    };
  }

  render() {
    return (
      <section className="under-maintenance">
        <div className="wrapper">
          <div className="illustration">
            <img src="../../static/cleaning.png" />
          </div>
          <p className="text">Site Under Maintenance</p>
          <p>We'll come back soon.</p>
        </div>
      </section>
    );
  }
}

export default withRouter(UnderMaintenance);
