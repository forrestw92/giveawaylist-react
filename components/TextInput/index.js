import React from "react";
import { string, func, number, bool } from "prop-types";
import stylesheet from "./index.css";
function TextInput(props) {
  const {
    type,
    id,
    name,
    autoComplete,
    _onChange,
    value,
    className,
    placeHolder,
    min,
    max,
    hasError,
    onBlur
  } = props;
  return (
    <React.Fragment>
      <input
        type={type}
        className={`input ${className ? className : ""} ${
          hasError ? "error" : ""
        }`}
        id={id}
        name={name}
        min={type === "number" ? min.toString() : undefined}
        max={type === "number" ? max.toString() : undefined}
        placeholder={placeHolder ? placeHolder : ""}
        autoComplete={autoComplete}
        onChange={_onChange ? e => _onChange(e, name) : undefined}
        onBlur={onBlur ? () => onBlur(name) : undefined}
        value={value}
      />
      <style jsx>{stylesheet}</style>
    </React.Fragment>
  );
}
TextInput.propTypes = {
  type: string.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  autoComplete: string.isRequired,
  _onChange: func.isRequired,
  value: string.isRequired,
  className: string,
  placeHolder: string,
  min: number,
  max: number,
  hasError: bool,
  onBlur: func
};

export default TextInput;
