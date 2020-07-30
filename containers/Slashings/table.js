import React, { Component } from "react";
import { imgURL } from "utils/constants";
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
import Link from "next/link";
import { addComma } from "utils/helperFunctions";
import ReactPaginate from "react-paginate";
import moment from "moment";


class TableComp extends Component {

renderTooltip = (props, key) => {
    return (
        <Tooltip id="button-tooltip" {...props}>
        <span style={{ fontSize: "10px" }}>{key}</span>
        </Tooltip>
    );
    };

  render() {
    const { loopData, loader, showData, page, perPage, handleChange, handlePageClick, validatorsType } = this.props;
    return (
        <div className="hour-chart-tab">
             <div className={loader ? 'spinner-new overlay-loader-for-table' : ''}></div>
                          <Table responsive className="mt-3 mb-3">
                            <thead>
                              <tr>
                                <th>Slashed Validators</th>
                                <th>Slashed By</th>
                                <th>Age</th>
                                <th>Reason</th>
                                <th>Block</th>
                                <th>Epoch</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                              showData && loopData &&
                              loopData.data &&
                              loopData.data.length > 0 ? (
                                loopData.data.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                           <td style={{width: '200px'}}>
                                               {
                                                   item.slashed_validators &&
                                                    item.slashed_validators.length > 0 ? 
                                                     item.slashed_validators.map((item, index) => {
                                                         return(
                                                           <React.Fragment key={index}> 
                                                            {index !== 0 ? ', ' : ''}<Link
                                                            href={"/validator/[key]"}
                                                            as={`/validator/${
                                                                item
                                                            }`}
                                                            >
                                                            <a style={{ textDecoration: "none" }}>
                                                                {
                                                                item}
                                                            </a>
                                                            </Link>
                                                            </React.Fragment>
                                                         )
                                                     }) :
                                                     "---"
                                               }
                                            </td>
                                            <td>
                                                <Link
                                                href={"/validator/[key]"}
                                                as={`/validator/${
                                                    item.slashed_by && item.slashed_by
                                                }`}
                                                >
                                                <a style={{ textDecoration: "none" }}>
                                                    {
                                                    item.slashed_by ? item.slashed_by : "---"}
                                                </a>
                                                </Link>
                                            </td>
                                            <td>{item.age ? moment(item.age).fromNow() : '---'} </td>
                                            <td>{item.reason ? item.reason : '---'} </td>
                                            <td>
                                                <Link
                                                href={"/slot/[key]"}
                                                as={`/slot/${
                                                    item.block && item.block
                                                }`}
                                                >
                                                <a style={{ textDecoration: "none" }}>
                                                    {
                                                    item.block ? item.block : "---"}
                                                </a>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                href={"/epoch/[key]"}
                                                as={`/epoch/${
                                                    item.epoch && item.epoch
                                                }`}
                                                >
                                                <a style={{ textDecoration: "none" }}>
                                                    {
                                                    item.epoch ? item.epoch : "---"}
                                                </a>
                                                </Link>
                                            </td>
                                    </tr>
                                  );
                                })
                              ) 
                              : !showData ? (
                                <tr>
                                  <td>
                                   <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                  </Spinner>
                                  </td>
                                </tr>
                              ) :
                              <tr>
                                  <td>No Validators</td>
                              </tr>}
                            </tbody>
                          </Table>
                          {showData && loopData &&
                            loopData.data &&
                            loopData.data.length > 0 && (
                              <div className="d-flex justify-content-between mr-1 ml-1">
                                <div className="select-wrap">
                                  <Form.Control
                                    size="sm"
                                    as="select"
                                    name="perPage"
                                    // value={data.state || ''}
                                    onChange={handleChange}
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
                                  pageCount={(loopData && loopData.total_size  / (perPage ? perPage : 10))}
                                  pageRangeDisplayed={5}
                                  nextLabel={">>"}
                                  previousLabel={"<<"}
                                  onPageChange={handlePageClick}
                                />
                              </div>
                            )}
        </div>
    );
  }
}
export default TableComp;
