import React, { useState } from "react";
import { number, func, bool, string, object } from "prop-types";
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

function FilterContainer(props) {
  let [categories, setCategoires] = useState(defaultCategories);
  if (!props) return;
  const {
    deleteGiveaways,
    setFilter,
    fabOpen,
    currentPage,
    fetchGiveaways,
    filter
  } = props;
  const {
    oddsLow,
    oddsHigh,
    oddsMin,
    oddsMax,
    hideVideo,
    hideAmazon,
    latestWinner,
    hideKindle,
    endingSoon,
    prizeHigh,
    viewCount
  } = filter;
  let delayFetch = throttle(function() {
    fetchGiveaways();
  }, 2000);

  const _onChange = (e, name) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (name === "category") {
      filter["category"] = encodeURIComponent(value);
      setFilter(filter);
    } else if (name === "oddsMin" || name === "oddsMax") {
      filter[name] = value;
      setFilter(filter);
    } else {
      filter[name] = checked;
      setFilter(filter);
    }
    deleteGiveaways();
    delayFetch();
  };

  const _onFocus = () => {
    const defaultOption = { category: "All Categories" };
    getCategories(filter).then(({ data }) => {
      const { results } = data;
      setCategoires([defaultOption, ...results]);
    });
  };
  return (
    <aside
      className={fabOpen ? `filterContainer off-screen` : "filterContainer"}
    >
      <div className={"box"}>
        <h1 className={"title"}>Filter</h1>
        {currentPage !== "/ebooks" && (
          <div className="filterGroup">
            <h4 className="filterTitle">Categories</h4>
            <Select
              name={"category"}
              _onFocus={_onFocus}
              _onChange={_onChange}
              defaultSelection={0}
              options={categories}
            />
          </div>
        )}
        <div className={"filterGroup"}>
          <h4 className={"filterTitle"}>Requirements</h4>
          <CheckBox
            id={"hideAmazon"}
            name={"hideAmazon"}
            label={"Amazon Follow"}
            checked={hideAmazon}
            _onChange={_onChange}
          />
          <CheckBox
            id={"hideVideo"}
            name={"hideVideo"}
            label={"Hide Video"}
            checked={hideVideo}
            _onChange={_onChange}
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
                _onChange={_onChange}
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
                _onChange={_onChange}
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
              _onChange={_onChange}
            />
          )}
          <CheckBox
            id={"prizeHigh"}
            name={"prizeHigh"}
            label={"Prize High"}
            checked={prizeHigh}
            _onChange={_onChange}
          />
          <CheckBox
            id={"oddsHigh"}
            name={"oddsHigh"}
            label={"Odds High"}
            checked={oddsHigh}
            _onChange={_onChange}
          />
          <CheckBox
            id={"oddsLow"}
            name={"oddsLow"}
            label={"Odds Low"}
            checked={oddsLow}
            _onChange={_onChange}
          />
          <CheckBox
            id={"viewCount"}
            name={"viewCount"}
            label={"View Count High"}
            checked={viewCount}
            _onChange={_onChange}
          />
          <CheckBox
            id={"latestWinner"}
            name={"latestWinner"}
            label={"Latest Winners"}
            checked={latestWinner}
            _onChange={_onChange}
          />
        </div>
        {currentPage !== "/ebooks" && (
          <div className={"filterGroup"}>
            <h4 className={"filterTitle"}>Giveaways</h4>
            <CheckBox
              id={"hideKindle"}
              name={"hideKindle"}
              label={"Hide Kindle Books"}
              checked={hideKindle}
              _onChange={_onChange}
            />
          </div>
        )}

        <div className={"filterGroup"}>
          <div className={"input--group"}>
            <Button
              _onClick={() => resetFilter()}
              label={"Reset"}
              className={"primary"}
              type={"button"}
            />
            {fabOpen && (
              <Button
                _onClick={() => showHideFAB()}
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
  latestWinner: bool.isRequired,
  hideKindle: bool.isRequired,
  endingSoon: bool.isRequired,
  prizeHigh: bool.isRequired,
  viewCount: bool.isRequired,
  totalGiveaways: number.isRequired,
  filter: object.isRequired
};

export default connect(
  ({ menus, giveaways, nav }) => ({
    fabOpen: menus.fabOpen,
    totalGiveaways: giveaways.totalGiveaways,
    filter: giveaways.filter,
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
