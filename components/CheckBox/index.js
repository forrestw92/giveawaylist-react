import React from "react";
import { string, func, bool } from "prop-types";
import stylesheet from "./index.css";

class CheckBox extends React.Component {
  render() {
    const { id, label, name, checked, _onChange } = this.props;
    return (
      <label htmlFor={id}>
        <input
          type={"checkbox"}
          name={name}
          id={id}
          className={stylesheet["checkbox"]}
          onChange={e => _onChange(e, name)}
          checked={checked}
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
  checked: bool.isRequired,
  _onChange: func.isRequired
};

export default CheckBox;
