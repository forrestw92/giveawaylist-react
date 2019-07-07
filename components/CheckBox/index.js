import React from "react";
import { string, func, bool } from "prop-types";
import stylesheet from "./index.css";

function CheckBox(props) {
  const { id, label, name, checked, _onChange } = props;
  return (
    <label htmlFor={id} className={"label"}>
      <input
        type={"checkbox"}
        name={name}
        id={id}
        className={"checkbox"}
        onChange={e => _onChange(e, name)}
        checked={checked}
      />
      {label}
      <style jsx>{stylesheet}</style>
    </label>
  );
}

CheckBox.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  checked: bool.isRequired,
  _onChange: func.isRequired
};

export default CheckBox;
