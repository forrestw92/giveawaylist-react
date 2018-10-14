import React from "react";
import stylesheet from "./index.css";
import LazyLoad from "react-lazyload";
import { string } from "prop-types";

const CardImage = props => {
  return (
    <LazyLoad height={160} once>
      <img
        src={props.picture.replace(".jpg", ".SR160,160.jpg")}
        alt={"Giveaway Picture"}
        className={stylesheet.image}
      />
    </LazyLoad>
  );
};
CardImage.propTypes = {
  picture: string.isRequired
};
export default CardImage;
