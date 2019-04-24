import React from "react";
import { func, string, bool } from "prop-types";
import TextInput from "../TextInput";
class GiveawayHeader extends React.Component {
  handleForm = e => {
    e.preventDefault();
  };

  render() {
    const { handleSearch, searchValue, handleLoadType, autoLoad } = this.props;
    return (
      <section className={"list--header"}>
        <div className={"slider"}>
          <input
            type="radio"
            name="loadType"
            id="pagination"
            checked={!autoLoad}
            onChange={handleLoadType}
          />
          <label htmlFor="pagination">Pagination</label>
          <input
            type="radio"
            name="loadType"
            id="autoLoad"
            checked={autoLoad}
            onChange={handleLoadType}
          />
          <label htmlFor="autoLoad">Auto Load</label>
        </div>
        <form onSubmit={this.handleForm}>
          <TextInput
            autoComplete={"off"}
            type={"search"}
            id={"search"}
            name={"search"}
            placeHolder={"Search..."}
            _onChange={handleSearch}
            value={searchValue}
          />
        </form>
        {/*language=CSS*/}
        <style jsx>{`
          .list--header {
            width: 100%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
          }
          .slider {
            display: flex;
            flex-flow: row nowrap;
            width: auto;
            height: 40px;
            justify-content: center;
            align-items: center;
            margin: 0 0 10px 0;
            appearance: none;
            -webkit-appearance: none;
          }
          .slider label {
            padding: 10px 10px;
          }

          .slider input {
            -webkit-appearance: none;
            apperance: none;
            padding: 0;
            margin: 0;
          }
          .slider label:hover {
            cursor: pointer;
          }
          .slider input + label {
            transition: 0.3s linear;
            background: rgba(69, 123, 157, 0.2);
            color: black;
            border: 1px solid rgba(0, 0, 0, 0.25);
          }
          .slider input:nth-child(1) + label {
            border-right: none;
          }
          .slider input:nth-child(3) + label {
            border-left: none;
          }
          .slider input:checked + label {
            background: rgb(69, 123, 157);
            color: white;
          }
        `}</style>
      </section>
    );
  }
}
GiveawayHeader.propTypes = {
  handleSearch: func.isRequired,
  searchValue: string.isRequired,
  handleLoadType: func.isRequired,
  autoLoad: bool.isRequired
};
export default GiveawayHeader;
