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

import Calculate from "./Calculate";

import InnerPageBanner from "../../components/Common/InnerPageBanner/";
import { makeRewardSchema } from '../../components/Common/jsonld'

class Roi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: {
        ethAmount: "32",
      },
      key: "1",
      reward: false,
      dynamicClass: "custom-accordian",
      open: false,
      ethPrice: "",
      graphData: {},
    };
  }

  static async getInitialProps() {
    const ethPrice = await action.getData("get_eth_price").then((res) => res);

    return {
      ethPrice,
    };
  }

  handleSelect = (key) => {
    if (key === "1") {
    } else if (key === "2") {
    } else if (key === "3") {
      // action.getData("volume").then((res) => {
      //   if (res.message === "Sucess") {
      //     this.setState({ graphData: res });
      //   }
      // });
    } else if (key === "4") {
      // action.getData("get_eth_price").then((res) => {
      //   if (res.message === "Sucess") {
      //     this.setState({ ethPrice: res.price });
      //   }
      // });
    }
  };

  handleInputChange = (event) => {
    this.setState({
      inputData: {
        ...this.state.inputData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleCheckBox = (event) => {
    const target = event.target;
    const checked = target.checked;
    this.setState({
      reward: checked,
    });
  };

  handleAccordianClick = () => {
    if (this.state.open) {
      this.setState({
        open: false,
        dynamicClass: "custom-accordian",
      });
    } else {
      this.setState({
        open: true,
        dynamicClass: "custom-accordian open",
      });
    }
  };

  render() {
    const { ethPrice } = this.props;
    const {
      key,
      ethAmount,
      reward,
      inputData,
      dynamicClass,
      open,
      graphData,
    } = this.state;
    return (
      <Layout
        websiteTitle="Reward - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
        // schemaData={makeRewardSchema()}
      >
        <Container>
          <section>
            <InnerPageBanner pageTitle="Reward Calculator" />
            <p className="information-title">
              <span className="info-icon">i</span> This mining calculator will
              display your expected earnings in Dollars. The calculations are
              based on the assumption that all conditions remain as they are
              below.
            </p>
            <Calculate
              ethAmount={ethAmount}
              handleInputChange={this.handleInputChange}
              handleCheckBox={this.handleCheckBox}
              reward={reward}
              inputData={inputData}
              handleAccordianClick={this.handleAccordianClick}
              dynamicClass={dynamicClass}
              open={open}
              ethPrice={ethPrice}
            />
          </section>
        </Container>
      </Layout>
    );
  }
}

export default withRouter(Roi);
