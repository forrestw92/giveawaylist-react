import React, { useState, useEffect } from "react";
import { array, func, string, object, number } from "prop-types";
import { debounce } from "lodash";
import { connect } from "react-redux";
import {
  deleteGiveaways,
  deleteSingleGiveaway,
  fetchGiveaways,
  setFilter
} from "../../Redux/actions/giveawayActions";
import { showHideFAB } from "../../Redux/actions/menuActions";

import Pagination from "../../components/Pagination";
import GiveawayList from "../../components/GiveawayList";
import GiveawayHeader from "../../components/GiveawayHeader";
import FAB from "../../components/FAB";

import stylesheet from "./index.css";
function GiveawayContainer(props) {
  let [search, setSearch] = useState("");
  let [autoLoad, setAutoLoad] = useState(false);
  const {
    setFilter,
    deleteGiveaways,
    fetchGiveaways,
    router,
    giveaways,
    deleteSingleGiveaway,
    title,
    totalGiveaways,
    filter
  } = props;
  const { pageId } = router.query;

  const delayFetch = debounce(function() {
    fetchGiveaways();
  }, 500);

  const handleLoadType = e => {
    if (e.target.id === "autoLoad") {
      setAutoLoad(true);
      document.getElementsByTagName("html")[0].className = "height";
    } else {
      setAutoLoad(false);
      document.getElementsByTagName("html")[0].className = "";
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearch(e.target.value);
    filter["search"] = search;
    setFilter(filter);
    deleteGiveaways();
    delayFetch();
  };

  const replacePageID = () => {
    const { push, pathname, query } = router;
    push(
      `${pathname}?pageId=${(parseInt(query.pageId) || 1) + 1}`,
      `${pathname}?pageId=${(parseInt(query.pageId) || 1) + 1}`,
      {
        shallow: true
      }
    );
  };
  const handleScroll = () => {
    if (!autoLoad) return;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      replacePageID();
    }
  };
  /*eslint prettier/prettier:0*/
  useEffect(
    () => {
      const debounceScroll = debounce(handleScroll, 100);

      if (autoLoad) {
        window.addEventListener("scroll", debounceScroll);
        window.evtScroll = true;
      }
      return function cleanup() {
        window.removeEventListener("scroll", debounceScroll);
      };
    },
    [giveaways, autoLoad]
  );
  const _onClick = () => {
    showHideFAB();
  };
  return (
    <main role="main" className={"giveawayContainer"}>
      <FAB _onClick={() => _onClick()} className={"fab"} ariaLabel={"Filter"} />
      <h1 className={"title"}>{title}</h1>
      <GiveawayHeader
        handleSearch={handleSearch}
        autoLoad={autoLoad}
        searchValue={search}
        handleLoadType={handleLoadType}
      />
      <GiveawayList
        giveaways={giveaways}
        totalGiveaways={totalGiveaways}
        deleteSingleGiveaway={deleteSingleGiveaway}
      />

      <Pagination
        totalPages={Math.round(totalGiveaways / 24 || 1)}
        currentlySelected={parseInt(pageId) || 1}
        hide={autoLoad || totalGiveaways < 24}
        handleDelete={deleteGiveaways}
      />
      <style jsx>{stylesheet}</style>
    </main>
  );
}
GiveawayContainer.propTypes = {
  giveaways: array.isRequired,
  deleteSingleGiveaway: func.isRequired,
  setFilter: func.isRequired,
  title: string.isRequired,
  fetchGiveaways: func.isRequired,
  deleteGiveaways: func.isRequired,
  totalGiveaways: number,
  router: object.isRequired,
  showHideFAB: func.isRequired,
  filter: object.isRequired
};
export default connect(
  ({ giveaways }) => ({
    giveaways: giveaways.items,
    totalGiveaways: giveaways.totalGiveaways,
    filter: giveaways.filter
  }),
  {
    setFilter,
    showHideFAB,
    fetchGiveaways,
    deleteSingleGiveaway,
    deleteGiveaways
  }
)(GiveawayContainer);
