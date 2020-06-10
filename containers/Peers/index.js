import React, { Component } from "react";
import Layout from "components/layout";
import { Row, Col, Container, Table } from "react-bootstrap";
import * as action from "utils/api";
import { withRouter } from "next/router";

class Peers extends Component {
  static async getInitialProps() {
    const data = await action
    .getData('beacon/get_current_chain_state')
    .then(res => res);

  return {
     data
  };
  }

  render() {
    const { data } = this.props;

    return (
      <Layout
        websiteTitle="Peers - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
      >
          <Container>
          <Table className="mt-5 mb-5" striped bordered hover>
            <thead>
                <tr>
                <th>Address</th>
                <th>Direction</th>
                </tr>
            </thead>
            <tbody>
            {data && data.peers && data.peers.length > 0 &&
               data.peers.map((item, index) => {
                   if(index < 10 ) {
                   return (
                        <tr style={{fontSize: '12px'}} key = {index}>
                            <td>{item.address}</td>
                            <td>{item.direction}</td>
                          </tr>
                   );
                   }
               })
               
            }
            </tbody>
            </Table>
           
    </Container>
      </Layout>
    );
  }
}

export default withRouter(Peers);
