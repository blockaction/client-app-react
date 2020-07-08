import React from "react";
import App, { Container } from "next/app";
// import * as action from "utils/api";
import * as action from "utils/apiAdmin";
import Layout from "components/layout";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    const organisationData = await action
      .getData("organisation-info/client")
      .then(
        res => res && res.data && res.data.dataList && res.data.dataList[0]
      );
    return { pageProps, organisationData };
  }

  render() {
    const { Component, pageProps, organisationData } = this.props;
    return (
      <Layout {...pageProps} organisationData={organisationData} {...this.props}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
