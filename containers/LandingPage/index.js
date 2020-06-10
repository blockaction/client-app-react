import React, { Component } from "react";
import { Container, Row, Col, Spinner, Tab, Nav } from "react-bootstrap";
import * as action from "utils/api";
import Attestation from "./Attestation";
import ValidatorTable from "./ValidatorTable";
import ValidatorsQueue from "./ValidatorsQueue";
import BasicInfo from "./BasicInfo";
import Scanner from "./Scanner";
import TimerComp from "./TimerComp";
import "c3/c3.css";
import Line from "./Line";
import LineReward from "./LineReward";
// import Link from "next/link";
// import C3Chart from "react-c3js";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: {},
      newAttestations: {},
      newValidators: {},
      show: false,
      query: "",
      timePeriod: "1",
      counter: 0,
      status: "calling",
      showChart: true,
      selectedValue: 1,
      selectedParticipationValue:1,
      updatedLineReward: null,
      updatedParticipationData: null,
      loader: false,
    };
  }

  static async getInitialProps() {
    let data =
      (await action
        .getData("beacon/get_current_chain_state")
        .then((res) => res)) || [];

    // let validatorParticipation = await action
    // .getData('get_validator_participation')
    // .then(res => res);

    let validatorsData =
      (await action
        .getData("validators/validators_list?page=1&perPage=10")
        .then((res) => res)) || [];

    let participationData =
      (await action.getData("get_participation_rate?time=1").then((res) => res)) || [];

    let validatorsQueue =
      (await action.getData("validators_queue").then((res) => res)) || [];

    // let attestations =
    //   (await action
    //     .getData("attestations?page=1&perPage=10")
    //     .then((res) => res)) || [];

    let attestations =
    (await action
      .getData("get_latest_block?page=1&count=10")
      .then((res) => res)) || [];

    let lineReward =
      (await action.getData("volume?time=1").then((res) => res)) || [];

    // const nodeGenesis = await action.getData("node/genesis").then((res) => res);

    // const nodeVersion = await action.getData("node/version").then((res) => res);

    return {
      data,
      validatorsData,
      validatorsQueue,
      attestations,
      // nodeGenesis,
      // nodeVersion,
      //  validatorParticipation,
      participationData,
      lineReward,
    };
  }

  fetchData = async () => {
    await action.getData("beacon/get_current_chain_state").then((res) => {
      this.setState({ mainData: res });
    });

    // await action.getData("validators/validators_list").then((res) => {
    //   console.log('response got')
    //   this.setState({
    //     newValidators: res,
    //     counter: 0,
    //     status: "called",
    //   }, () => {
    //       clearInterval(this.myInterval)
    //         this.myInterval = setInterval(() => {
    //           console.log('timer')
    //           const { counter } = this.state
    //           this.setState({counter: counter + 1})
    //       }, 1000)
    //   });
    // });

    await action.getData("get_latest_block").then((res) => {
      this.setState({ newAttestations: res });
    });
  };

  componentDidMount() {
    // clearInterval(this.myInterval)
    //   this.myInterval = setInterval(() => {
    //     const { counter } = this.state
    //     this.setState({counter: counter + 1})
    // }, 1000)
    this.interval = setInterval(() => {
      this.fetchData();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleGraphDataTimePeriod = (event) => {
    if (event.target.value === "1") {
      this.setState({ timePeriod: 1, selectedValue: 1, loader: true }, () => {
        action.getData("volume?time=1").then((res) => {
          this.setState({ updatedLineReward: res, loader: false });
        });
      });
    } else if (event.target.value === "2") {
      this.setState({ timePeriod: 1, selectedValue: 2, loader: true }, () => {
        action.getData("volume?time=7").then((res) => {
          this.setState({ updatedLineReward: res, loader: false });
        });
      });
    } else if (event.target.value === "3") {
      this.setState({ timePeriod: 1, selectedValue: 3, loader: true }, () => {
        action.getData("volume?time=30").then((res) => {
          this.setState({ updatedLineReward: res, loader: false });
        });
      });
    } else if (event.target.value === "4") {
      this.setState({ timePeriod: 1, selectedValue: 4, loader: true }, () => {
        action.getData("volume?time=365").then((res) => {
          this.setState({ updatedLineReward: res, loader: false });
        });
      });
    }
  };

  handleParticipationGraphTimePeriod = (event) => {
    if (event.target.value === "1") {
      this.setState({ timePeriod: 1, selectedParticipationValue: 1, participationLoader: true }, () => {
        action.getData("get_participation_rate?time=1").then((res) => {
          this.setState({ updatedParticipationData: res, participationLoader: false });
        });
      });
    } else if (event.target.value === "2") {
      this.setState({ timePeriod: 1, selectedParticipationValue: 2, participationLoader: true }, () => {
        action.getData("get_participation_rate?time=7").then((res) => {
          this.setState({ updatedParticipationData: res, participationLoader: false });
        });
      });
    } 
  };

  render() {
    const {
      data,
      validatorsData,
      validatorsQueue,
      attestations,
      // nodeGenesis,
      // nodeVersion,
      participationData,
      lineReward,
    } = this.props;
    const {
      mainData,
      newAttestations,
      newValidators,
      selectedValue,
      selectedParticipationValue,
      updatedLineReward,
      updatedParticipationData,
      loader,
      participationLoader
      // counter,
    } = this.state;

    const handleNewValidators = (res) => {
      this.setState({
        newValidators: res,
      });
    };
    return (
      <div>
        {data ? (
          <div>
            <Scanner />
            <Container>
              {data && !data.error_msg && (
                <BasicInfo
                  data={mainData && mainData.message ? mainData : data}
                  validatorsData={
                    newValidators && newValidators.count > 0
                      ? newValidators
                      : validatorsData
                  }
                  queueData={validatorsQueue}
                />
              )}
              {/* {participationData && participationData.message === "Sucess" && (
                <section className="pt-0 ">
                  <Line participationData={participationData} />
                </section>
              )} */}
              {/* <Row>
            <Col>
            {validatorParticipation && lineChartData && lineChartData.columns && lineChartData.columns.length>0 && 
              <C3Chart
                  className="line-chart"
                  data={lineChartData || []}
                  axis={axis}
              /> 
              }
              </Col>
            <Col>
            {validatorParticipation && piechartData && piechartData.columns && piechartData.columns.length>0 &&
            <C3Chart
                data={piechartData && piechartData || []}
                tooltip={tooltip}
            />
            }
              </Col>
          </Row> */}

              <Row>
                <Col>
                  <Tab.Container id="" defaultActiveKey={1}>
                    <Nav variant="tabs" className="pt-3">
                      <Nav.Item>
                        <Nav.Link eventKey={"1"}>
                          Validator Participation
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey={"4"}>
                          24 hour Volume
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey={"1"}>
                      <div className="hour-chart-tab">
                      <div className="filter">
                            Show data of:{" "}
                            <select
                              className="explorer-select"
                              name="explorer-select"
                              value={selectedParticipationValue || "1"}
                              onChange={this.handleParticipationGraphTimePeriod}
                            >
                              <option value="1">1 day</option>
                              <option value="2">7 days</option>
                            </select>
                          </div>
                        {selectedParticipationValue && participationData &&
                        participationData.message === "Sucess" ? (
                          <section className="pt-0 landing-charts">
                            <Line 
                                participationData={updatedParticipationData ? 
                                                updatedParticipationData : participationData} 
                                time={
                                  selectedParticipationValue === 1
                                    ? "24 hour"
                                    : selectedParticipationValue === 2
                                    ? "week"
                                    : ""
                                }
                            />
                            <div
                               className={participationLoader ? "spinner-new" : ""}
                              ></div>
                          </section>
                        ) : (
                          <div className="loader-graph">
                            <div className="spinner-new"></div>
                          </div>
                        )}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                    <Tab.Content>
                      <Tab.Pane eventKey={"4"}>
                        <div className="hour-chart-tab">
                          <div className="filter">
                            Show data of:{" "}
                            <select
                              className="explorer-select"
                              name="explorer-select"
                              value={selectedValue || "1"}
                              onChange={this.handleGraphDataTimePeriod}
                            >
                              <option value="1">1 day</option>
                              <option value="2">7 days</option>
                              <option value="3">1 Month</option>
                              <option value="4">1 Year</option>
                            </select>
                          </div>
                          {selectedValue &&
                          lineReward &&
                          (updatedLineReward || lineReward) ? (
                            <div>
                              <LineReward
                                graphData={
                                  updatedLineReward
                                    ? updatedLineReward
                                    : lineReward
                                }
                                time={
                                  selectedValue === 1
                                    ? "24 hour"
                                    : selectedValue === 2
                                    ? "week"
                                    : selectedValue === 3
                                    ? "month"
                                    : selectedValue === 4
                                    ? "year"
                                    : ""
                                }
                              />
                              <div
                                className={loader ? "spinner-new" : ""}
                              ></div>
                            </div>
                          ) : (
                            <div className="loader-graph">
                              <div className={"spinner-new"}></div>
                              {/* <Spinner animation="border" role="status">
                              <span className="sr-only">Loading...</span>
                            </Spinner> */}
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Col>
              </Row>
              <TimerComp newValidators={handleNewValidators} />
              {/* <TimerComp timer={counter} /> */}
              {/* {'Last Updated: ' + counter + ' sec ago'} */}
              <Row>
                <Col lg={6}>
                  <ValidatorTable
                    data={
                      newValidators && newValidators.count > 0
                        ? newValidators
                        : validatorsData
                    }
                  />
                </Col>
                <Col lg={6}>
                  <Attestation
                    data={
                      newAttestations && newAttestations.data && newAttestations.data.length > 0 
                        ? newAttestations.data
                        : attestations && attestations.data
                    }
                  />
                </Col>
              </Row>
              {/* <ValidatorsQueue data={validatorsQueue} /> */}
              {/* <Row style={{ fontSize: "11px" }}>
                <Col>
                  {nodeVersion && (
                    <Row>
                      <Col>
                        <b>Node Version:</b>{" "}
                      </Col>
                      <Col style={{ paddingRight: "25%" }}>
                        {nodeVersion.version}{" "}
                      </Col>
                    </Row>
                  )}
                </Col>
                {nodeGenesis && (
                  <Col>
                    <div>
                      <b>Genesis Time</b>: {nodeGenesis.genesisTime}
                    </div>
                    <div>
                      <b>Deposit Contract Address</b>:{" "}
                      {nodeGenesis.depositContractAddress}
                    </div>
                  </Col>
                )}
              </Row> */}
            </Container>
          </div>
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
      </div>
    );
  }
}

export default LandingPage;
