import React from "react";
import { string, func } from "prop-types";
import stylesheet from "./index.css";

const InputGroup = props => {
  return (
    <div className={stylesheet["input--group"]}>
      <input
        type={props.type}
        className={stylesheet["input"]}
        id={props.id}
        name={props.name}
        autoComplete={props.autoComplete}
        onChange={e => props._onChange(e, props.name)}
        value={props.value}
      />
      <label
        htmlFor={props.name}
        className={props.value ? stylesheet["input--filled"] : undefined}
      >
        {props.label}
      </label>
    </div>
  );
};
InputGroup.propTypes = {
  _onChange: func.isRequired,
  label: string.isRequired,
  value: string.isRequired,
  type: string.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  autoComplete: string.isRequired
};
export default InputGroup;
