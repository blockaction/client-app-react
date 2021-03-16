import React, { Component } from "react";
import { imgURL } from "utils/constants";
import { Table, Row, Col, Tooltip, OverlayTrigger, Nav } from "react-bootstrap";
import Link from "next/link";
import { text_truncate } from "utils/helperFunctions";
import { useRouter } from "next/router";
import { INSPECT_MAX_BYTES } from "buffer";

class ValidatorTable extends Component {
  renderTooltip = (props, key) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        <span style={{ fontSize: "10px" }}>{key}</span>
      </Tooltip>
    );
  };

  render() {
    const { data } = this.props;
    var validatorData =
      data &&
      data.validatorList &&
      data.validatorList.length > 0 &&
      data.validatorList.slice(0, 10);
    return (
      <section className="table_wrapper">
        <div className="d-flex justify-content-between align-items-center table__header">
          <span className="table__title">
            {" "}
            <span className="icon__wrapper">
              {" "}
              <i className="icon-validators"> </i>
            </span>
            Active Validators
          </span>
          <span style={{ float: "right" }}>
            <Link href="all-validators">
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
              <th>Index</th>
              {/* <th>
                <i className="icon-key"></i>Public Key{" "}
              </th> */}
              <th>Current Balance</th>
              <th>Effective Balance</th>
              <th>Slashed</th>
            </tr>
          </thead>
          <tbody>
            {validatorData && validatorData.length > 0 ? (
              validatorData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link
                        href={"/validator/[key]"}
                        as={`/validator/${
                          item.validator &&
                          item.validator.index &&
                          item.validator.index
                        }`}
                      >
                        <a target="__blank" style={{ textDecoration: "none" }}>
                          {text_truncate(
                            item.validator && item.validator.index
                              ? item.validator.index
                              : "---",
                            30
                          )}
                        </a>
                      </Link>
                    </td>
                    {/* <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={(props) =>
                        this.renderTooltip(
                          props,
                          item.validator ? item.validator.publicKey : ""
                        )
                      }
                    >
                      <td>
                        <Link
                          href={"/validator/[key]"}
                          as={`/validator/${
                            item.validator && item.validator.publicKey
                          }`}
                        >
                          <a style={{ textDecoration: "none" }}>
                            {text_truncate(
                              item.validator ? item.validator.publicKey : "---",
                              30
                            )}
                          </a>
                        </Link>
                      </td>
                    </OverlayTrigger> */}
                    {/* <td>{text_truncate(item.validator ? item.validator.publicKey : '---', 30)}</td> */}
                    <td>
                      {item.validator && item.validator.balance
                        ? Math.round(item.validator.balance * 1000) / 1000 +
                          " ETH"
                        : "---"}{" "}
                    </td>
                    <td>
                      {item.validator &&
                        item.validator.effectiveBalance &&
                        item.validator.effectiveBalance}{" "}
                      ETH
                    </td>
                    <td>
                      {item.validator && item.validator.slashed
                        ? "True"
                        : "False"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No validators data</td>
              </tr>
            )}
          </tbody>
        </Table>
      </section>
    );
  }
}
export default ValidatorTable;
