import React from "react";
import { Table } from "react-bootstrap";

const Providers = props => {
    const slicedData = null;
  return (
      <div className='box box-body mt-5 mb-3'>
    <Table striped borderless hover size='md'>
    <thead>
      <tr style={{fontSize: '14px'}}>
        <th>Name</th>
        <th>Reward</th>
        <th>Learn More</th>
      </tr>
    </thead>
    <tbody>
    {slicedData && slicedData.length > 0 ?
       slicedData.map((item, index) => {
           return (
                <tr className='' style={{fontSize: '12px', textAlign:'center'}} key= {index}>
                        <td style={{width:'33%'}}>
                          {'---'}
                        </td>
                        <td>{4} %</td>
                        <td>{'---'}</td>
                    </tr>
           );
       }) :
       <tr>
            <td>No Data</td> 
       </tr>
    }
    </tbody>
    </Table>
    </div>
  );
};

export default Providers;
