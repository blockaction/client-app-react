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
import { main } from "@popperjs/core";
import Link from "next/link";
import InnerPageBanner from "components/Common/InnerPageBanner/";
import TableComp from "./table";
import { IconGroup } from "semantic-ui-react";

class AllEpochs extends Component {
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
      epochValue: ''
    };
    this.timeout = 0;
  }

  static async getInitialProps() {
    const data = await action
      .getData("epochs?page=1&perPage=10")
      .then((res) => res);


    return {
      data,
    };
  }

  handlePageClick = (data) => {
    const page = data.selected + 1;
    this.setState({ page: page, loader: true }, () => {
      action
        .getData(
          `epochs?page=${page}&perPage=${this.state.perPage}`
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
            `epochs?page=${this.state.page}&perPage=${this.state.perPage}`
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

  handleSelect = (key) => {
    this.setState({ loader: true, showData: false });
    if (key === "1") {
      action.getData("epochs?page=1&perPage=10").then((res) => {
        this.setState({
          mainData: res,
          loader: false,
          showData: true,
          page: "1",
        });
      });
    } 
  };


  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { data } = this.props;
    const {
      mainData,
      loader,
      showData,
      perPage,
      page,
      validatorsType,
      epochValue
    } = this.state;
    const loopData = mainData && mainData.count ? mainData : data;
    return (
      <Layout
        websiteTitle="All Validators - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
      >
        <Container>
          <section>
            <InnerPageBanner pageTitle="Epochs" />
            <Row>
            <Col md={12}>
              <div className="search-bar">
                <p>Search by Epoch</p>
                <div className="search">
                  <div className="center-search ">
                    <div className="group-input">
                      <Form.Control
                        className="scanner-form validator-epoch scanner-index"
                        size="md"
                        type="text"
                        placeholder="example: 4894"
                        name="epochValue"
                        value={epochValue || ""}
                        onChange={this.handleInputChange}
                      />
                      {epochValue !== "" ? (
                          <Link
                            href={`/epoch/[key]`}
                            as={`/epoch/${epochValue}`}
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
            <Tab.Container
              id=""
              defaultActiveKey={1}
              onSelect={this.handleSelect}
            >
              <Nav variant="tabs" className="pt-3">
                <Nav.Item>
                  <Nav.Link eventKey={"1"}>
                    All Epochs 
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
            </Tab.Container>
          </section>
        </Container>
      </Layout>
    );
  }
}

export default withRouter(AllEpochs);
