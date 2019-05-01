import React from "react";
import { func, string, bool } from "prop-types";
import TextInput from "../TextInput";
import stylesheet from "./index.css";
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
        <style jsx>{stylesheet}</style>
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
