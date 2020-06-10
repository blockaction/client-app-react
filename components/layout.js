import Head from "next/head";
import NavigationBar from "./navbar";
import Footer from "./footer";

import {
  websiteTitle,
  websiteDescription,
  websiteKeywords,
  websiteImage,
} from "utils/constants";

import * as action from "utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.scss";
import "../styles/fonts/style.css";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>{props.websiteTitle ? props.websiteTitle : websiteTitle}</title>
        <meta
          name="author"
          content={props.articleAuthor ? props.articleAuthor : "ETH"}
        />
        <meta
          name="description"
          content={
            props.websiteDescription
              ? props.websiteDescription
              : websiteDescription
          }
        />
        <meta
          name="keywords"
          content={
            props.websiteKeywords ? props.websiteKeywords : websiteKeywords
          }
        ></meta>
        <meta
          name="image"
          content={props.websiteImage ? `${props.websiteImage}` : websiteImage}
        />

        {/* OG:Type */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={props.websiteTitle ? props.websiteTitle : websiteTitle}
        />
        <meta
          property="og:description"
          content={
            props.websiteDescription
              ? props.websiteDescription
              : websiteDescription
          }
        />
        <meta
          property="og:image"
          content={props.websiteImage ? `${props.websiteImage}` : websiteImage}
        />

        {/* Item Prop */}
        <meta
          itemProp="author"
          content={props.articleAuthor ? props.articleAuthor : "ETH"}
        />
        <meta
          itemProp="description"
          content={
            props.websiteDescription
              ? props.websiteDescription
              : websiteDescription
          }
        />
        <meta
          itemProp="keywords"
          content={
            props.websiteKeywords ? props.websiteKeywords : websiteKeywords
          }
        ></meta>
        <meta
          itemProp="image"
          content={props.websiteImage ? props.websiteImage : websiteImage}
        />

        <meta
          name="google-site-verification"
          content="edRHpBzhRseXole5ZklVu6YFQ3oO49wQQfAwplx6tR0"
        />

        <link
          rel="icon"
          href="../static/favicon.png"
          type="image/gif"
          sizes="16x16"
        />

        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      
         <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TPPG9TP');`,
        }}>
        </script>
        {/* <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.schemaData) }}
        /> */}
      </Head>
      {!props.metaDataFlag && <NavigationBar {...props} />}
      <div className="wrapper">{props.children}</div>
      {!props.metaDataFlag && <Footer {...props} />}
    </>
  );
};

export default Layout;
