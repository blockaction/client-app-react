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
  Spinner,
} from "react-bootstrap";
import * as action from "utils/api";
import { withRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { main } from "@popperjs/core";
import Link from "next/link";
import { text_truncate } from "utils/helperFunctions";
import InnerPageBanner from "components/Common/InnerPageBanner/";

class AllValidators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      page: 1,
      perPage: 10,
      query: "",
      filteredData: [],
      loader: false,
    };
    this.timeout = 0;
  }

  static async getInitialProps() {
    const data = await action
      .getData("validators/validators_list?page=1&perPage=10")
      .then((res) => res);

    return {
      data,
    };
  }

  componentDidMount() {}

  handlePageClick = (data) => {
    const page = data.selected + 1;
    this.setState({ page: page, loader: true }, () => {
      action
        .getData(
          `validators/validators_list?page=${page}&perPage=${this.state.perPage}`
        )
        .then((res) => {
          if (res && res.message === "Sucess") {
            this.setState({ mainData: res, loader: false });
          } else {
            this.setState({ mainData: {}, loader: false });
          }
        });
    });
  };

  handleChange = (event) => {
    this.setState(
      { perPage: parseInt(event.target.value), loader: true, page: 1 },
      () => {
        action
          .getData(
            `validators/validators_list?page=${this.state.page}&perPage=${this.state.perPage}`
          )
          .then((res) => {
            if (res && res.message === "Sucess") {
              this.setState({ mainData: res, loader: false });
            } else {
              this.setState({ mainData: {}, loader: false });
            }
          });
      }
    );
  };

  renderTooltip = (props, key) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        <span style={{ fontSize: "10px" }}>{key}</span>
      </Tooltip>
    );
  };

  handleInputChange = (event) => {
    const { page, query } = this.state;
    const value = event.target.value;
    this.setState({ [event.target.name]: value }, () => {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        action
          .getData(
            `validators/validators_list?page=${page}&publickey=${this.state.query}`
          )
          .then((res) => {
            if (res && res.message === "Sucess") {
              this.setState({ mainData: res });
            }
          });
      }, 1000);
    });
  };

  render() {
    const { data } = this.props;
    const { mainData, loader, perPage } = this.state;
    const loopData = mainData && mainData.count ? mainData : data;
    // var slicedData = loopData && loopData.validatorList && loopData.validatorList.length > 0 && loopData.validatorList.slice((page-1)*perPage, (page * perPage));
    return (
      <Layout
        websiteTitle="All Validators - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
      >
        <Container>
          <section>
          <InnerPageBanner pageTitle="All Validators" />
            {/* <Row className="justify-content-md">
              <Col md="4">
                <span>
                  <Form.Control
                    className="mb-3"
                    size="md"
                    type="text"
                    placeholder="Search by public key…"
                    name="query"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                  />
                </span>
              </Col>
            </Row> */}
               <div className={loader ? 'spinner-new overlay-loader-for-table' : ''}></div>
            <Table className="mt-3 mb-3">
              <thead>
                <tr>
                  <th>Public Key </th>
                  <th>Effective Balance</th>
                  <th>Slashed</th>
                </tr>
              </thead>
              <tbody>
                {
                loopData &&
                loopData.validatorList &&
                loopData.validatorList.length > 0 ? (
                  loopData.validatorList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 400 }}
                          overlay={(props) =>
                            this.renderTooltip(
                              props,
                              item.validator ? item.validator.publicKey : ""
                            )
                          }
                        >
                          <td style={{ width: "33%" }}>
                            <Link
                              href={`validator/${
                                item.validator && item.validator.publicKey
                              }`}
                            >
                              <a style={{ textDecoration: "none" }}>
                                {text_truncate(
                                  item.validator
                                    ? item.validator.publicKey
                                    : "---",
                                  30
                                )}
                              </a>
                            </Link>
                          </td>
                        </OverlayTrigger>
                        <td>{32} ETH</td>
                        <td>
                          {item.validator && item.validator.slashed
                            ? "True"
                            : "False"}
                        </td>
                      </tr>
                    );
                  })
                ) 
                // : loader ? (
                //   <tr className="loader-graph">
                //     <td>
                //       <Spinner animation="border" role="status">
                //         <span className="sr-only">Loading...</span>
                //       </Spinner>
                //     </td>
                //   </tr>
                // ) 
                : (
                  <tr>
                    <td>No Validators</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {loopData &&
              loopData.validatorList &&
              loopData.validatorList.length > 0 && (
                <Row className="d-flex justify-content-between mr-1 ml-1">
                  <div className="select-wrap">
                    <Form.Control
                      size="sm"
                      as="select"
                      name="perPage"
                      // value={data.state || ''}
                      onChange={this.handleChange}
                    >
                      {/* <option value="_" disabled="" selected="">
                      Select One
                    </option> */}
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </Form.Control>
                  </div>
                  <ReactPaginate
                    containerClassName="pagination"
                    pageClassName="page-item"
                    activeClassName="active"
                    forcePage={this.state.page - 1}
                    pageCount={(loopData && loopData.totalSize  / (perPage ? perPage : 10)) -1}
                    pageRangeDisplayed={5}
                    nextLabel={">>"}
                    previousLabel={"<<"}
                    onPageChange={this.handlePageClick}
                  />
                </Row>
              )}
          </section>
        </Container>
      </Layout>
    );
  }
}

export default withRouter(AllValidators);
