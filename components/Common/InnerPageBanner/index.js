import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { capitaliseFirstLetter } from "utils/helperFunctions";

import Link from "next/link";
import { URL } from "utils/constants";

const InnerPageBanner = (props) => {
  return (
    <section className="inner-banner">
      <div className="bread-crumb">
        <p className="page-title">
          {props.pageTitle ? capitaliseFirstLetter(props.pageTitle) : ""}
        </p>
        {props.pageTitle && (
          <ul>
            <li>
              <Link href="/">
                <a href="/">
                  <i className="icon-home"></i> Home
                </a>
              </Link>
            </li>
            {props.events && (
              <li>
                <Link href="/events">
                  <a>Events</a>
                </Link>
              </li>
            )}
            {props.news && (
              <li>
                <Link href="/news">
                  <a>News</a>
                </Link>
              </li>
            )}
            {props.albums && (
              <li>
                <Link href="/gallery">
                  <a>Gallery</a>
                </Link>
              </li>
            )}
            {props.management && (
              <li>
                <Link href="/programs/management">
                  <a>Management</a>
                </Link>
              </li>
            )}
            {props.science && (
              <li>
                <Link href="/programs/science">
                  <a>Science</a>
                </Link>
              </li>
            )}
            {props.humanities && (
              <li>
                <Link href="/programs/humanities">
                  <a>Humanities</a>
                </Link>
              </li>
            )}
            {/* {props.programs && (
                  <li>
                    <Link href="/programs">
                      <a>Programs</a>
                    </Link>
                  </li>
                )} */}
            {props.notices && (
              <li>
                <Link href="/notice">
                  <a>Notices</a>
                </Link>
              </li>
            )}
            {props.pageTitle !== "Page not found" && (
              <li>
                {props.pageTitle ? capitaliseFirstLetter(props.pageTitle) : ""}
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default InnerPageBanner;
