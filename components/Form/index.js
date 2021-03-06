import React from "react";
import { string, array, func, bool, node } from "prop-types";
import stylesheet from "./index.css";
import SocialButtons from "./SocialButtons";
import InputGroup from "./InputGroup";

function Form(props) {
  const { title, _onChange, inputs, children, socialLogin } = props;
  return (
    <React.Fragment>
      <h1 className={"title"}>{title}</h1>
      {socialLogin ? (
        <SocialButtons />
      ) : (
        <form className={"form"} onSubmit={e => e.preventDefault()}>
          {inputs &&
            inputs.map((input, key) => (
              <InputGroup
                key={key}
                _onChange={_onChange}
                label={input.label}
                value={input.value}
                type={input.type}
                id={input.id}
                name={input.name}
                autoComplete={input.autoComplete}
                hasError={input.hasError}
                onBlur={input.onBlur}
              />
            ))}
          {children}
        </form>
      )}
      <style jsx>{stylesheet}</style>
    </React.Fragment>
  );
}
Form.propTypes = {
  _onChange: func.isRequired,
  title: string.isRequired,
  inputs: array,
  socialLogin: bool,
  children: node
};
export default Form;
