import React from "react";
import Document, { Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        </body>
      </Html>
    );
  }
}
MyDocument.getInitialProps = async ctx => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
};
export default MyDocument;
