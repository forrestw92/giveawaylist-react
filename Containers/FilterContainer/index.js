import React from "react";
import stylesheet from "./index.css";
import CheckBox from "../../components/CheckBox";
class FilterContainer extends React.Component {
  _onChange = e => {
    console.log(e);
  };
  render() {
    return (
      <section className={stylesheet["filterContainer"]}>
        <h1>Filter</h1>
        <div className={stylesheet["filterGroup"]}>
          <h4>Requirements</h4>
          <CheckBox
            id={"hideTwitterFollow"}
            name={"hideTwitterFollow"}
            label={"Twitter Follow"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"hideAmazon"}
            name={"hideAmazon"}
            label={"Amazon Follow"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"hideTweet"}
            name={"hideTweet"}
            label={"Hide Tweet"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"hideVideo"}
            name={"hideVideo"}
            label={"Hide Video"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"hidePolls"}
            name={"hidePolls"}
            label={"Hide Polls"}
            _onChange={this._onChange}
          />
        </div>
        <div className="filterGroup">
          <h4>Odds</h4>
          <CheckBox
            id={"hideSweepstakes"}
            name={"hideSweepstakes"}
            label={"Hide Sweepstakes"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"hideEver"}
            name={"hideEver"}
            label={"Hide Every nTH"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"hideRandom"}
            name={"hideRandom"}
            label={"Hide 1 in nTH"}
            _onChange={this._onChange}
          />
        </div>
        <div className="filterGroup">
          <h4>Sort</h4>
        </div>
        <div className="filterGroup">
          <h4>Giveaways</h4>
        </div>
      </section>
    );
  }
}
FilterContainer.propTypes = {};
export default FilterContainer;
