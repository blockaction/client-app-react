import React from "react";
import { Container, Row } from "react-bootstrap";
import Link from "next/link";

const ContentUnavailable = () => {
  return (
    <>
      <section className="no-content pt-5 pb-5">
        <Container>
          <Row>
            <div className="col-md-8 offset-md-2 pt-7 pb-7">
              <div className="error-message">
                <p className="sub-title mb-0">We're sorry!!</p>
                <h2>Content not found.</h2>
                <p>
                  The content you are looking for cannot be found. Check for any
                  errors in the title or please try again later.
                </p>
                <Link href="/">
                  <a className="btn btn-primary" href="/">
                    Go back home
                  </a>
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ContentUnavailable;
