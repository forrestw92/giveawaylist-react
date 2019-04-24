import React from "react";
import LazyLoad from "react-lazyload";
import { string } from "prop-types";
import stylesheet from "./index.css";
const CardImage = props => {
  return (
    <LazyLoad height={160} once>
      <img
        src={props.picture.replace(".jpg", ".SR160,160.jpg")}
        alt={"Giveaway Picture"}
        className={"giveawayCard--image"}
      />
      <style jsx>{stylesheet}</style>
    </LazyLoad>
  );
};
CardImage.propTypes = {
  picture: string.isRequired
};
export default CardImage;
