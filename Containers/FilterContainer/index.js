import React from "react";
import { func, bool } from "prop-types";
import stylesheet from "./index.css";
import CheckBox from "../../components/CheckBox";
import TextInput from "../../components/TextInput";
import FAB from "../../components/FAB";
import { connect } from "react-redux";
import { showHideFAB } from "../../Redux/actions/menuActions";
class FilterContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      oddsLow: false,
      oddsHigh: false,
      oddsMin: "",
      oddsMax: "",
      hideVideo: false,
      hideAmazon: false,
      hideSweepstakes: false,
      hideKeywords: [],
      latestWinner: false
    };
  }
  _onChange = (e, name) => {
    const value = e.target.value;
    const checked = e.target.checked;
    switch (name) {
      case "hideTwitterFollow":
        this.setState({ hideTwitterFollow: checked });
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
        this.setState({ hideKeywords: [...this.state.hideKeywords, value] });
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
      case "latestWinner":
        this.setState({ latestWinner: value });
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
  };
  _onClick = () => {
    this.props.showHideFAB();
  };

  render() {
    const { fabOpen } = this.props;
    return (
      <aside
        className={
          fabOpen
            ? `${stylesheet["filterContainer"]} ${stylesheet["off-screen"]}`
            : stylesheet["filterContainer"]
        }
      >
        <FAB
          _onClick={() => this._onClick()}
          className={"fab"}
          ariaLabel={"Filter"}
        />
        <h1 className={stylesheet["title"]}>Filter</h1>
        <div className={stylesheet["filterGroup"]}>
          <h4 className={stylesheet["filterTitle"]}>Requirements</h4>
          <CheckBox
            id={"hideAmazon"}
            name={"hideAmazon"}
            label={"Amazon Follow"}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"hideVideo"}
            name={"hideVideo"}
            label={"Hide Video"}
            _onChange={this._onChange}
          />
        </div>
        <div className={stylesheet["filterGroup"]}>
          <h4 className={stylesheet["filterTitle"]}>Odds</h4>
          <div className={stylesheet["input--group"]}>
            <label htmlFor={"oddsMin"}>
              Min Odds
              <TextInput
                type={"text"}
                id={"oddsMin"}
                name={"oddsMin"}
                autoComplete={"off"}
                _onChange={this._onChange}
                value={this.state.oddsMin}
                className={"input--number"}
              />
            </label>
            <label htmlFor={"oddsMax"}>
              Max Odds
              <TextInput
                type={"text"}
                id={"oddsMax"}
                name={"oddsMax"}
                autoComplete={"off"}
                _onChange={this._onChange}
                value={this.state.oddsMax}
                className={"input--number"}
              />
            </label>
          </div>
        </div>
        <div className={stylesheet["filterGroup"]}>
          <h4 className={stylesheet["filterTitle"]}>Sort</h4>
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
          <CheckBox
            id={"latestWinner"}
            name={"latestWinner"}
            label={"Latest Winners"}
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
              className={"input--md"}
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
      </aside>
    );
  }
}
FilterContainer.propTypes = {
  showHideFAB: func.isRequired,
  fabOpen: bool.isRequired
};
export default connect(
  ({ menus }) => ({ fabOpen: menus.fabOpen }),
  {
    showHideFAB
  }
)(FilterContainer);
