import React, { Component } from "react";
import Layout from "components/layout";
import {
  Row,
  Col,
  Container,
  Table,
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
import moment from "moment";

class Epoch extends Component {
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
    const data = await action.getData(`epoch/${query.key}`).then((res) => res);

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
        websiteTitle="Epoch Details - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
      >
        <div className="background-circles">
          <img src="../../static/background-circles.svg" />
        </div>
        <Container>
          {data && !data.error_msg ? (
            <section>
              <InnerPageBanner pageTitle="Epoch" />
              <Row>
                <Col>
                  <b>
                    {" "}
                    <span className="info-icon bold">i</span> Epoch Information
                  </b>
                  {/* <div className='mt-2 mb-2 h6 font-weight-normal text-secondary text-break-all mb-0'>
                 {query && query.key ? query.key : 'N/A'} <OverlayTrigger
                            placement="top"
                            trigger={['hover','focus'] || 'hover' || 'click'}
                            overlay={<Tooltip id={`tooltip-${'top'}`}>{copy}</Tooltip>}
                          >
                              <span className='js-clipboard rounded-circle'>
                                 <svg
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => this.copyToClipBoard(query && query.key)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width='20px'
                                    height='20px'
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
                        </div> */}
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
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
                              <div className="details">
                                <div className="grey-row">
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className="text-secondary mb-0">
                                        Epoch
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1 font-weight-bold">
                                      {data.epoch ? data.epoch : "N/A"}
                                      {/* <Link href={`/epoch/${parseInt(query.key)-1}`}>
                                                            <a style={{textDecoration:'none'}}>
                                                            <button 
                                                               className="btn previous-btn" 
                                                               size='sm'
                                                               type="submit">
                                                              Prev
                                                        </button>
                                                        </a>
                                                        </Link>
                                                        <Link href={`/epoch/${parseInt(query.key) +1}`}>
                                                            <a style={{textDecoration:'none'}}>
                                                            <button 
                                                              className="btn next-btn"
                                                              size='sm'
                                                              type="submit">
                                                          <span>next</span>
                                                        </button>
                                                        </a>
                                                        </Link> */}
                                    </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className=" text-secondary mb-0">
                                        Finalized
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      <span
                                        className={
                                          data.finalized
                                            ? "badge bg-success"
                                            : "badge badge-secondary"
                                        }
                                      >
                                        {data.finalized ? "True" : "False"}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className="text-secondary mb-0">
                                        Time
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      <i className="icon-clock-o mr-1" />
                                      {data && data.time
                                        ? moment(data.time).format(
                                            "MMM-DD-YYYY HH:mm:ss"
                                          ) +
                                          " (" +
                                          moment(data.time).fromNow() +
                                          ")"
                                        : "N/A"}
                                    </div>
                                  </div>
                                  <div className="row ">
                                    <div className="col-md-3">
                                      <p className=" text-secondary mb-0">
                                        Attestations
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.attestations != null
                                        ? data.attestations
                                        : "N/A"}
                                    </div>
                                  </div>
                                </div>

                                <div className="grey-row">
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className=" text-secondary mb-0">
                                        Deposits
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.deposits !== null
                                        ? data.deposits
                                        : "N/A"}
                                    </div>
                                  </div>
                                  {data.slashing && (
                                    <div className="row mb-3">
                                      <div className="col-md-3">
                                        <p className=" text-secondary mb-0">
                                          Slashing P/A
                                        </p>
                                      </div>
                                      <div className="col-md-9 js-focus-state font-size-1">
                                        {data.slashing.attester_slashing !==
                                        null
                                          ? data.slashing.attester_slashing
                                          : "--"}{" "}
                                        /{" "}
                                        {data.slashing.proposer_slashing !==
                                        null
                                          ? data.slashing.proposer_slashing
                                          : "--"}
                                      </div>
                                    </div>
                                  )}
                                  <div className="row ">
                                    <div className="col-md-3">
                                      <p className=" text-secondary mb-0">
                                        Total Validators Count
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.validator_count !== null
                                        ? data.validator_count
                                        : "N/A"}
                                    </div>
                                  </div>
                                </div>

                                <div className="grey-row">
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className=" text-secondary mb-0">
                                        Proposed Blocks
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.blocks &&
                                      data.blocks.proposed !== null
                                        ? data.blocks.proposed
                                        : "N/A"}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-3">
                                      <p className=" text-secondary mb-0">
                                        Skipped Blocks
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.blocks && data.blocks.skipped
                                        ? data.blocks.skipped
                                        : "N/A"}
                                    </div>
                                  </div>
                                </div>

                                <div className="grey-row">
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className=" text-secondary mb-0">
                                        Voluntary Exists
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.voluntay_exists !== null
                                        ? data.voluntay_exists
                                        : "N/A"}
                                    </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className=" text-secondary mb-0">
                                        Voted Ether
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.voted_ether !== null
                                        ? data.voted_ether + " ETH"
                                        : "N/A"}
                                    </div>
                                  </div>
                                  <div className="row ">
                                    <div className="col-md-3">
                                      <p className=" text-secondary mb-0">
                                        Participation Rate
                                      </p>
                                    </div>
                                    <div className="col-md-9 js-focus-state font-size-1">
                                      {data.participation_rate !== null
                                        ? Math.round(
                                            data.participation_rate * 100
                                          ) /
                                            100 +
                                          "%"
                                        : "N/A"}
                                    </div>
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
                      The data you're looking for isn't available yet. Please
                      try again later.
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

export default withRouter(Epoch);
