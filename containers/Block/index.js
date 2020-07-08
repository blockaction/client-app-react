import React, { Component } from "react";
import Layout from "components/layout";
import {
  Row,
  Col,
  Container,
  Button,
  Nav,
  Tab,
  Spinner,
} from "react-bootstrap";
import * as action from "utils/api";
import { withRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { main } from "@popperjs/core";
import Link from "next/link";
import InnerPageBanner from "components/Common/InnerPageBanner/";
import moment from "moment";

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "1",
      data: {},
      copy: "Copy",
      page: 1,
      perPage: 10,
      query: "",
      filteredData: [],
      attestationData: {},
      graffitiShow: "hex",
    };
  }

  static async getInitialProps({ asPath, query }) {
    const data = await action.getData(`block/${query.key}`).then((res) => res);

    return {
      data,
      asPath,
      query,
    };
  }

  copyToClipBoard = (key) => {
    var dummyElement = document.createElement("input"),
      copyText = key;
    document.body.appendChild(dummyElement);
    dummyElement.value = copyText;
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
    this.setState({ copy: "Copied" });
    setTimeout(() => {
      this.setState({ copy: "Copy" });
    }, 2000);
  };

  handleSelect = (key) => {
    const { query } = this.props;
    if (key === "1") {
    } else if (key === "2") {
      action.getData(`attestion?slot=${query.key}`).then((res) => {
        if (res && res.message === "Sucess") {
          this.setState({ attestationData: res.data });
        }
      });
    }
  };

  showGrafftti = (show) => {
    if (show === "hex") {
      this.setState({ graffitiShow: "hex" });
    } else if (show === "utf") {
      this.setState({ graffitiShow: "utf" });
    }
  };

  render() {
    const { data, query } = this.props;
    const { copy, attestationData, graffitiShow } = this.state;
    return (
      <Layout
        websiteTitle="Block Details - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
      >
        {/* <InnerPageBanner pageTitle="Slot" /> */}
        <Container>
          {!data ? (
            <section>
              <InnerPageBanner pageTitle="Slot" />
              <Row>
                <Col>
                  <b>
                    <span className="info-icon bold">i</span> Slot Information
                  </b>
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
                  <Tab.Container
                    id=""
                    defaultActiveKey={1}
                    onSelect={this.handleSelect}
                  >
                    <Nav variant="tabs">
                      <Nav.Item>
                        <Nav.Link eventKey={1}>Overview</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey={1}>
                        <Row>
                          <Col>
                            <div className="box">
                              <div className="box-body">
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Block Height
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 font-weight-bold">
                                      2874329
                                    <Link
                                      href={"/block/[key]"}
                                      as={`/block/${parseInt(query.key) - 1}`}
                                    >
                                      <a
                                        style={{ textDecoration: "none" }}
                                        className="previous-btn"
                                        title="Previous slot"
                                      >
                                        <i className="icon-chevron-left"></i>
                                      </a>
                                    </Link>
                                    <Link
                                      href={"/block/[key]"}
                                      as={`/block/${parseInt(query.key) + 1}`}
                                    >
                                      <a
                                        style={{ textDecoration: "none" }}
                                        className="next-btn"
                                        title="Next Slot"
                                      >
                                        <i className="icon-chevron-right"></i>
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Transactions
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    <span
                                    >
                                      9
                                    </span>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">Timestamp</p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    <i className="icon-clock-o mr-1" />
                                      6 hrs 19 mins ago (Jun-14-2020 09:07:08 PM +UTC)
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Mined By
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                      0x22ea9f6b28db76a7162054c05ed812deb2f519cd 
                                  </div>
                                </div>
                                <hr className="my-4>"></hr>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Block Reward
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    <span className="text-monospace">
                                      {" "}
                                      5.00812332834 Ether
                                    </span>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                     Total Difficulty
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                     4,234,453
                                  </div>
                                </div>
                                <hr className="my-4>"></hr>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Size
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                    4,459 bytes
                                </div>
                                <hr className="my-4>"></hr>
                                <hr className="my-4>"></hr>
                              </div> 
                              <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Gas Limit
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                   8,000,000
                                </div>
                              </div> 
                              <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Hash
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                    0xa4d380097fa7d29a94321c8e24a9f6ed6ff0975ce54539aee6f11b9a0f53098a
                                </div>
                              </div> 
                              <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                     Parent Hash
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                    0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347
                                </div>
                              </div> 
                              <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                     Nonce
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                    0x0000000000000000
                                </div>
                              </div> 
                            </div>
                            </div>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Col>
              </Row>
            </section>
          ) : (
            <div className="no-data-container container">
            <div className="row">
              <div className="col-md-8 offset-md-2 ">
                <div className="error-message">
                  <h1>Oops!! Data not found</h1>
                  <h5>
                    The data you're looking for isn't available yet. Please try
                    again later.
                  </h5>
                </div>
              </div>
            </div>
          </div>
          )}
        </Container>
      </Layout>
    );
  }
}

export default withRouter(Block);
