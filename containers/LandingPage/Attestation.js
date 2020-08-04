import React, { Component } from "react";
import { imgURL } from "utils/constants";
import { Row, Col, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import Link from "next/link";
import { text_truncate } from "utils/helperFunctions";
import moment from "moment";

class Attestation extends Component {
  renderTooltip = (props, key) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        <span style={{ fontSize: "10px" }}>{key}</span>
      </Tooltip>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <section className="table_wrapper">
        <div className="d-flex justify-content-between align-items-center table__header">
          <span className="table__title">
            <span className="icon__wrapper">
              {" "}
              <i className="icon-hourglass"> </i>
            </span>
            Latest Slots
          </span>
          <span>
            <Link href="latest-slots">
              <a
                className="btn btn-secondary btn-xs
              "
              >
                {" "}
                View All{" "}
              </a>
            </Link>
          </span>
        </div>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Epoch </th>
              <th>
                <i className="icon-hourglass-end"></i>Slot
              </th>
              <th>
                <i className="icon-user"></i>Proposer
              </th>
              <th>Time</th>
              <th>Status</th>
              <th>ATT</th>
            </tr>
          </thead>
          <tbody>
            {data && typeof data === 'array' && data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link
                        href={"/epoch/[key]"}
                        as={`/epoch/${item && item.epoch}`}
                      >
                        <a style={{ textDecoration: "none" }}>
                          {item ? item.epoch : "---"}
                        </a>
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={"/slot/[key]"}
                        as={`/slot/${item && item.slot}`}
                      >
                        <a style={{ textDecoration: "none" }}>
                          {item ? item.slot : "---"}
                        </a>
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={"/validator/[key]"}
                        as={`/validator/${item && item.proposer}`}
                      >
                        <a style={{ textDecoration: "none" }}>
                          {item ? item.proposer : "---"}
                        </a>
                      </Link>
                    </td>
                    <td>
                      {item && item.time ? moment(item.time).fromNow() : "---"}
                    </td>
                    <td>
                      <span
                        className={
                          item.status === "proposed"
                            ? "text-green badge bg-success"
                            : item.status === "Skipped"
                            ? "badge bg-warning"
                            : ""
                        }
                      >
                        {item ? item.status : "---"}
                      </span>
                    </td>
                    <td>{item ? item.attestian_count : "---"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No data available in table</td>
              </tr>
            )}
          </tbody>
        </Table>
      </section>
    );
  }
}
export default Attestation;
