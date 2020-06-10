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

class Slot extends Component {
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
    const data = await action.getData(`slot/${query.key}`).then((res) => res);

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
        websiteTitle="Slot Details - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
      >
        {/* <InnerPageBanner pageTitle="Slot" /> */}
        <Container>
          {data && !data.error_msg ? (
            <section>
              <InnerPageBanner pageTitle="Slot" />
              <Row>
                <Col>
                  <b>
                    <span className="info-icon bold">i</span> Slot Information
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
                  <Tab.Container
                    id=""
                    defaultActiveKey={1}
                    onSelect={this.handleSelect}
                  >
                    <Nav variant="tabs">
                      <Nav.Item>
                        <Nav.Link eventKey={1}>Overview</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey={2}>
                          Attestations
                          {attestationData && attestationData.attestations_count
                            ? " (" + attestationData.attestations_count + ")"
                            : ""}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey={1}>
                        <Row>
                          <Col>
                            <div className="box">
                              {data && data.data[0] && data.data[0].status === 'proposed' ?
                              <div className="box-body">
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Slot Number
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 font-weight-bold">
                                    {data.data &&
                                    data.data[0] &&
                                    data.data[0].slot
                                      ? data.data[0].slot
                                      : "N/A"}
                                    <Link
                                      href={"/slot/[key]"}
                                      as={`/slot/${parseInt(query.key) - 1}`}
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
                                      href={"/slot/[key]"}
                                      as={`/slot/${parseInt(query.key) + 1}`}
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
                                    <p className="text-secondary mb-0">Epoch</p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                  <Link
                                    href={"/epoch/[key]"}
                                    as={`/epoch/${data.data &&
                                      data.data[0] &&
                                      data.data[0].epoch}`}
                                  >
                                    <a style={{ textDecoration: "none" }}>
                                      {data.data &&
                                      data.data[0] &&
                                      data.data[0].epoch
                                        ? data.data[0].epoch
                                        : "N/A"}
                                    </a>
                                  </Link>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Status
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    <span
                                      className={
                                        data.data &&
                                        data.data[0] &&
                                        data.data[0].status === "proposed"
                                          ? "text-green badge bg-success"
                                          : data.data[0].status === "Skipped"
                                          ? "badge bg-light"
                                          : ""
                                      }
                                    >
                                      {data.data &&
                                      data.data[0] &&
                                      data.data[0].status
                                        ? data.data[0].status
                                        : "N/A"}
                                    </span>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">Time</p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    <i className="icon-clock-o mr-1" />
                                    {data.data &&
                                    data.data[0] &&
                                    data.data[0].time
                                      ? moment(data.data[0].time).format("MMM-DD-YYYY HH:mm:ss") + ' (' + moment(data.data[0].time).fromNow()+')'
                                      : "N/A"}
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Proposer
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    <i className="icon-user mr-1" />
                                    {data.data &&
                                    data.data[0] &&
                                    data.data[0].proposer
                                      ? data.data[0].proposer
                                      : "N/A"}
                                  </div>
                                </div>
                                <hr className="my-4>"></hr>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Block Root Hash
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    <span className="text-monospace">
                                      {" "}
                                      {data.data &&
                                      data.data[0] &&
                                      data.data[0].block_root
                                        ? data.data[0].block_root
                                        : "N/A"}
                                    </span>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Parent Root Hash
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                    {data.data &&
                                    data.data[0] &&
                                    data.data[0].parent_root
                                      ? data.data[0].parent_root
                                      : "N/A"}
                                  </div>
                                </div>
                                <hr className="my-4>"></hr>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Signature
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                    {data.data &&
                                    data.data[0] &&
                                    data.data[0].signature
                                      ? data.data[0].signature
                                      : "N/A"}
                                  </div>
                                </div>
                                <hr className="my-4>"></hr>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Graffiti
                                    </p>
                                  </div>

                                  <div className="col-md-9 font-size-1 bg-light text-monospace px-1 mb-1">
                                    <Row>
                                      <Col md={9}>
                                        {graffitiShow === "hex" ? (
                                          <div className="ml-2">
                                            {data.data &&
                                              data.data[0] &&
                                              data.data[0].graffiti &&
                                              data.data[0].graffiti.hex}
                                          </div>
                                        ) : (
                                          <div>
                                            {data.data &&
                                              data.data[0] &&
                                              data.data[0].graffiti &&
                                              data.data[0].graffiti.utf_8}
                                          </div>
                                        )}
                                      </Col>
                                      <Col md={3}>
                                        <div
                                          className="btn-group btn-group-toggle"
                                          data-toggle="buttons"
                                        >
                                          <label
                                            className={
                                              graffitiShow === "hex"
                                                ? "active btn btn-secondary btn-sm"
                                                : "btn btn-secondary btn-sm"
                                            }
                                            onClick={() =>
                                              this.showGrafftti("hex")
                                            }
                                          >
                                            Hex
                                          </label>
                                          <label
                                            className={
                                              graffitiShow === "utf"
                                                ? "active btn btn-secondary btn-sm"
                                                : "btn btn-secondary btn-sm"
                                            }
                                            onClick={() =>
                                              this.showGrafftti("utf")
                                            }
                                          >
                                            UTF-8
                                          </label>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                                <hr className="my-4>"></hr>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                    Ethereum Block Hash  
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                  <a 
                                   href={`https://goerli.etherscan.io/block/${ data.data[0] && data.data[0].eth1_data &&
                                       data.data[0].eth1_data.block_hash}`}
                                   target="_blank"
                                   >{data.data &&
                                   
                                   data.data[0] &&
                                    data.data[0].eth1_data &&
                                    data.data[0].eth1_data.block_hash
                                      ? data.data[0].eth1_data.block_hash
                                      : "N/A"}
                                      </a>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Ethereum Deposit Count
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    {data.data &&
                                    data.data[0] &&
                                    data.data[0].eth1_data &&
                                    data.data[0].eth1_data.deposit_count
                                      ? data.data[0].eth1_data.deposit_count
                                      : "N/A"}
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">
                                      Ethereum Deposit Root
                                    </p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1 text-monospace">
                                    {data.data &&
                                    data.data[0] &&
                                    data.data[0].eth1_data &&
                                    data.data[0].eth1_data.deposit_root
                                      ? data.data[0].eth1_data.deposit_root
                                      : "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <hr className="my-4>"></hr>
                                  <div className="row mb-3">
                                    <div className="col-md-3">
                                      <p className="text-secondary mb-0">
                                        State Root{" "}
                                      </p>
                                    </div>
                                    <div className="col-md-9 font-size-1 text-monospace">
                                      {data.data &&
                                      data.data[0] &&
                                      data.data[0].state_root
                                        ? data.data[0].state_root
                                        : "--"}
                                    </div>
                                  </div>
                                </div>
                              </div> 
                              :
                              data && data.data[0] && data.data[0].status  === 'skipped' ?
                              <div className="box-body">
                              <div className="row mb-3">
                                <div className="col-md-3">
                                  <p className="text-secondary mb-0">
                                    Slot Number
                                  </p>
                                </div>
                                <div className="col-md-9 js-focus-state font-size-1 font-weight-bold">
                                  {data.data &&
                                  data.data[0] &&
                                  data.data[0].slot
                                    ? data.data[0].slot
                                    : "N/A"}
                                  <Link
                                    href={"/slot/[key]"}
                                    as={`/slot/${parseInt(query.key) - 1}`}
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
                                    href={"/slot/[key]"}
                                    as={`/slot/${parseInt(query.key) + 1}`}
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
                                    <p className="text-secondary mb-0">Epoch</p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                  <Link
                                    href={"/epoch/[key]"}
                                    as={`/epoch/${data.data &&
                                      data.data[0] &&
                                      data.data[0].epoch}`}
                                  >
                                    <a style={{ textDecoration: "none" }}>
                                      {data.data &&
                                      data.data[0] &&
                                      data.data[0].epoch
                                        ? data.data[0].epoch
                                        : "N/A"}
                                    </a>
                                  </Link>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-3">
                                    <p className="text-secondary mb-0">Time</p>
                                  </div>
                                  <div className="col-md-9 js-focus-state font-size-1">
                                    <i className="icon-clock-o mr-1" />
                                    {data.data &&
                                    data.data[0] &&
                                    data.data[0].time
                                      ? moment(data.data[0].time).format("MMM-DD-YYYY HH:mm:ss") + ' (' + moment(data.data[0].time).fromNow()+')'
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
                                    <span
                                      className={
                                        data.data &&
                                        data.data[0] &&
                                        data.data[0].status === "proposed"
                                          ? "text-green badge bg-success"
                                          : data.data[0].status === "Skipped"
                                          ? "badge bg-light"
                                          : ""
                                      }
                                    >
                                      {data.data &&
                                      data.data[0] &&
                                      data.data[0].status
                                        ? data.data[0].status
                                        : "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div> : null
                              }

                              
                            </div>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                    <Tab.Content>
                      <Tab.Pane eventKey={2}>
                        <Row>
                          <Col>
                            {attestationData &&
                            attestationData.attestian_detail ? (
                              attestationData.attestian_detail.map(
                                (item, index) => {
                                  return (
                                    <div key={index} className="box">
                                      <div className="box-body">
                                        <div className="row mb-3">
                                          <div className="col-md-3">
                                            <p className="text-secondary mb-0">
                                              Attestation ({index + 1}){" "}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <div className="col-md-3">
                                            <p className="text-secondary mb-0">
                                              Slot{" "}
                                            </p>
                                          </div>
                                          <div className="col-md-9 font-size-1">
                                            <Link
                                              href={"/slot/[key]"}
                                              as={`/slot/${attestationData.slot}`}
                                            >
                                              <a
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                {attestationData.slot
                                                  ? attestationData.slot
                                                  : "---"}
                                              </a>
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <div className="col-md-3">
                                            <p className="text-secondary mb-0">
                                              Committe Index{" "}
                                            </p>
                                          </div>
                                          <div className="col-md-9 font-size-1">
                                            {item.committeeIndex
                                              ? item.committeeIndex
                                              : "N/A"}
                                          </div>
                                        </div>
                                        {/* <div className="row mb-3">
                                          <div className="col-md-3">
                                            <p className="text-secondary mb-0">
                                              Aggregation Bits{" "}
                                            </p>
                                          </div>
                                          <div className="col-md-9 font-size-1">
                                            {item.aggregationBits
                                              ? item.aggregationBits
                                              : "N/A"}
                                          </div>
                                        </div> */}
                                        <div className="row mb-3">
                                          <div className="col-md-3">
                                            <p className="text-secondary mb-0">
                                              Beacon Block Root{" "}
                                            </p>
                                          </div>
                                          <div className="col-md-9 font-size-1 text-monospace">
                                            {item.beaconBlockRoot
                                              ? item.beaconBlockRoot
                                              : "N/A"}
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <div className="col-md-3">
                                            <p className="text-secondary mb-0">
                                              Source Epoch{" "}
                                            </p>
                                          </div>
                                          <div className="col-md-9 font-size-1">
                                            <Link
                                              href={"/epoch/[key]"}
                                              as={`/epoch/${item.target_epoch}`}
                                            >
                                              <a
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                {item.source_epoch
                                                  ? item.source_epoch
                                                  : "N/A"}
                                              </a>
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="row mb-3">
                                          <div className="col-md-3">
                                            <p className="text-secondary mb-0">
                                              Target Epoch{" "}
                                            </p>
                                          </div>
                                          <div className="col-md-9 font-size-1">
                                            <Link
                                              href={"/epoch/[key]"}
                                              as={`/epoch/${item.target_epoch}`}
                                            >
                                              <a
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                {item.target_epoch
                                                  ? item.target_epoch
                                                  : "N/A"}
                                              </a>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <div className="loader-graph">
                                Loading...
                                <Spinner animation="border" role="status">
                                  <span className="sr-only">Loading...</span>
                                </Spinner>
                              </div>
                            )}
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

export default withRouter(Slot);
