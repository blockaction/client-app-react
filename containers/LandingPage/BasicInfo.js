import React, { Component } from "react";
import { imgURL } from "utils/constants";
import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
import { addComma } from "utils/helperFunctions";

class BasicInfo extends Component {
  render() {
    const { data, validatorsData, queueData } = this.props;
    return (
      <section className="basic-info pb-0">
        {data && (
          <div className="card">
            <Row>
              <Col lg={4} md={6}>
                <div className="card__row d-flex ">
                  <div className="card__column">
                    <p className="card__title">Current Epoch</p>
                    <p className="card__stats">
                      <Link href={`epoch/${data.currentEpoch}`}>
                        <a>{data.currentEpoch}</a>
                      </Link>
                    </p>
                  </div>
                  <div className="card__column text-right">
                    <p className="card__title">Finalized Epoch</p>{" "}
                    <p className="card__stats">
                      <Link href={`epoch/${data.finalizedEpoch}`}>
                        <a>{data.finalizedEpoch}</a>
                      </Link>
                    </p>
                  </div>

                  {/* <div className="card__body">
                    {data.peers_defination || ""}
                  </div> */}
                </div>
                <hr className="hr-line lg-none"></hr>
                <div className="card__row d-flex ">
                  <div className="card__column">
                    <p className="card__title">Current Slot</p>
                    <p className="card__stats">
                      <Link href={`slot/${data.currentSlot}`}>
                        <a>{data.currentSlot}</a>
                      </Link>
                    </p>
                  </div>

                  <div className="card__column text-right">
                    <p className=" card__title">Finalized Slot</p>
                    <p className="card__stats">
                      <Link href={`slot/${data.finalizedSlot}`}>
                        <a>{data.finalizedSlot}</a>
                      </Link>
                    </p>
                  </div>
                </div>
              </Col>
              <hr className="hr-line lg-none"></hr>
              {/* end of col 1 */}

              <Col lg={4} md={6}>
                <div className="card__row d-flex ">
                  <div className="card__column">
                    <p className="card__title">Active Validators</p>
                    <p className="card__stats">
                      {validatorsData && validatorsData.totalSize
                        ? addComma(validatorsData.totalSize)
                        : "N/A"}
                    </p>
                  </div>

                  <div className="card__column text-right">
                    <p className=" card__title">Pending</p>
                    <p className="card__stats">
                      {queueData && queueData.count
                        ? addComma(queueData.count)
                        : "0"}
                    </p>
                  </div>
                  {/* <div className="card__body">
                      {data.slot_defination || ""}
                    </div> */}
                </div>
                <hr className="hr-line "></hr>

                <div className="card__row d-flex ">
                  <div className="card__column">
                    <p className="card__title">Voted Ether</p>
                    <p className="card__stats">{addComma(data.voted_ether)}</p>
                  </div>
                  <div className="card__column text-right">
                    <p className="card__title">Eligible Ether</p>
                    <p className="card__stats">
                      {addComma(data.eligible_ether)}
                    </p>
                  </div>
                </div>
              </Col>
              {/* endof col 2 */}
              <Col lg={4} md={6}>
                <div className="card__row d-flex ">
                  <div className="card__column">
                    <p className="card__title">Peers</p>
                    <p className="card__stats">
                      {addComma(data.peers_count)}
                      {/* <Link href="/peers">
                        <a>{addComma(data.peers_count)}</a>
                      </Link> */}
                    </p>
                  </div>
                  <div className="card__column text-right">
                    <p className="card__title">Price</p>
                    <p className="card__stats">
                      ${addComma(Math.round(data.price * 100) / 100)}
                    </p>
                  </div>
                </div>
                <hr></hr>
              </Col>
            </Row>
          </div>
        )}
        <br />
      </section>
    );
  }
}
export default BasicInfo;
