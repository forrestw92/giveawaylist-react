import React from "react";
import stylesheet from "./index.css";
import CheckBox from "../../components/CheckBox";
import TextInput from "../../components/TextInput";
class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oddsLow: false,
      oddsHigh: false,
      oddsMin: "",
      oddsMax: "",
      hideTwitterFollow: false,
      hideTweet: false,
      hidePolls: false,
      hideVideo: false,
      hideAmazon: false,
      hideSweepstakes: false,
      hideEvery: false,
      hideRandom: false,
      hideKeywords: []
    };
  }

  _onChange = (e, name) => {
    const value = e.target.value;
    const checked = e.target.checked;
    switch (name) {
      case "hideTwitterFollow":
        this.setState({ hideTwitterFollow: checked });
        break;
      case "hideAmazon":
        this.setState({ hideAmazon: checked });
        break;
      case "hideTweet":
        this.setState({ hideTweet: checked });
        break;
      case "hidePolls":
        this.setState({ hidePolls: checked });
        break;
      case "hideVideo":
        this.setState({ hideVideo: checked });
        break;
      case "oddsLow":
        this.setState({ oddsLow: checked });
        break;
      case "oddsHigh":
        this.setState({ oddsHigh: checked });
        break;
      case "hideKeywords":
        this.setState({ hideKeywords: value });
        break;
      case "hideEvery":
        this.setState({ hideEvery: checked });
        break;
      case "hideRandom":
        this.setState({ hideRandom: checked });
        break;
      case "hideSweepstakes":
        this.setState({ hideSweepstakes: checked });
        break;
      case "hideKindle":
        this.setState({ hideKindle: checked });
        break;
      case "endingSoon":
        this.setState({ endingSoon: checked });
        break;
      case "prizeHigh":
        this.setState({ prizeHigh: checked });
        break;
      case "viewCount":
        this.setState({ viewCount: checked });
        break;
      case "oddsMin":
        this.setState({ oddsMin: value });
        break;
      case "oddsMax":
        this.setState({ oddsMax: value });
        break;
      default:
        return false;
    }
    this.setState({ oddsMin: e.target.value });
  };
  render() {
    return (
      <section className={stylesheet["filterContainer"]}>
        <h1 className={stylesheet["title"]}>Filter</h1>
        <div className={stylesheet["filterGroup"]}>
          <h4 className={stylesheet["filterTitle"]}>Requirements</h4>
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
        <div className={stylesheet["filterGroup"]}>
          <h4 className={stylesheet["filterTitle"]}>Odds</h4>
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
        <div className={stylesheet["filterGroup"]}>
          <h4 className={stylesheet["filterTitle"]}>Sort</h4>
          <div className={stylesheet["input--group"]}>
            <TextInput
              type={"text"}
              id={"oddsMin"}
              name={"oddsMin"}
              autoComplete={"off"}
              placeHolder={"Min Odds"}
              _onChange={this._onChange}
              value={this.state.oddsMin}
              className={"input--number"}
            />
            <TextInput
              type={"text"}
              id={"oddsMax"}
              name={"oddsMax"}
              autoComplete={"off"}
              placeHolder={"Max Odds"}
              _onChange={this._onChange}
              value={this.state.oddsMax}
              className={"input--number"}
            />
          </div>
          <CheckBox
            id={"endingSoon"}
            name={"endingSoon"}
            label={"Ending Soon"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"prizeHigh"}
            name={"prizeHigh"}
            label={"Prize High"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"oddsHigh"}
            name={"oddsHigh"}
            label={"Odds High"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"oddsLow"}
            name={"oddsLow"}
            label={"Odds Low"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"viewCount"}
            name={"viewCount"}
            label={"View Count High"}
            _onChange={this._onChange}
          />
        </div>
        <div className={stylesheet["filterGroup"]}>
          <h4 className={stylesheet["filterTitle"]}>Giveaways</h4>
          <div className={stylesheet["input--group"]}>
            <TextInput
              type={"text"}
              id={"hideKeywords"}
              name={"hideKeywords"}
              autoComplete={"off"}
              _onChange={this._onChange}
              placeHolder={"Hide Keywords"}
              className={"input--number"}
              value={this.state.hideKeywords}
            />
          </div>
          <CheckBox
            id={"hideKindle"}
            name={"hideKindle"}
            label={"Hide Kindle Books"}
            _onChange={this._onChange}
          />
        </div>
      </section>
    );
  }
}
FilterContainer.propTypes = {};
export default FilterContainer;
