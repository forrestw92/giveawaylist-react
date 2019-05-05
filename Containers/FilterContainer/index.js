import React from "react";
import { number, func, bool, string, array } from "prop-types";
import stylesheet from "./index.css";
import CheckBox from "../../components/CheckBox";
import TextInput from "../../components/TextInput";
import { connect } from "react-redux";
import { showHideFAB } from "../../Redux/actions/menuActions";
import {
  setFilter,
  fetchGiveaways,
  deleteGiveaways,
  resetFilter
} from "../../Redux/actions/giveawayActions";
import throttle from "lodash/throttle";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { getCategories } from "../../API";

const defaultCategories = [
  { category: "All Categories" },
  { category: "Amazon Devices" },
  { category: "Appliances" },
  { category: "Arts, Crafts & Sewing" },
  { category: "Automotive Parts & Accessories" },
  { category: "Baby" },
  { category: "Beauty & Personal Care" },
  { category: "Books" },
  { category: "Cell Phones & Accessories" },
  { category: "Clothing, Shoes & Jewelry" },
  { category: "Electronics" },
  { category: "Garden & Outdoor" },
  { category: "Grocery & Gourmet Food" },
  { category: "Handmade" },
  { category: "Health, Household & Baby Care" },
  { category: "Home & Kitchen" },
  { category: "Industrial & Scientific" },
  { category: "Kindle eBook" },
  { category: "Musical Instruments" },
  { category: "Office Products" },
  { category: "Pet Supplies" },
  { category: "Sports & Outdoors" },
  { category: "Tools & Home Improvement" },
  { category: "Toys & Games" },
  { category: "Video Games" }
];
class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [...defaultCategories]
    };
  }

  componentDidMount() {
    this.delayfetchGiveaways = throttle(function() {
      this.props.fetchGiveaways();
    }, 2000);
  }

  _onChange = (e, name) => {
    console.log(this);
    const value = e.target.value;
    const checked = e.target.checked;

    switch (name) {
      case "category":
        this.props.setFilter({ category: value });
        break;
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
    this.delayfetchGiveaways();
  };

  _onClick = () => {
    this.props.showHideFAB();
  };
  _onFocus = () => {
    const defaultOption = { category: "All Categories" };
    getCategories().then(({ data }) => {
      const { results } = data;
      this.setState({
        categories: [defaultOption, ...results]
      });
    });
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
        <div className={"box"}>
          <h1 className={"title"}>Filter</h1>
          <div className="filterGroup">
            <h4 className="filterTitle">Categories</h4>
            <Select
              name={"category"}
              _onFocus={this._onFocus}
              _onChange={this._onChange}
              defaultSelection={0}
              options={this.state.categories}
            />
          </div>
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

          <div className={"filterGroup"}>
            <div className={"input--group"}>
              <Button
                _onClick={() => this.props.resetFilter()}
                label={"Reset"}
                className={"primary"}
                type={"button"}
              />
              {fabOpen && (
                <Button
                  _onClick={() => this.props.showHideFAB()}
                  label={"Close"}
                  className={"primary"}
                  type={"button"}
                />
              )}
            </div>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </aside>
    );
  }
}
FilterContainer.propTypes = {
  showHideFAB: func.isRequired,
  resetFilter: func.isRequired,
  fabOpen: bool.isRequired,
  setFilter: func.isRequired,
  fetchGiveaways: func.isRequired,
  deleteGiveaways: func.isRequired,
  currentPage: string.isRequired,
  oddsLow: bool.isRequired,
  oddsHigh: bool.isRequired,
  oddsMin: string.isRequired,
  oddsMax: string.isRequired,
  hideVideo: bool.isRequired,
  hideAmazon: bool.isRequired,
  hideKeywords: array.isRequired,
  latestWinner: bool.isRequired,
  hideKindle: bool.isRequired,
  endingSoon: bool.isRequired,
  prizeHigh: bool.isRequired,
  viewCount: bool.isRequired,
  totalGiveaways: number.isRequired
};

export default connect(
  ({ menus, giveaways, nav }) => ({
    fabOpen: menus.fabOpen,
    totalGiveaways: giveaways.totalGiveaways,
    ...giveaways.filter,
    currentPage: nav.currentPage
  }),

  {
    showHideFAB,
    resetFilter,
    setFilter,
    fetchGiveaways,
    deleteGiveaways
  }
)(FilterContainer);
