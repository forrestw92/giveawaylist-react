import React from "react";
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

class GiveawayContainer extends React.Component {
  state = {
    search: "",
    loading: false,
    autoLoad: false
  };
  handleLoadType = e => {
    if (e.target.id === "autoLoad") {
      this.setState({ autoLoad: true });
      document.getElementsByTagName("html")[0].className = "height";
    } else {
      this.setState({ autoLoad: false });
      document.getElementsByTagName("html")[0].className = "";
    }
  };
  handleSearch = e => {
    e.preventDefault();

    this.setState({ search: e.target.value }, () => {
      this.props.setFilter({ search: this.state.search });
      this.props.deleteGiveaways();
      this.delayfetchGiveaways();
    });
  };
  loadGiveaways = () => {
    if (this.state.loading) return;
    this.setState({ loading: true });
    this.props.fetchGiveaways().then(() => {
      this.setState({ loading: false });
    });
  };
  replacePageID = () => {
    const { push, pathname, query } = this.props.router;
    push(
      `${pathname}?pageId=${(parseInt(query.pageId) || 1) + 1}`,
      `${pathname}?pageId=${(parseInt(query.pageId) || 1) + 1}`,
      {
        shallow: true
      }
    );
  };
  handleScroll = () => {
    if (!this.state.autoLoad) return;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      if (this.state.loading === false) {
        this.replacePageID();
      }
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", debounce(this.handleScroll, 100));
    if (process.browser && this.props.giveaways.length === 0) {
      this.loadGiveaways();
    }
    this.delayfetchGiveaways = debounce(function() {
      this.props.fetchGiveaways();
    }, 500);
  }
  componentWillUnmount() {
    this.props.deleteGiveaways();
  }

  componentDidUpdate(prevProps) {
    const { query, pathname } = this.props.router;
    if (
      query.pageId !== prevProps.router.query.pageId ||
      pathname !== prevProps.router.pathname
    ) {
      this.props.deleteGiveaways();
      this.loadGiveaways();
    }
  }
  _onClick = () => {
    this.props.showHideFAB();
  };
  render() {
    const {
      giveaways,
      deleteSingleGiveaway,
      deleteGiveaways,
      title,
      totalGiveaways,
      router
    } = this.props;
    const { pageId } = router.query;
    return (
      <main role="main" className={"giveawayContainer"}>
        <FAB
          _onClick={() => this._onClick()}
          className={"fab"}
          ariaLabel={"Filter"}
        />
        <h1 className={"title"}>{title}</h1>
        <GiveawayHeader
          handleSearch={this.handleSearch}
          autoLoad={this.state.autoLoad}
          searchValue={this.state.search}
          handleLoadType={this.handleLoadType}
        />
        <GiveawayList
          giveaways={giveaways}
          totalGiveaways={totalGiveaways}
          deleteSingleGiveaway={deleteSingleGiveaway}
        />
        <Pagination
          totalPages={totalGiveaways / 24 || 1}
          currentlySelected={parseInt(pageId) || 1}
          hide={this.state.autoLoad || totalGiveaways < 24}
          handleDelete={deleteGiveaways}
        />
        <style jsx>{stylesheet}</style>
      </main>
    );
  }
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
  showHideFAB: func.isRequired
};
export default connect(
  ({ giveaways }) => ({
    giveaways: giveaways.items,
    totalGiveaways: giveaways.totalGiveaways
  }),
  {
    setFilter,
    showHideFAB,
    fetchGiveaways,
    deleteSingleGiveaway,
    deleteGiveaways
  }
)(GiveawayContainer);
