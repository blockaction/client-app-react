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
} from "react-bootstrap";
import * as action from "utils/api";
import { withRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { main } from "@popperjs/core";
import Link from "next/link";
import { text_truncate } from "utils/helperFunctions";

class PendingValidators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      page: 1,
      perPage: 10,
      query: "",
      filteredData: [],
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
    this.setState({ page: page }, () => {
      action
        .getData(
          `validators/validators_list?page=${page}&perpage=${this.state.perPage}`
        )
        .then((res) => {
          if (res && res.message === "Sucess") {
            this.setState({ mainData: res });
          } else {
            this.setState({ mainData: {} });
          }
        });
    });
  };

  handleChange = (event) => {
    this.setState({ perPage: parseInt(event.target.value) }, () => {
      action
        .getData(
          `validators/validators_list?page=${this.state.page}&perpage=${this.state.perPage}`
        )
        .then((res) => {
          if (res && res.message === "Sucess") {
            this.setState({ mainData: res });
          } else {
            this.setState({ mainData: {} });
          }
        });
    });
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
    const { mainData } = this.state;
    const loopData = mainData && mainData.count ? mainData : data;
    // var slicedData = loopData && loopData.validatorList && loopData.validatorList.length > 0 && loopData.validatorList.slice((page-1)*perPage, (page * perPage));
    return (
      <Layout
        websiteTitle="Pending Validators - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
      >
        <Container>
          <section>
            <Row className="justify-content-md">
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
            </Row>
            <Table className="mt-3 mb-3">
              <thead>
                <tr>
                  <th>Public Key </th>
                  <th>Effective Balance</th>
                  <th>Slashed</th>
                </tr>
              </thead>
              <tbody>
                {loopData &&
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
                ) : (
                  <tr>
                    <td>No Validators</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {loopData &&
              loopData.validatorList &&
              loopData.validatorList.length > 0 && (
                <Row>
                  <Col>
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
                  </Col>
                  <Col style={{ marginTop: "5px", marginLeft: "150px" }}>
                    <ReactPaginate
                      containerClassName="pagination"
                      pageClassName="page-item"
                      activeClassName="active"
                      pageCount={data.totalSize / 10}
                      pageRangeDisplayed={5}
                      nextLabel={">>"}
                      previousLabel={"<<"}
                      onPageChange={this.handlePageClick}
                    />
                  </Col>
                </Row>
              )}
          </section>
        </Container>
      </Layout>
    );
  }
}

export default withRouter(PendingValidators);
