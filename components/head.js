import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription =
  "Listing all open Amazon Giveaways with Sort,Search And Filter Options.";
const defaultOGURL = "https://giveawaylist.com";
const defaultOGImage = "/static/images/og-image.png";

const Head = props => (
  <React.Fragment>
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || ""}</title>
      <meta
        name="description"
        content={props.description || defaultDescription}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/static/manifest.json" />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://giveawaylist.b-cdn.net/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="https://giveawaylist.b-cdn.net/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://giveawaylist.b-cdn.net/favicon-16x16.png"
      />

      <meta name="theme-color" content="#1d3557" />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans"
        rel="stylesheet"
      />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ""} />
      <meta
        property="og:description"
        content={props.description || defaultDescription}
      />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
  </React.Fragment>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
