import React from "react";
import { func, string } from "prop-types";
import stylesheet from "./index.css";
import TextInput from "../TextInput";
class GiveawayHeader extends React.Component {
  handleForm = e => {
    e.preventDefault();
  };

  render() {
    const { handleSearch, searchValue } = this.props;
    return (
      <section className={stylesheet["list--header"]}>
        <div className={stylesheet.slider}>
          <input type="radio" name="loadType" id="pagination" defaultChecked />
          <label htmlFor="pagination">Pagination</label>
          <input type="radio" name="loadType" id="autoLoad" />
          <label htmlFor="autoLoad">Auto Load</label>
        </div>
        <form onSubmit={this.handleForm}>
          <TextInput
            autoComplete={false}
            type={"search"}
            id={"search"}
            name={"search"}
            placeHolder={"Search..."}
            _onChange={handleSearch}
            value={searchValue}
          />
        </form>
      </section>
    );
  }
}
GiveawayHeader.propTypes = {
  handleSearch: func.isRequired,
  searchValue: string.isRequired
};
export default GiveawayHeader;
