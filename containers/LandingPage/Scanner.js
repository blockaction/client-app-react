import React, { Component } from "react";
import { imgURL } from "utils/constants";
import { Row, Col, Form, Container } from "react-bootstrap";
import Link from "next/link";

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchBy: "validator",
      selectedValue: "1",
      domain: "Medalla",
      anotherDomain: "Altona",
    };
  }

  componentDidMount() {
    if (window.location.href.includes("medalla")) {
      this.setState({ domain: "Medalla", anotherDomain: "Altona" });
    } else if (window.location.href.includes("altona")) {
      this.setState({ domain: "Altona", anotherDomain: "Medalla" });
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSearchBy = (event) => {
    if (event.target.value === "1") {
      this.setState({ searchBy: "validator", selectedValue: 1 });
    } else if (event.target.value === "2") {
      this.setState({ searchBy: "slot", selectedValue: 2 });
    } else if (event.target.value === "3") {
      this.setState({ searchBy: "epoch", selectedValue: 3 });
    }
  };

  render() {
    const {
      query,
      searchBy,
      selectedValue,
      domain,
      anotherDomain,
    } = this.state;
    return (
      <section className="banner">
        <div className="banner__illustration">
          <img src="../../static/banner/illustration.svg"></img>
        </div>
        <Container>
          <Row>
            <Col lg={8} md={8} className="offset-lg-2">
              <div className="banner__content">
                <div className="banner__text">
                  <h1 className="banner__title">Blockchain Explorer</h1>
                  <p>
                    {" "}
                    Connected to {domain}{" "}
                    {domain && domain === "Medalla" && "Multiclient"} Testnet{" "}
                  </p>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="search-bar">
                <p>Search using Plublic Key / Slot / Epoch</p>
                <div className="search">
                  <div className="center-search ">
                    <div className="group-input">
                      <select
                        className="explorer-select"
                        name="explorer-select"
                        value={selectedValue || "1"}
                        onChange={this.handleSearchBy}
                      >
                        <option value="1">Public Key</option>
                        <option value="2">Slot</option>
                        <option value="3">Epoch</option>
                      </select>
                      <Form.Control
                        className="scanner-form"
                        size="md"
                        type="text"
                        placeholder="Public Key / Slot / Epoch"
                        name="query"
                        value={query || ""}
                        onChange={this.handleInputChange}
                      />
                      <div className="input-group-append">
                        {query !== "" ? (
                          <Link
                            href={`/${searchBy}/[key]`}
                            as={`/${searchBy}/${query}`}
                            title="Search Now"
                          >
                            <button className="btn btn-secondary" type="submit">
                              <span>
                                <i className="icon-search1"></i>
                              </span>
                            </button>
                          </Link>
                        ) : (
                          <button
                            disabled={true}
                            className="btn btn-secondary"
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
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
export default Scanner;
