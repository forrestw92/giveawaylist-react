import React from "react";
import { array, func, number, string } from "prop-types";
import stylesheet from "./index.css";
function Select(props) {
  const { options, _onChange, defaultSelection, _onFocus, name } = props;
  const renderOptions = options.map(({ category, count }, idx) => {
    return (
      <option
        key={idx}
        value={category}
        defaultValue={defaultSelection === idx ? true : undefined}
        aria-selected={defaultSelection === idx ? true : undefined}
      >
        {category} {count !== 0 && count && `(${count})`}
      </option>
    );
  });
  return (
    <React.Fragment>
      <select
        name={name}
        className={"custom--select"}
        onFocus={_onFocus}
        onChange={e => _onChange(e, name)}
      >
        {renderOptions}
      </select>
      <style jsx>{stylesheet}</style>
    </React.Fragment>
  );
}
Select.propTypes = {
  _onChange: func.isRequired,
  _onFocus: func.isRequired,
  options: array.isRequired,
  name: string.isRequired,
  defaultSelection: number.isRequired
};

export default Select;
