import React from "react";
import { func, bool, string, object, array, number } from "prop-types";
import stylesheet from "./index.css";
import CheckBox from "../../components/CheckBox";
import TextInput from "../../components/TextInput";
import FAB from "../../components/FAB";
import { connect } from "react-redux";
import { showHideFAB } from "../../Redux/actions/menuActions";
import {
  setFilter,
  fetchGiveaways,
  deleteGiveaways
} from "../../Redux/actions/giveawayActions";

class FilterContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  _onChange = (e, name) => {
    const value = e.target.value;
    const checked = e.target.checked;

    switch (name) {
      case "hideAmazon":
        this.props.setFilter({ hideAmazon: checked });
        break;
      case "hideVideo":
        this.props.setFilter({ hideVideo: checked });
        break;
      case "oddsLow":
        this.props.setFilter({ oddsLow: checked });
        break;
      case "oddsHigh":
        this.props.setFilter({ oddsHigh: checked });
        break;
      case "hideKeywords":
        this.props.setFilter({
          hideKeywords: [...this.state.hideKeywords, value]
        });
        break;
      case "hideKindle":
        this.props.setFilter({ hideKindle: checked });
        break;
      case "endingSoon":
        this.props.setFilter({ endingSoon: checked });
        break;
      case "prizeHigh":
        this.props.setFilter({ prizeHigh: checked });
        break;
      case "viewCount":
        this.props.setFilter({ viewCount: checked });
        break;
      case "latestWinner":
        this.props.setFilter({ latestWinner: checked });
        break;
      case "oddsMin":
        this.props.setFilter({ oddsMin: value });
        break;
      case "oddsMax":
        this.props.setFilter({ oddsMax: value });
        break;
      default:
        return false;
    }
    this.props.deleteGiveaways();
    this.props.fetchGiveaways();
  };

  _onClick = () => {
    this.props.showHideFAB();
  };
  render() {
    const { fabOpen, currentPage } = this.props;
    const {
      oddsLow,
      oddsHigh,
      oddsMin,
      oddsMax,
      hideVideo,
      hideAmazon,
      hideKeywords,
      latestWinner,
      hideKindle,
      endingSoon,
      prizeHigh,
      viewCount
    } = this.props;

    return (
      <aside
        className={fabOpen ? `filterContainer off-screen` : "filterContainer"}
      >
        <FAB
          _onClick={() => this._onClick()}
          className={"fab"}
          ariaLabel={"Filter"}
        />
        <h1 className={"title"}>Filter</h1>
        <div className={"filterGroup"}>
          <h4 className={"filterTitle"}>Requirements</h4>
          <CheckBox
            id={"hideAmazon"}
            name={"hideAmazon"}
            label={"Amazon Follow"}
            checked={hideAmazon}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"hideVideo"}
            name={"hideVideo"}
            label={"Hide Video"}
            checked={hideVideo}
            _onChange={this._onChange}
          />
        </div>
        <div className={"filterGroup"}>
          <h4 className={"filterTitle"}>Odds</h4>
          <div className={"input--group"}>
            <label htmlFor={"oddsMin"}>
              Min Odds
              <TextInput
                min={1}
                max={1000000}
                type={"number"}
                id={"oddsMin"}
                name={"oddsMin"}
                autoComplete={"off"}
                _onChange={this._onChange}
                value={oddsMin}
                className={"input--number"}
              />
            </label>
            <label htmlFor={"oddsMax"}>
              Max Odds
              <TextInput
                min={parseInt(oddsMin) + 1}
                max={1000000}
                type={"number"}
                id={"oddsMax"}
                name={"oddsMax"}
                autoComplete={"off"}
                _onChange={this._onChange}
                value={oddsMax}
                className={"input--number"}
              />
            </label>
          </div>
        </div>
        <div className={"filterGroup"}>
          <h4 className={"filterTitle"}>Sort</h4>
          {currentPage !== "/ending" && (
            <CheckBox
              id={"endingSoon"}
              name={"endingSoon"}
              label={"Ending Soon"}
              checked={endingSoon}
              _onChange={this._onChange}
            />
          )}
          <CheckBox
            id={"prizeHigh"}
            name={"prizeHigh"}
            label={"Prize High"}
            checked={prizeHigh}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"oddsHigh"}
            name={"oddsHigh"}
            label={"Odds High"}
            checked={oddsHigh}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"oddsLow"}
            name={"oddsLow"}
            label={"Odds Low"}
            checked={oddsLow}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"viewCount"}
            name={"viewCount"}
            label={"View Count High"}
            checked={viewCount}
            _onChange={this._onChange}
          />
          <CheckBox
            id={"latestWinner"}
            name={"latestWinner"}
            label={"Latest Winners"}
            checked={latestWinner}
            _onChange={this._onChange}
          />
        </div>
        <div className={"filterGroup"}>
          <h4 className={"filterTitle"}>Giveaways</h4>
          <div className={"input--group"}>
            <TextInput
              type={"text"}
              id={"hideKeywords"}
              name={"hideKeywords"}
              autoComplete={"off"}
              _onChange={this._onChange}
              placeHolder={"Hide Keywords"}
              className={"input--md"}
              value={hideKeywords}
            />
          </div>
          {currentPage !== "/ebooks" && (
            <CheckBox
              id={"hideKindle"}
              name={"hideKindle"}
              label={"Hide Kindle Books"}
              checked={hideKindle}
              _onChange={this._onChange}
            />
          )}
        </div>
        {/*language=CSS*/}
        <style jsx>{stylesheet}</style>
      </aside>
    );
  }
}
FilterContainer.propTypes = {
  showHideFAB: func.isRequired,
  fabOpen: bool.isRequired,
  setFilter: func.isRequired,
  fetchGiveaways: func.isRequired,
  deleteGiveaways: func.isRequired,
  currentPage: string.isRequired,
  filter: object.isRequired,
  oddsLow: bool.isRequired,
  oddsHigh: bool.isRequired,
  oddsMin: number.isRequired,
  oddsMax: number.isRequired,
  hideVideo: bool.isRequired,
  hideAmazon: bool.isRequired,
  hideKeywords: array.isRequired,
  latestWinner: bool.isRequired,
  hideKindle: bool.isRequired,
  endingSoon: bool.isRequired,
  prizeHigh: bool.isRequired,
  viewCount: bool.isRequired
};
export default connect(
  ({ menus, giveaways, nav }) => ({
    fabOpen: menus.fabOpen,
    ...giveaways.filter,
    currentPage: nav.currentPage
  }),
  {
    showHideFAB,
    setFilter,
    fetchGiveaways,
    deleteGiveaways
  }
)(FilterContainer);
