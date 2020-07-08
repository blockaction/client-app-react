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
import { text_truncate } from "utils/helperFunctions";
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
                          <Table className="mt-3 mb-3">
                            <thead>
                              <tr>
                                <th>Index</th>
                                <th style={{textAlign:'center'}}>Public Key </th>
                                <th>Current Balance</th>
                                <th>Effective Balance</th>
                                <th>Eligibility</th>
                                <th>Activation</th>
                                <th>Status</th>
                                <th>Slashed</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                              showData && loopData &&
                              loopData.validatorList &&
                              loopData.validatorList.length > 0 ? (
                                loopData.validatorList.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                           <td>
                                                <Link
                                                href={"/validator/[key]"}
                                                as={`/validator/${
                                                    item.validator && item.validator.index && item.validator.index
                                                }`}
                                                >
                                                <a style={{ textDecoration: "none" }}>
                                                    {text_truncate(
                                                    item.validator && item.validator.index ? item.validator.index : "---",
                                                    30
                                                    )}
                                                </a>
                                                </Link>
                                            </td>
                                      <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(props) =>
                                          this.renderTooltip(
                                            props,
                                            item.validator ? item.validator.publicKey : ""
                                          )
                                        }
                                      >
                                        <td style={{ textAlign:'center' }}>
                                          <Link
                                            href={`validator/${
                                              item.validator && item.validator.publicKey
                                            }`}
                                          >
                                            <a style={{ textDecoration: "none" }}>
                                              {text_truncate(
                                                item.validator
                                                  ? item.validator.publicKey
                                                  : "---",
                                                30
                                              )}
                                            </a>
                                          </Link>
                                        </td>
                                      </OverlayTrigger>
                                      <td>{item.validator && item.validator.balance ? Math.round(item.validator.balance*1000)/1000 + ' ETH' : '---'} </td>
                                      <td>{item.validator && item.validator.effectiveBalance && item.validator.effectiveBalance} ETH</td>
                                      <td>{item.validator && item.validator.activationEligibilityEpoch && item.validator.activationEligibilityEpoch} </td>
                                      <td> {validatorsType !== 'all' && item.validator && item.validator.epoch_time && moment(item.validator.epoch_time).fromNow() + ' |'}  {item.validator && item.validator.activationEpoch && item.validator.activationEpoch} </td>
                                      <td>
                                        <span
                                            className={
                                            item.validator && item.validator.status === "Active"
                                                ? "text-green badge bg-success"
                                                : item.validator.status !== "Active"
                                                ? "badge bg-warning"
                                                : ""
                                            }
                                        >
                                            {item.validator && item.validator.status ? item.validator.status : "---"}
                                        </span>
                                        </td>
                                      <td>
                                        {item.validator && item.validator.slashed
                                          ? "True"
                                          : "False"}
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
                            loopData.validatorList &&
                            loopData.validatorList.length > 0 && (
                              <Row className="d-flex justify-content-between mr-1 ml-1">
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
                                  pageCount={(loopData && loopData.totalSize  / (perPage ? perPage : 10))}
                                  pageRangeDisplayed={5}
                                  nextLabel={">>"}
                                  previousLabel={"<<"}
                                  onPageChange={handlePageClick}
                                />
                              </Row>
                            )}
        </div>
    );
  }
}
export default TableComp;
