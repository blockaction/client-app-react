import React, { Component } from "react";
import { imgURL } from "utils/constants";
import { Table, Row, Col } from "react-bootstrap";

class ValidatorTable extends Component {
  render() {
    const { data } = this.props;
    var validatorQueue =
      data && data.public_keys && data.public_keys.length > 0
        ? data.public_keys.slice(0, 10)
        : null;
    return (
      <section>
        <div className="d-flex justify-content-between align-items-center table__header">
          <span className="table__title">Validators Queue</span>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Public Keys </th>
            </tr>
          </thead>
          <tbody>
            {validatorQueue && validatorQueue.length > 0 ? (
              validatorQueue.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No Data in the Queue.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </section>
    );
  }
}
export default ValidatorTable;
