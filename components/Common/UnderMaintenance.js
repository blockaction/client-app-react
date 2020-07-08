import React, { Component } from "react";
import { withRouter } from "next/router";

class UnderMaintenance extends Component {

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
