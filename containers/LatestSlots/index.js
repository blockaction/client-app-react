import React, { Component } from "react";
import Layout from "components/layout";
import { Row, Col, Container, Table, Tooltip, Form,
  OverlayTrigger, Spinner } from "react-bootstrap";
import * as action from "utils/api";
import ReactPaginate from 'react-paginate';
import { withRouter } from "next/router";
import { text_truncate } from "utils/helperFunctions";
import InnerPageBanner from "components/Common/InnerPageBanner/";
import Link from "next/link";
import moment from "moment";

class LatestSlots extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      page: 1,
      count: 10,
      query: '',
      loader: false,
    };
    this.timeout = 0;
  }

  static async getInitialProps() {
    // const data = await action
    // .getData('attestations?page=1&perPage=10')
    // .then(res => res);
    const data = await action
    .getData('get_latest_block?page=1&perPage=10')
    .then(res => res);

  return {
     data
  };
  }

  renderTooltip = (props, key) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        <span style={{ fontSize: "10px" }}>{key}</span>
      </Tooltip>
    );
  };


  handlePageClick = data => {
    const page = data.selected + 1
    this.setState({page: page, loader: true}, () => {
      action
        .getData(`get_latest_block?page=${page}&perPage=${this.state.count}`)
        .then(res => {
          if(res && res.message === "Sucess") {
            this.setState({mainData:res, loader: false})
          } else {
            this.setState({mainData:{}, loader: false})
          }
        });
    })
  };

  handleChange = event => {
      this.setState({count: parseInt(event.target.value), loader: true, page: 1}, () => {
        action
          .getData(`get_latest_block?page=${this.state.page}&perPage=${this.state.count}`)
          .then(res => {
            if(res && res.message === "Sucess") {
              this.setState({mainData:res, loader: false})
            } else {
              this.setState({mainData:{}, loader: false})
            }
          });
      })
  }

  handleInputChange = event => {
    const { page, query } = this.state;
    const value = event.target.value;
    this.setState({query: value}, () => {
      if(this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        action
        .getData(`get_latest_block?page=${page}&publickey=${this.state.query}`)
        .then(res => {
          if(res && res.message === "Sucess") {
            this.setState({mainData:res})
          }
        });
      }, 1000);
    });
  };

  render() {
    const { data } = this.props;
    const { mainData, page, count, loader } = this.state;
    const loopData = mainData && mainData.total_size ? mainData : data;
    return (
      <Layout
        websiteTitle="Attestations Details - Eth | Cryptocurrency"
        websiteDescription="Eth"
        websiteKeywords="Eth"
        metaDataFlag={true}
        >
          <Container>
            <section>
            <InnerPageBanner pageTitle="Latest Slots" />
            {/* <Row className="justify-content-md">
              <Col md="4">
                <span>
                <Form.Control
                  className="mb-3"
                  size="md"
                  type="text"
                  placeholder="Search by public key…"
                  value={this.state.query}
                  onChange={this.handleInputChange}
                />
                  </span>
              </Col>
            </Row> */}
           <div className={loader ? 'spinner-new overlay-loader-for-table' : ''}></div>
          <Table className="mt-2 mb-5" striped bordered hover>
          <thead>
              <tr style={{fontSize: '14px'}}>
              <th>Epoch </th>
              <th>Slot</th>
              <th>Proposer</th>
              <th>Time</th>
              <th>Status</th>
              <th>ATT</th>
            </tr>
            </thead>
            <tbody>
            {loopData && loopData.data && loopData.data.length > 0 ?
               loopData.data.map((item, index) => {
                   return (
                      <tr style={{fontSize: '12px'}} key= {index}>
                      <td>
                      <Link
                        href={'/epoch/[key]'}
                        as = {`/epoch/${item && item.epoch}`}
                        >
                        <a style={{ textDecoration: "none" }}>
                          {item ? item.epoch : "---"}
                        </a>
                      </Link>
                    </td>
                    <td>
                      <Link
                          href={'/slot/[key]'}
                          as = {`/slot/${item && item.slot}`}
                        >
                        <a style={{ textDecoration: "none" }}>
                          {item ? item.slot : "---"}
                        </a>
                      </Link>
                    </td>
             
                    <td>
                    <Link
                          href={"/validator/[key]"}
                          as={`/validator/${
                            item && item.proposer
                          }`}
                        >
                          <a style={{ textDecoration: "none" }}>
                            {item ? item.proposer : "---"}
                          </a>
                        </Link>
                    </td>
                    <td>{item.time ? moment(item.time).fromNow() : '---'} </td>
                    <td>
                      <span
                        className={item.status === 'proposed' ? 'text-green badge bg-success' :
                        item.status === 'Skipped' ? 'badge bg-light' : '' 
                       }>
                       {item ? item.status : "---"}</span>
                    </td>
                    <td>
                      {item ? item.attestian_count : "---"}
                    </td>
                      </tr>
                   );
               }) 
              :
                <tr>No Data</tr>
               
            }
            </tbody>
            </Table>
            {loopData && loopData.data && loopData.data.length > 0 &&
               (
                <div className="d-flex justify-content-between mr-1 ml-1">
                  <div className="select-wrap">
                    <Form.Control
                      size="sm"
                      as="select"
                      name="perPage"
                      // value={data.state || ''}
                      onChange={this.handleChange}
                    >
                      {/* <option value="_" disabled="" selected="">
                      Select One
                    </option> */}
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </Form.Control>
                  </div>
                  <ReactPaginate
                    containerClassName="pagination"
                    pageClassName="page-item"
                    activeClassName="active"
                    forcePage={page - 1}
                    pageCount={(loopData && loopData.total_size  / (count ? count : 10))}
                    pageRangeDisplayed={5}
                    nextLabel={">>"}
                    previousLabel={"<<"}
                    onPageChange={this.handlePageClick}
                  />
                </div>
              )
              }
            </section>
    </Container>
      </Layout>
    );
  }
}

export default withRouter(LatestSlots);
