import React from "react";
import { Row, Col } from "react-bootstrap";
import { Doughnut, Bar } from 'react-chartjs-2';
import Chart from './Chart'
import Line from './Line'


const Overview = props => {
  const { graphData } = props;
  return (
      <div className='box box-body mt-5 mb-3'>
       <Row>
        <Col md={12}>
          <Line graphData={graphData}/>
        </Col>
        {/* <Col md={6}>
          <Chart/>
        </Col> */}
       </Row> 
    </div>
  );
};

export default Overview;
