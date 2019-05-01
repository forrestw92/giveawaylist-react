import React from "react";
import { string, func, bool } from "prop-types";
import stylesheet from "./index.css";
import TextInput from "../TextInput";

const InputGroup = props => {
  return (
    <div className={"input--group"}>
      <TextInput
        type={props.type}
        id={props.id}
        name={props.name}
        autoComplete={props.autoComplete}
        _onChange={props._onChange}
        value={props.value}
        hasError={props.hasError}
        onBlur={props.onBlur}
      />
      <label
        htmlFor={props.name}
        className={props.value ? "input--filled" : undefined}
      >
        {props.label}
      </label>
      <style jsx>{stylesheet}</style>
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
  autoComplete: string.isRequired,
  hasError: bool,
  onBlur: func
};
export default InputGroup;
