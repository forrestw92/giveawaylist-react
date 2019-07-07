import React from "react";
import { string, func, bool } from "prop-types";
import stylesheet from "./index.css";
import TextInput from "../TextInput";

function InputGroup(props) {
  const {
    type,
    id,
    name,
    autoComplete,
    _onChange,
    value,
    hasError,
    onBlur,
    label
  } = props;
  return (
    <div className={"input--group"}>
      <TextInput
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
        _onChange={_onChange}
        value={value}
        hasError={hasError}
        onBlur={onBlur}
      />
      <label htmlFor={name} className={value ? "input--filled" : undefined}>
        {label}
      </label>
      <style jsx>{stylesheet}</style>
    </div>
  );
}
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
