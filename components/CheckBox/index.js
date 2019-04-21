import React from "react";
import { string, func } from "prop-types";
import stylesheet from "./index.css";

class CheckBox extends React.Component {
  render() {
    const { id, label, name, _onChange } = this.props;
    return (
      <label htmlFor={id}>
        <input
          type={"checkbox"}
          name={name}
          id={id}
          className={stylesheet["checkbox"]}
          onChange={e => _onChange(e, name)}
        />
        {label}
      </label>
    );
  }
}
CheckBox.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  _onChange: func.isRequired
};

export default CheckBox;
