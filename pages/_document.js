import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TPPG9TP"
            height="0" width="0" style={{display:'none',visibility:'hidden'}}>
        </iframe>
        </noscript>
          <Main />
          <NextScript />
            <script dangerouslySetInnerHTML={{
            __html: `(function(){
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/5ed7aaec9e5f6944228fcd13/default';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();`,
        }}>
        </script>

        </body>
      </Html>
    )
  }
}

export default MyDocument