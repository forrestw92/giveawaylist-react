import React from "react";
import { func, bool, string } from "prop-types";
import stylesheet from "./index.css";
import CheckBox from "../../components/CheckBox";
import TextInput from "../../components/TextInput";
import FAB from "../../components/FAB";
import { connect } from "react-redux";
import { showHideFAB } from "../../Redux/actions/menuActions";
import { setFilter, fetchGiveaways } from "../../Redux/actions/giveawayActions";

import Button from "../../components/Button";
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
      latestWinner: false,
      hideKindle: false,
      endingSoon: false,
      prizeHigh: false,
      viewCount: false
    };
  }
  changeFilter = () => {
    this.props.setFilter(this.state);
    this.props.fetchGiveaways();
  };
  _onChange = (e, name) => {
    const value = e.target.value;
    const checked = e.target.checked;

    switch (name) {
      case "hideAmazon":
        this.setState({ hideAmazon: checked });
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
        this.setState({ latestWinner: checked });
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
    const { fabOpen, currentPage } = this.props;
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
            checked={this.state.hideAmazon}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"hideVideo"}
            name={"hideVideo"}
            label={"Hide Video"}
            checked={this.state.hideVideo}
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
          {currentPage !== "/ending" && (
            <CheckBox
              id={"endingSoon"}
              name={"endingSoon"}
              label={"Ending Soon"}
              checked={this.state.endingSoon}
              _onChange={this._onChange}
            />
          )}
          <CheckBox
            id={"prizeHigh"}
            name={"prizeHigh"}
            label={"Prize High"}
            checked={this.state.prizeHigh}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"oddsHigh"}
            name={"oddsHigh"}
            label={"Odds High"}
            checked={this.state.oddsHigh}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"oddsLow"}
            name={"oddsLow"}
            label={"Odds Low"}
            checked={this.state.oddsLow}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"viewCount"}
            name={"viewCount"}
            label={"View Count High"}
            checked={this.state.viewCount}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"latestWinner"}
            name={"latestWinner"}
            label={"Latest Winners"}
            checked={this.state.latestWinner}
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
          {currentPage !== "/ebooks" && (
            <CheckBox
              id={"hideKindle"}
              name={"hideKindle"}
              label={"Hide Kindle Books"}
              checked={this.state.hideKindle}
              _onChange={this._onChange}
            />
          )}
        </div>
        <Button
          _onClick={this.changeFilter}
          className={"login"}
          label={"Apply"}
          type={"button"}
        />
      </aside>
    );
  }
}
FilterContainer.propTypes = {
  showHideFAB: func.isRequired,
  fabOpen: bool.isRequired,
  setFilter: func.isRequired,
  fetchGiveaways: func.isRequired,
  currentPage: string.isRequired
};
export default connect(
  ({ menus, giveaways, nav }) => ({
    fabOpen: menus.fabOpen,
    filter: giveaways.filter,
    currentPage: nav.currentPage
  }),
  {
    showHideFAB,
    setFilter,
    fetchGiveaways
  }
)(FilterContainer);
