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
                                <th>Epoch</th>
                                <th>Time</th>
                                <th>Attestations</th>
                                <th>Deposits</th>
                                <th>Slashing P / A</th>
                                <th>Finalized</th>
                                <th>Eligible</th>
                                <th>Voted</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                              showData && loopData &&
                              loopData.epochs &&
                              loopData.epochs.length > 0 ? (
                                loopData.epochs.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                           <td>
                                                <Link
                                                href={"/epochs/[key]"}
                                                as={`/epochs/${
                                                    item.epoch && item.epoch
                                                }`}
                                                >
                                                <a style={{ textDecoration: "none" }}>
                                                    {
                                                    item.epoch ? item.epoch : "---"}
                                                </a>
                                                </Link>
                                            </td>
                                            <td>{item.time ? moment(item.time).fromNow() : '---'} </td>
                                            <td>{item.attestations ? item.attestations : '---'} </td>
                                            <td>{item.deposits ? item.deposits : '---'} </td>
                                            <td>{item["slashings_P/A"] &&  item["slashings_P/A"] ?
                                                  item["slashings_P/A"].attester_slashing + '/' +
                                                  item["slashings_P/A"].proposer_slashing
                                                    : '---'} </td>
                                            <td>{item.finalized ? 'True' : 'False'} </td>
                                            <td>{item.eligible ? item.eligible : '---'} </td>
                                            <td>{item.voted ? item.voted : '---'} </td>
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
                            loopData.epochs &&
                            loopData.epochs.length > 0 && (
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
