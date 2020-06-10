import React from "react";
import Layout from "../components/layout";
import Link from "next/link";
import { Button, Container, Row } from "react-bootstrap";
import InnerPageBanner from "components/Common/InnerPageBanner/";

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Layout metaDataFlag={true}>
        <Container>
          <InnerPageBanner pageTitle="Oops!!!" />
          <Row>
            <div className="col-md-8 offset-md-2 mb-5">
              <div className="error-container pt-7 ">
                <div className="error-message">
                  {this.props.statusCode === 404 ? (
                    <>
                      <h1>{this.props.statusCode}</h1>
                      <h2>oops! Page not found</h2>
                      <p className="mt-4">
                        The page you were looking for wasn't found. You may be
                        here because:
                      </p>
                      <ul style={{ marginTop: "15px" }}>
                        <li>
                          You typed the incorrect page address in the address
                          bar
                        </li>
                        <li>The page has been moved to a different address</li>
                        <li>The page no longer exists</li>
                      </ul>

                      <Link href="/">
                        <Button variant="primary mt-3">Go Back Home</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <h1>Error On Client</h1>
                      <h5>The page you were looking for wasn't found.</h5>
                      <Link href="/">
                        <Button variant="primary mt-3">Go Back Home</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Error;
