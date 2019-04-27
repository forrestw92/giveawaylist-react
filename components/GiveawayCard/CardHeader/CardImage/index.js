import React from "react";
import LazyLoad from "react-lazyload";
import { string } from "prop-types";
import stylesheet from "./index.css";
const CardImage = props => {
  return (
    <LazyLoad
      height={160}
      once
      placeholder={
        <img
          alt={"Giveaway Picture"}
          src={`/static/images/giveaways/${props.giveawayID}.jpg`}
          className={"giveawayCard--image"}
          height={160}
          width={160}
        />
      }
    >
      <img
        src={props.picture}
        alt={"Giveaway Picture"}
        className={"giveawayCard--image"}
      />
      <style jsx>{stylesheet}</style>
    </LazyLoad>
  );
};
CardImage.propTypes = {
  picture: string.isRequired,
  giveawayID: string
};
export default CardImage;
