import React from "react";
import { string, array, func } from "prop-types";
import stylesheet from "../../Containers/RegisterContainer/index.css";
import SocialIcons from "./SocialIcons";
import InputGroup from "./InputGroup";

class Form extends React.PureComponent {
  render() {
    const { title, _onChange, inputs } = this.props;
    return (
      <React.Fragment>
        <h1 className={stylesheet["title"]}>{title}</h1>
        <SocialIcons />
        <form className={stylesheet["register--form"]}>
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
              />
            ))}
        </form>
      </React.Fragment>
    );
  }
}
Form.propTypes = {
  _onChange: func.isRequired,
  title: string.isRequired,
  inputs: array.isRequired
};
export default Form;
