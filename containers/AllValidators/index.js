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
  Tab,
  Nav,
  Spinner,
} from "react-bootstrap";
import * as action from "utils/api";
import { withRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { main } from "@popperjs/core";
import Link from "next/link";
import { text_truncate } from "utils/helperFunctions";
import InnerPageBanner from "components/Common/InnerPageBanner/";
import TableComp from "./table";
import { IconGroup } from "semantic-ui-react";

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
      showData: true,
      validatorsType: "all",
      indexValue: ''
    };
    this.timeout = 0;
  }

  static async getInitialProps() {
    const data = await action
      .getData("validators/all?page=1&perPage=10")
      .then((res) => res);

    const activeValidators = await action
      .getData("validators/validators_list?page=1&perPage=10")
      .then((res) => res);

    const exitValidators = await action
      .getData("validators/exited?page=1&perPage=10")
      .then((res) => res);

    return {
      data,
      activeValidators,
      exitValidators,
    };
  }

  componentDidMount() {}

  handlePageClick = (data) => {
    const { validatorsType } = this.state;
    const page = data.selected + 1;
    this.setState({ page: page, loader: true }, () => {
      action
        .getData(
          `validators/${
            validatorsType === "all"
              ? "all"
              : validatorsType === "active"
              ? "validators_list"
              : "exited"
          }?page=${page}&perPage=${this.state.perPage}`
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
    const { validatorsType } = this.state;
    this.setState(
      { perPage: parseInt(event.target.value), loader: true, page: 1 },
      () => {
        action
          .getData(
            `validators/${
              validatorsType === "all"
                ? "all"
                : validatorsType === "active"
                ? "validators_list"
                : "exited"
            }?page=${this.state.page}&perPage=${this.state.perPage}`
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

  // handleInputChange = (event) => {
  //   const { page, query } = this.state;
  //   const value = event.target.value;
  //   this.setState({ [event.target.name]: value }, () => {
  //     if (this.timeout) clearTimeout(this.timeout);
  //     this.timeout = setTimeout(() => {
  //       action
  //         .getData(
  //           `validators/all?page=${page}&publickey=${this.state.query}`
  //         )
  //         .then((res) => {
  //           if (res && res.message === "Sucess") {
  //             this.setState({ mainData: res });
  //           }
  //         });
  //     }, 1000);
  //   });
  // };

  handleSelect = (key) => {
    this.setState({ loader: true, showData: false });
    if (key === "1") {
      action.getData("validators/all?page=1&perPage=10").then((res) => {
        this.setState({
          mainData: res,
          loader: false,
          showData: true,
          validatorsType: "all",
          page: "1",
        });
      });
    } else if (key === "2") {
      action
        .getData("validators/validators_list?page=1&perPage=10")
        .then((res) => {
          this.setState({
            mainData: res,
            loader: false,
            showData: true,
            validatorsType: "active",
            page: "1",
          });
        });
    } else if (key === "3") {
      action.getData("validators/exited?page=1&perPage=10").then((res) => {
        this.setState({
          mainData: res,
          loader: false,
          showData: true,
          validatorsType: "exit",
          page: "1",
        });
      });
    }
  };


  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { data, activeValidators, exitValidators } = this.props;
    const {
      mainData,
      loader,
      showData,
      perPage,
      page,
      validatorsType,
      indexValue
    } = this.state;
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
            <InnerPageBanner pageTitle="Validators" />


            <Row>
            <Col md={12}>
              <div className="search-bar">
                <p>Search by Index</p>
                <div className="search">
                  <div className="center-search ">
                    <div className="group-input">
                      <Form.Control
                        className="scanner-form validator-epoch scanner-index"
                        size="md"
                        type="text"
                        placeholder="example: 2183"
                        name="indexValue"
                        value={indexValue || ""}
                        onChange={this.handleInputChange}
                      />
                      {indexValue !== "" ? (
                          <Link
                            href={`/validator/[key]`}
                            as={`/validator/${indexValue}`}
                            title="Search Now"
                          >
                            <button className="btn btn-secondary search-index" type="submit">
                              <span>
                                <i className="icon-search1"></i>
                              </span>
                            </button>
                          </Link>
                        ) : (
                          <button
                            disabled={true}
                            className="btn btn-secondary search-index"
                            type="submit"
                            variant="secondary"
                            title="Search Now"
                          >
                            <span>
                              <i className="icon-search1"></i>
                            </span>
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>


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
            <Tab.Container
              id=""
              defaultActiveKey={1}
              onSelect={this.handleSelect}
            >
              <Nav variant="tabs" className="pt-3">
                <Nav.Item>
                  <Nav.Link eventKey={"1"}>
                    All Validators {data && data.totalSize ? "(" + data.totalSize + ")" : ""}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={"2"}>
                    Active Validators{" "}
                    {activeValidators && + activeValidators.totalSize ? "(" + activeValidators.totalSize + ")" : ""}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={"3"}>
                    Exit Validators{" "}
                    {exitValidators &&  exitValidators.totalSize ? "(" + exitValidators.totalSize + ")" : ""}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey={"1"}>
                  <TableComp
                    loopData={loopData}
                    loader={loader}
                    showData={showData}
                    page={page}
                    perPage={perPage}
                    handlePageClick={this.handlePageClick}
                    handleChange={this.handleChange}
                  />
                </Tab.Pane>
              </Tab.Content>
              <Tab.Content>
                <Tab.Pane eventKey={"2"}>
                  <TableComp
                    loopData={mainData}
                    showData={showData}
                    loader={loader}
                    page={page}
                    perPage={perPage}
                    handlePageClick={this.handlePageClick}
                    handleChange={this.handleChange}
                  />
                </Tab.Pane>
              </Tab.Content>
              <Tab.Content>
                <Tab.Pane eventKey={"3"}>
                  <TableComp
                    loopData={mainData}
                    showData={showData}
                    loader={loader}
                    page={page}
                    perPage={perPage}
                    handlePageClick={this.handlePageClick}
                    handleChange={this.handleChange}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </section>
        </Container>
      </Layout>
    );
  }
}

export default withRouter(AllValidators);
