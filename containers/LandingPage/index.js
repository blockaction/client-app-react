import React, { Component } from "react";
import { Container, Row, Col, Spinner, Tab, Nav } from "react-bootstrap";
import * as action from "utils/api";
import * as actionAdmin from "utils/apiAdmin";
import Attestation from "./Attestation";
import ValidatorTable from "./ValidatorTable";
import ValidatorsQueue from "./ValidatorsQueue";
import BasicInfo from "./BasicInfo";
import Scanner from "./Scanner";
import TimerComp from "./TimerComp";
import "c3/c3.css";
import Line from "./Line";
import ValidatorChart from "./ValidatorChart";
import LineReward from "./LineReward";
import Donught from "./Donught";
import { imgURL } from "utils/constants";
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
      selectedParticipationValue: 1,
      selectedValidatorParticipationValue: 1,
      updatedLineReward: null,
      updatedParticipationData: null,
      updatedValidatorParticipationData: null,
      loader: false,
    };
  }

  static async getInitialProps() {
    let mediaPresence =
      (await actionAdmin
        .getData("media-coverage/list")
        .then((res) => res && res.data && res.data.dataList)) || [];

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
      (await action
        .getData("get_participation_rate?time=1")
        .then((res) => res)) || [];

    let validatorParticipationData =
    (await action
      .getData("get_validators_graph?time=1")
      .then((res) => res)) || [];

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
      mediaPresence,
      validatorParticipationData
    };
  }

  fetchData = async () => {
    await action.getData("beacon/get_current_chain_state").then((res) => {
         this.setState({ mainData: res });
    }, () => {
      clearInterval(this.myInterval);
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
    this.myInterval = setInterval(() => {
      this.fetchData();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
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
      this.setState(
        {
          timePeriod: 1,
          selectedParticipationValue: 1,
          participationLoader: true,
        },
        () => {
          action.getData("get_participation_rate?time=1").then((res) => {
            this.setState({
              updatedParticipationData: res,
              participationLoader: false,
            });
          });
        }
      );
    } else if (event.target.value === "2") {
      this.setState(
        {
          timePeriod: 1,
          selectedParticipationValue: 2,
          participationLoader: true,
        },
        () => {
          action.getData("get_participation_rate?time=7").then((res) => {
            this.setState({
              updatedParticipationData: res,
              participationLoader: false,
            });
          });
        }
      );
    } else if (event.target.value === "3") {
      this.setState(
        {
          timePeriod: 1,
          selectedParticipationValue: 3,
          participationLoader: true,
        },
        () => {
          action.getData("get_participation_rate?time=30").then((res) => {
            this.setState({
              updatedParticipationData: res,
              participationLoader: false,
            });
          });
        }
      );
    } else if (event.target.value === "4") {
      this.setState(
        {
          timePeriod: 1,
          selectedParticipationValue: 4,
          participationLoader: true,
        },
        () => {
          action.getData("get_participation_rate?time=365").then((res) => {
            this.setState({
              updatedParticipationData: res,
              participationLoader: false,
            });
          });
        }
      );
    }
  };

  handleValidatorParticipationTimePeriod = (event) => {
    if (event.target.value === "1") {
      this.setState(
        {
          timePeriod: 1,
          selectedValidatorParticipationValue: 1,
          validatorParticipationLoader: true,
        },
        () => {
          action.getData("get_validators_graph?time=1").then((res) => {
            this.setState({
              updatedValidatorParticipationData: res,
              validatorParticipationLoader: false,
            });
          });
        }
      );
    } else if (event.target.value === "2") {
      this.setState(
        {
          timePeriod: 1,
          selectedValidatorParticipationValue: 2,
          validatorParticipationLoader: true,
        },
        () => {
          action.getData("get_validators_graph?time=7").then((res) => {
            this.setState({
              updatedValidatorParticipationData: res,
              validatorParticipationLoader: false,
            });
          });
        }
      );
    } else if (event.target.value === "3") {
      this.setState(
        {
          timePeriod: 1,
          selectedValidatorParticipationValue: 3,
          validatorParticipationLoader: true,
        },
        () => {
          action.getData("get_validators_graph?time=30").then((res) => {
            this.setState({
              updatedValidatorParticipationData: res,
              validatorParticipationLoader: false,
            });
          });
        }
      );
    } else if (event.target.value === "4") {
      this.setState(
        {
          timePeriod: 1,
          selectedValidatorParticipationValue: 4,
          validatorParticipationLoader: true,
        },
        () => {
          action.getData("get_validators_graph?time=365").then((res) => {
            this.setState({
              updatedValidatorParticipationData: res,
              validatorParticipationLoader: false,
            });
          });
        }
      );
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
      validatorParticipationData,
      mediaPresence,
      lineReward,
    } = this.props;
    const {
      mainData,
      newAttestations,
      newValidators,
      selectedValue,
      selectedParticipationValue,
      selectedValidatorParticipationValue,
      updatedLineReward,
      updatedParticipationData,
      updatedValidatorParticipationData,
      loader,
      participationLoader,
      validatorParticipationLoader
      // counter,
    } = this.state;

    const handleNewValidators = (res) => {
      this.setState({
        newValidators: res,
      });
    };
    return (
      <div className="main-wrapper">
        <div className="background-circles">
          <img src="../../static/background-circles.svg" />
        </div>
        <div className="background-circles small">
          <img src="../../static/background-circles.svg" />
        </div>
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
                <Col lg={12}>
                  <Tab.Container id="" defaultActiveKey={1}>
                    <Nav variant="tabs" className="pt-3">
                    <Nav.Item>
                        <Nav.Link eventKey={"1"}>
                          Validator Participation
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey={"2"}>
                          Network Participation
                        </Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Nav.Link eventKey={"4"}>24 hour Volume</Nav.Link>
                      </Nav.Item> */}
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey={"1"}>
                        <div className="hour-chart-tab">
                          <div className="filter">
                            Show data of:{" "}
                            <select
                              className="explorer-select"
                              name="explorer-select"
                              value={selectedValidatorParticipationValue || "1"}
                              onChange={this.handleValidatorParticipationTimePeriod}
                            >
                              <option value="1">1 day</option>
                              <option value="2">7 days</option>
                              <option value="3">1 month</option>
                              <option value="4">1 year</option>
                            </select>
                          </div>
                          {selectedValidatorParticipationValue &&
                          validatorParticipationData &&
                          validatorParticipationData.message === "Sucess" ? (
                            <section className="pt-0 pb-0 landing-charts">
                              <ValidatorChart
                                participationData={
                                  updatedValidatorParticipationData
                                    ? updatedValidatorParticipationData
                                    : validatorParticipationData
                                }
                                time={
                                  selectedValidatorParticipationValue === 1
                                    ? "24 hour"
                                    : selectedValidatorParticipationValue === 2
                                    ? "week"
                                    : selectedValidatorParticipationValue === 3
                                    ? "month"
                                    : selectedValidatorParticipationValue === 4
                                    ? "year"
                                    : ""
                                }
                              />
                              <div
                                className={
                                  validatorParticipationLoader ? "spinner-new" : ""
                                }
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
                      <Tab.Pane eventKey={"2"}>
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
                              <option value="3">1 month</option>
                              <option value="4">1 year</option>
                            </select>
                          </div>
                          {selectedParticipationValue &&
                          participationData &&
                          participationData.message === "Sucess" ? (
                            <section className="pt-0 pb-0 landing-charts">
                              <Line
                                participationData={
                                  updatedParticipationData
                                    ? updatedParticipationData
                                    : participationData
                                }
                                time={
                                  selectedParticipationValue === 1
                                    ? "24 hour"
                                    : selectedParticipationValue === 2
                                    ? "week"
                                    : ""
                                }
                              />
                              <div
                                className={
                                  participationLoader ? "spinner-new" : ""
                                }
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
                    {/* <Tab.Content>
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
                            </div>
                          )}
                        </div>
                      </Tab.Pane>
                    </Tab.Content> */}
                  </Tab.Container>
                </Col>
                {/* <Col md={4}>
                  
                    <Donught />
                
                </Col> */}
              </Row>
              <TimerComp newValidators={handleNewValidators} />
              {/* <TimerComp timer={counter} /> */}
              {/* {'Last Updated: ' + counter + ' sec ago'} */}
              <Row className="mb-3">
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
                      newAttestations &&
                      newAttestations.data &&
                      newAttestations.data.length > 0
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
         {mediaPresence && mediaPresence.length > 0 &&
            <div className="media__section">
              <Container>
                <Row className="mb-3">
                  <Col md={12}>
                    <p className="title">Media Preferences </p>
                    <p>
                    </p>
                  </Col>
                </Row>
                <Row>
                  {mediaPresence.map((item, index) => {
                    return(
                      <div className="media" key={index}>
                      <a href={item.link} target="_blank">
                        <img
                          className="media__logo"
                          // src="../../static/media-img/medium.png"
                          src={`${imgURL}${item.image && item.image.document_name}`}
                          alt="medium logo"
                          title="view post on medium"
                        ></img>
                      </a>
                    </div>
                    );
                  })}
                </Row>
              </Container>
            </div>
         }
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
