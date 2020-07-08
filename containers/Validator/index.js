import React, { Component } from "react";
import Layout from "components/layout";
import {
  Row,
  Col,
  Container,
  Table,
  Badge,
  Form,
  Tooltip,
  OverlayTrigger,
  Nav,
  Tab,
} from "react-bootstrap";
import * as action from "utils/api";
import { withRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { main } from "@popperjs/core";
import Link from "next/link";
import InnerPageBanner from "components/Common/InnerPageBanner/";
import moment from 'moment'

class Validator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      copy: "Copy",
      page: 1,
      perPage: 10,
      query: "",
      filteredData: [],
    };
  }

  static async getInitialProps({ asPath, query }) {
    const data = await action
      .getData(`/validator/info/${query.key}`)
      .then((res) => res);

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

  render() {
    const { data, asPath, query } = this.props;
    const { mainData, page, perPage, copy } = this.state;
    const loopData = mainData && mainData.count ? mainData : data;
    var slicedData =
      loopData &&
      loopData.validatorList &&
      loopData.validatorList.length > 0 &&
      loopData.validatorList.slice((page - 1) * perPage, page * perPage);
    return (
      <Layout
        websiteTitle="Validator Details - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
      >
        <Container>
          {data ? (
            <section>
              <InnerPageBanner pageTitle="Validator" />
              <Row>
                <Col>
                  <b>
                    <span className="info-icon bold">i</span> Validator Information
                  </b>
                  <div className="public__key mt-2 mb-2 h6   text-monospace mb-0">
                    {data && data.publicKey ? data.publicKey : ""}{" "}
                    {data && data.publicKey &&
                    <OverlayTrigger
                      placement="top"
                      trigger={["hover", "focus"] || "hover" || "click"}
                      overlay={
                        <Tooltip id={`tooltip-${"top"}`}>{copy}</Tooltip>
                      }
                    >
                      <span className="js-clipboard rounded-circle">
                        <svg
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.copyToClipBoard(query && query.key)
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          // ariaHidden="true"
                          className="svg-inline--fa fa-copy fa-w-14"
                          data-icon="copy"
                          data-prefix="fas"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M433.941 65.941l-51.882-51.882A48 48 0 00348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 00-14.059-33.941zM266 464H54a6 6 0 01-6-6V150a6 6 0 016-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 01-6 6zm128-96H182a6 6 0 01-6-6V54a6 6 0 016-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 01-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 011.757 4.243V112z"
                          ></path>
                        </svg>
                      </span>
                    </OverlayTrigger>
                    }
                  </div>
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
                  {/* <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Home">
                        <div>1</div>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                    <div>2</div>
                    </Tab>
                    </Tabs> */}
                  <Tab.Container id="" defaultActiveKey="first">
                    <Nav variant="tabs">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Overview</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Row>
                          <Col>
                            <div className="box">
                              <div className="box-body">
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">Index</p>
                                  </div>
                                  <div className="col-md-9 ">
                                    {data.index ? data.index : "N/A"}
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Current Balance
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    {data.currentBalance
                                      ? Math.round(data.currentBalance * 100) /
                                          100 +
                                        " ETH"
                                      : "N/A"}
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Effective Balance
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    {data.effectiveBalance
                                      ? data.effectiveBalance
                                      : "N/A"}
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Deposits Received
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    {data.depositsReceived
                                      ? data.depositsReceived
                                      : "N/A"}
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Status
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    <Badge
                                      variant={
                                        data.status === "ACTIVE"
                                          ? "success"
                                          : "light"
                                      }
                                    >
                                      {" "}
                                      {data.status ? data.status : "N/A"}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <hr className="my-4>"></hr>
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className="text-secondary mb-0">
                                        Total Income
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.totalIncome
                                        ? data.totalIncome + " ETH"
                                        : "N/A"}
                                    </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className="text-secondary mb-0">
                                        Slashed
                                        <sup className="small"></sup>
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.slashed ? "True" : "False"}
                                    </div>
                                  </div>
                                  <hr className="my-4>"></hr>
                                  {data && data.eligibilityEpoch &&
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className="text-secondary mb-0">
                                        Eligible Epoch{" "}
                                      </p>
                                    </div>
                                    <div className="col-md-9 font-size-1">
                                      <i>
                                        epoch{" "}
                                        <Link
                                          href={"/epoch/[key]"}
                                          as={`/epoch/${
                                            data && data.eligibilityEpoch
                                          }`}
                                        >
                                          <a style={{ textDecoration: "none" }}>
                                            {data
                                              ? data.eligibilityEpoch
                                              : "---"}
                                          </a>
                                        </Link>
                                        {data && data.eligibility_epoch_time && 
                                              data.eligibility_epoch_time !== "N/A" 
                                              && " ("+ moment(data.eligibility_epoch_time).fromNow() +")" }
                                      </i>
                                    </div>
                                  </div>
                                  }
                                </div>
                                {data && data.activationEpoch &&
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Activation Epoch{" "}
                                    </p>
                                  </div>
                                  <div className="col-md-9 font-size-1">
                                    <i>
                                      epoch{" "}
                                      <Link
                                        href={"/epoch/[key]"}
                                        as={`/epoch/${
                                          data && data.activationEpoch
                                        }`}
                                      >
                                        <a style={{ textDecoration: "none" }}>
                                          {data ? data.activationEpoch : "---"}
                                        </a>
                                      </Link>
                                      {data && data.activation_epoch_time && 
                                              data.activation_epoch_time !== "N/A" 
                                              && " ("+ moment(data.activation_epoch_time).fromNow() +")" }
                                    </i>
                                  </div>
                                </div>
                                }
                                <hr className="my-4>"></hr>
                                {data && data.exitEpoch &&
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Exit On{" "}
                                    </p>
                                  </div>
                                  <div className="col-md-9 font-size-1">
                                    <i>
                                      epoch{" "}
                                      <Link
                                        href={"/epoch/[key]"}
                                        as={`/epoch/${
                                          data && data.exitEpoch
                                        }`}
                                      >
                                        <a style={{ textDecoration: "none" }}>
                                          {data ? data.exitEpoch : "---"}
                                        </a>
                                      </Link>
                                      {data && data.exitEpoch_time && 
                                              data.exitEpoch_time !== "N/A" 
                                              && " ("+ moment(data.exitEpoch_time).fromNow() +")" }
                                    </i>
                                  </div>
                                </div>
                                }
                                {data && data.exitEpoch &&
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                    Withdrawable On{" "}
                                    </p>
                                  </div>
                                  <div className="col-md-9 font-size-1">
                                    <i>
                                      epoch{" "}
                                      <Link
                                        href={"/epoch/[key]"}
                                        as={`/epoch/${
                                          data && data.withdrawableEpoch
                                        }`}
                                      >
                                        <a style={{ textDecoration: "none" }}>
                                          {data ? data.withdrawableEpoch : "---"}
                                        </a>
                                      </Link>
                                      {data && data.withdrawableEpoch_time && 
                                              data.withdrawableEpoch_time !== "N/A" 
                                              && " ("+ moment(data.withdrawableEpoch_time).fromNow() +")" }
                                    </i>
                                  </div>
                                </div>
                                }
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

export default withRouter(Validator);
