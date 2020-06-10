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
      domain:'Witti',
      anotherDomain:'Prysm'
    };
  }

  componentDidMount(){
    if(window.location.href.includes('witti')) {
      this.setState({domain:'Witti', anotherDomain:'Prysm'})
    } else if(window.location.href.includes('prysm')) {
      this.setState({domain:'Prysm', anotherDomain: 'Witti'})
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
    const { query, searchBy, selectedValue, domain, anotherDomain } = this.state;
    return (
      <section className="banner">
        <Container>
          <Row>
            <Col md={8} className="offset-md-2">
              <div className="banner__content">
                <p className="banner__text">
                  Connected to {domain} {domain && domain === 'Witti' && 'Multiclient'} Testnet{" "}
                </p>
                <div className="center-search">
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
                          as = {`/${searchBy}/${query}`}
                         > 
                          <button className="btn btn-secondary" type="submit">
                            <span>Search</span>
                          </button>
                        </Link>
                      ) : (
                        <button
                          disabled={true}
                          className="btn btn-secondary"
                          type="submit"
                          variant="secondary"
                        >
                          <span>Search</span>
                        </button>
                      )}
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
