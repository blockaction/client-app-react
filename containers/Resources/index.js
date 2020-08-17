import React, { Component } from "react";
import Layout from "components/layout";
import { Container, Row, Accordion, Card } from "react-bootstrap";
import InnerPageBanner from "components/Common/InnerPageBanner";
import * as action from "utils/api";
import * as actionAdmin from "utils/apiAdmin";
import { withRouter } from "next/router";
import ContentUnavailable from "components/Common/ContentUnavailable";

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexOpen: null,
      indexOpen2: null,
    };
  }

  static async getInitialProps() {

    const ethResourcesWithCat = await actionAdmin
    .getData("faq/faq-list-with-category")
    .then(res => res && res.data);

    const references = await actionAdmin
    .getData("content-template/list")
    .then(res => res && res.data);

    return {ethResourcesWithCat, references };
  }

  handleClick = (index) => {
    const { indexOpen } = this.state;
    index !== indexOpen
      ? this.setState({ indexOpen: index })
      : this.setState({ indexOpen: null });
  };

  handleClick2 = (index) => {
    const { indexOpen2 } = this.state;
    index !== indexOpen2
      ? this.setState({ indexOpen2: index })
      : this.setState({ indexOpen2: null });
  };

  render() {
    const { ethResourcesWithCat, references } = this.props;
    const { indexOpen, indexOpen2 } = this.state;
    return (
      <Layout
        websiteTitle="Resources - ETH 2.0 | Blockaction"
        websiteDescription=""
        websiteKeywords=""
        metaDataFlag={true}
      >
        <Container>
          {" "}
          <InnerPageBanner pageTitle="Resources" />
        </Container>
        <section className="faq-section pattern-box">
          <Container>
            <Row>
              <div className="col-12">
                <h2 className="title center-line text-center mb-0">
                  Frequently Asked Questions
                </h2>
              </div>
            </Row>
            {ethResourcesWithCat && ethResourcesWithCat.length > 0 && 
              ethResourcesWithCat.map((item, idx) => {
                return(
                   <div key={idx}>
                     <p className="faq-subtitle">{item.category_title}</p>
                        <Accordion>
                  {item.faq &&
                     item.faq.length > 0 && 
                      item.faq.map((item, index) => {
                        return(
                          <Card onClick={() => this.handleClick(index)} key={index}>
                          <Accordion.Toggle as={Card.Header} eventKey={index+1}>
                            {item.question}
                            <i
                              className={
                                indexOpen === index 
                                  ? "icon-chevron-right open"
                                  : "icon-chevron-right"
                              }
                            ></i>
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey={index+1}>
                            <Card.Body>
                            {/* {item.answer} */}
                            <div dangerouslySetInnerHTML={{__html: `${item.answer}`}} />
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        );
                      })}
                </Accordion>
                   </div>
                );
              })
            }
            {/* <p className="faq-subtitle">Staking Resources</p>
            <Accordion>
            {stakingResourcesData && stakingResourcesData[0] && stakingResourcesData[0].faq &&
                stakingResourcesData[0].faq.length > 0 && 
                  stakingResourcesData[0].faq.map((item, index) => {
                    return(
                      <Card onClick={() => this.handleClick(index)} key={index}>
                      <Accordion.Toggle as={Card.Header} eventKey={index}>
                        {item.question}
                        <i
                          className={
                            indexOpen === index 
                              ? "icon-chevron-right open"
                              : "icon-chevron-right"
                          }
                        ></i>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                        <div dangerouslySetInnerHTML={{__html: `${item.answer}`}} />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    );
                  })}
            </Accordion> */}
          </Container>
        </section>
        <section className="reference-section mt-5">
        {references && references.dataList && references.dataList.length > 0 &&
          <Container>
            <Row>
              <div className="col-md-12">
                <h2 className="title">References</h2>
              </div>
              <div className="col-md-12">
                <ul>
                  {references.dataList.map((item, index) => {
                    return(
                        <li key={index}>
                          <div dangerouslySetInnerHTML={{__html: `${item.template_content}`}} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Row>
          </Container>
        }
        </section>
      </Layout>
    );
  }
}

export default withRouter(FAQ);
