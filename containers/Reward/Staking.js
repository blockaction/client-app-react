import React from "react";
import { Row, Col } from "react-bootstrap";

const Staking = props => {
  return (
          <Row className='mt-3'>
                <Col>
                <Row>
                    <Col md={4}>
                    <h2 className='mt-2 mb-2'>Staking Ethereum 2.0</h2>
                    <p>Ethereum 2.0 blockchain consensus is achieved via Casper. 
                        Investors can leverage their crypto via staking. 
                        Currently there is 1 option to earn passive income and staking 
                        rewards with your Ethereum 2.0 investment as outlined below.
                        </p>
                    </Col>
                </Row>
                <div className='box box-body mt-4 staking-color'>
                <Row>
                    <Col>
                    <span>Annual Reward</span>:
                    </Col>
                        <Col>
                    <span>7.99%</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <span>Adj Reward</span>:
                    </Col>
                    <Col>
                        <span>+7.08%</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <span>Required Minimum</span>:
                    </Col>
                    <Col>
                        <span>32 ETH</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <span>Locked-up Period</span>: 
                    </Col>
                    <Col>
                    <span>180 d</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <span>ComplexityRating</span>:
                    </Col>
                    <Col>
                    <span>very hard</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <span>Risk Rating</span>:
                    </Col>
                    <Col>
                        <span>risky</span>
                    </Col>
                    </Row>
            </div>
                </Col>
            </Row>
  );
};

export default Staking;
