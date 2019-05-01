import React from "react";
import LazyLoad from "react-lazyload";
import { string } from "prop-types";
import stylesheet from "./index.css";

const CardImage = props => {
  const Placeholder = (
    <img
      alt={"Loading Giveaway Picture"}
      src={`/static/box.jpg`}
      style={{ margin: "20px auto", "min-height": "160px" }}
    />
  );
  return (
    <LazyLoad height={160} once placeholder={Placeholder}>
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
