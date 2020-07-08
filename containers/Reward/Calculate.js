import React from "react";
import { Row, Col, Form, Accordion, Card, Button } from "react-bootstrap";
import CustomAccordian from "./CustomAccordian";
import { addComma } from "utils/helperFunctions";

const ethReturnPerTimePeriod = (rate, amt) => {
  return Math.round((amt ? amt * (rate / 100) : 0) * 1000) / 1000;
};

const returnRate = (ratePerAnnum, days) => {
  const returnRate = (Math.pow(1 + ratePerAnnum, 1 / days) - 1) * 100;
  return Math.round(returnRate * 1000) / 1000;
};

const Calculate = (props) => {
  const {
    handleInputChange,
    handleCheckBox,
    reward,
    inputData,
    handleAccordianClick,
    open,
    dynamicClass,
    ethPrice,
  } = props;
  return (
    <div className="box box-body mb-5">
      <Row>
        <Col md={8}>
          <h3 className="calculator-title">Calculate Your Earnings.</h3>
          <Row className="mb-4">
            <Col>
              <Row>
                <Col>
                  <label>Enter your ETH amount</label>
                </Col>
                <Col>
                  <p className="result text-right">
                    Current Exchange Rate:{" "}
                    <span className="value">
                      {" "}
                      ${ethPrice && ethPrice.price ? ethPrice.price : "N/A"}
                    </span>
                  </p>
                </Col>
              </Row>
              <Form.Control
                id="ethId"
                className="mb-2 stake-select"
                size="md"
                min="32"
                type="number"
                placeholder="Enter your ETH Amount…"
                name="ethAmount"
                value={(inputData && inputData.ethAmount) || ""}
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted">
                Required minimum: 32 ETH
              </Form.Text>
            </Col>
          </Row>
          {/* <CustomAccordian 
                title={'Advanced Options'}
                open={open}
                dynamicClass={dynamicClass}
                handleAccordianClick={handleAccordianClick}
               >
                    <div>
                        <Row>
                    <Col>
                    <hr className='my-4>'></hr>
                            <p>Staking Time</p>
                            <div className="row">
                            <label className="col-sm-4 mt-1 small-label">Days: </label>
                                <div className="col-sm-8">
                                <input  
                                    className="form-control"
                                    label="Days"
                                    size="md"
                                    min="0"
                                    type="number"
                                    placeholder="Days…"
                                    name='days'
                                    value={inputData.days || ''}
                                    onChange={handleInputChange}
                                    />
                                    </div>
                                    </div>
                            
                    </Col>
                    <Col>
                    <hr className='my-4>'></hr>
                        <p>Fees</p>
                        <div className="row">
                        <label className="col-sm-4 mt-1 small-label">Hosting Cost/mo: </label>
                        <div className="col-sm-8">
                            <input  
                            className="form-control"
                            label="Days"
                            size="md"
                            min="0"
                            type="number"
                            placeholder="Cost/mo"
                            name="fees"
                            value={inputData.fees || ''}
                            onChange={handleInputChange}
                            />
                            </div>
                            </div>
                          </Col>
                       </Row>
                            <Row className='mb-5'>
                            <Col>
                            <hr className='my-4>'></hr>
                                    <p>Sell/Reinvest</p>
                                        <div className=" row custom-control custom-switch ml-3">
                                        <input  
                                            className="custom-control-input"
                                            type="checkbox"
                                            id="customSwitch1"
                                            name='reward'
                                            checked={reward}
                                            onChange={handleCheckBox}
                                            />
                                        <label 
                                        className="col-sm-4 mt-1 small-label custom-control-label" 
                                        htmlFor="customSwitch1">Compound Rewards </label>
                                        </div>
                                    
                            </Col>
                            <Col>
                            <hr className='my-4>'></hr>
                                <p>Eth Price</p>
                                <div className="row">
                                <label className="col-sm-4 mt-1 small-label">USD: </label>
                                <div className="col-sm-8">
                                    <input  
                                    className="form-control"
                                    label="Days"
                                    size="md"
                                    min="0"
                                    type="number"
                                    placeholder="$"
                                    name="usdPrice"
                                    value={inputData.usdPrice || ''}
                                    onChange={handleInputChange}
                                    />
                                    </div>
                                    </div>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col>
                            <div className='mb-4'>
                            <p>What % of Eligible Token Supply is being staked?: <b> {inputData.totalStaked || 0} %</b></p>
                                <input 
                                className="input-slider" 
                                type="range"
                                name="totalStaked" 
                                min="0" 
                                max="10000" 
                                step="1" 
                                name='totalStaked'
                                value={inputData.totalStaked || 0}
                                onChange={handleInputChange}
                                />
                            </div>
                                <div className='mt-4'>
                                <p>How much Transaction Fees are being generated per day?:<b> {inputData.perDayFee || 0} ETH</b></p>
                                <input 
                                className="input-slider" 
                                type="range" 
                                name="fees" 
                                min="0" 
                                max="10000" 
                                step="1" 
                                name='perDayFee'
                                value={inputData.perDayFee || 0}
                                onChange={handleInputChange}
                                />
                                </div>
                            </Col>
                        </Row>
                    </div>
               </CustomAccordian> */}
          <Row className="mt-4">
            <Col>
              <b>Returns</b>
              <hr className="my-4>"></hr>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <b>1 Day @ {returnRate(0.12, 365)}%</b>
                      <p>
                        {addComma(
                          ethReturnPerTimePeriod(
                            returnRate(0.12, 365),
                            inputData && inputData.ethAmount
                          )
                        )}{" "}
                        ETH
                      </p>
                    </Col>
                    <Col>
                      <span>
                        {ethPrice && ethPrice.price
                          ? "$" +
                            addComma(
                              Math.round(
                                ethPrice.price *
                                  ethReturnPerTimePeriod(
                                    returnRate(0.12, 365),
                                    inputData && inputData.ethAmount
                                  ) *
                                  100
                              ) / 100
                            )
                          : "N/A"}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <b>1 Month @ {returnRate(0.12, 12)}%</b>
                      <p>
                        {addComma(
                          ethReturnPerTimePeriod(
                            returnRate(0.12, 12),
                            inputData && inputData.ethAmount
                          )
                        )}{" "}
                        ETH
                      </p>
                    </Col>
                    <Col>
                      <span>
                        {ethPrice && ethPrice.price
                          ? "$" +
                            addComma(
                              Math.round(
                                ethPrice.price *
                                  ethReturnPerTimePeriod(
                                    returnRate(0.12, 12),
                                    inputData && inputData.ethAmount
                                  ) *
                                  100
                              ) / 100
                            )
                          : "N/A"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <b>1 Week @ {returnRate(0.12, 52)}%</b>
                      <p>
                        {addComma(
                          ethReturnPerTimePeriod(
                            returnRate(0.12, 52),
                            inputData && inputData.ethAmount
                          )
                        )}{" "}
                        ETH
                      </p>
                    </Col>
                    <Col>
                      <span>
                        {ethPrice && ethPrice.price
                          ? "$" +
                            addComma(
                              Math.round(
                                ethPrice.price *
                                  ethReturnPerTimePeriod(
                                    returnRate(0.12, 52),
                                    inputData && inputData.ethAmount
                                  ) *
                                  100
                              ) / 100
                            )
                          : "N/A"}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <b>1 Year @ {returnRate(0.12, 1)}%</b>
                      <p>
                        {addComma(
                          ethReturnPerTimePeriod(
                            12,
                            inputData && inputData.ethAmount
                          )
                        )}{" "}
                        ETH
                      </p>
                    </Col>
                    <Col>
                      <span>
                        {ethPrice && ethPrice.price
                          ? "$" +
                            addComma(
                              Math.round(
                                ethPrice.price *
                                  ethReturnPerTimePeriod(
                                    returnRate(0.12, 1),
                                    inputData && inputData.ethAmount
                                  ) *
                                  100
                              ) / 100
                            )
                          : "N/A"}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <div className="result__sidebar">
            <div className="mb-4">
              <p>Current Holdings Value</p>
              {ethPrice ? (
                <p className="value">
                  ${" "}
                  {inputData.ethAmount
                    ? addComma(
                        Math.round(inputData.ethAmount * ethPrice.price * 100) /
                          100
                      )
                    : 0}
                </p>
              ) : (
                <b>N/A</b>
              )}
            </div>
            <div className="mb-4">
              <p>Total Rewards Value / year</p>
              <p className="value">
                {ethPrice && ethPrice.price
                  ? "$" +
                    addComma(
                      Math.round(
                        ethPrice.price *
                          ethReturnPerTimePeriod(
                            returnRate(0.12, 1),
                            inputData && inputData.ethAmount
                          ) *
                          100
                      ) / 100
                    )
                  : "N/A"}
              </p>
            </div>
            <div className="mb-4">
              <p>Total Reward Rate / year</p>
              <p className="value">{returnRate(0.12, 1)}%</p>
            </div>
            {/* <div className='mb-4'>
                         <span><b>Reward Frequency:</b> 48d 6h</span>
                         <p>You might expect a reward of 0.3197 Eth every 48 days and 6 hours.</p>
                     </div>
                     <div className='mb-4'>
                         <span><b>Network Share:</b> 0.000029%</span>
                         <p>Your share of the total network supply iis 0.000029%.</p>
                     </div>
                     <div className='mb-4'>
                         <span><b>Adj. Reward:</b> 7.08%</span>
                         <p>In 365 days, your network share will change at the rate of 7.08% and will be 0%.</p>
                     </div> */}
            <hr className="my-4>"></hr>
            <div style={{ fontSize: "10px" }}>
              <p>
                The effective earnings depend on many dynamic variables. Even
                the presented results are based on proprietary prediction
                formulas, we do not guarantee any kind of accuracy.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Calculate;
