import React from "react";
import { array, func, string, object, number } from "prop-types";
import stylesheet from "./index.css";
import { connect } from "react-redux";
import {
  deleteGiveaways,
  deleteSingleGiveaway,
  fetchGiveaways
} from "../../Redux/actions/giveawayActions";
import Pagination from "../../components/Pagination";
import GiveawayList from "../../components/GiveawayList";
import GiveawayHeader from "../../components/GiveawayHeader";
import debounce from "lodash/debounce";
class GiveawayContainer extends React.Component {
  state = {
    search: "",
    loading: false,
    autoLoad: false
  };
  handleLoadType = e => {
    if (e.target.id === "autoLoad") {
      this.setState({ autoLoad: true });
    } else {
      this.setState({ autoLoad: false });
    }
  };
  handleSearch = e => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };
  loadGiveaways = async () => {
    if (this.state.loading) return;
    this.setState({ loading: true });
    await this.props.fetchGiveaways().then(() => {
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
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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

  render() {
    const {
      giveaways,
      deleteSingleGiveaway,
      title,
      totalGiveaways,
      router
    } = this.props;
    const { pageId } = router.query;
    return (
      <main role="main" className={stylesheet.giveawayContainer}>
        <h1 className={stylesheet.title}>{title}</h1>
        <GiveawayHeader
          handleSearch={this.handleSearch}
          autoLoad={this.state.autoLoad}
          searchValue={this.state.search}
          handleLoadType={this.handleLoadType}
        />
        <GiveawayList
          giveaways={giveaways}
          deleteSingleGiveaway={deleteSingleGiveaway}
        />
        <Pagination
          totalPages={totalGiveaways / 24 || 1}
          currentlySelected={parseInt(pageId) || 1}
          hide={this.state.autoLoad || totalGiveaways < 24}
        />
      </main>
    );
  }
}
GiveawayContainer.propTypes = {
  giveaways: array.isRequired,
  deleteSingleGiveaway: func.isRequired,
  title: string.isRequired,
  fetchGiveaways: func.isRequired,
  deleteGiveaways: func.isRequired,
  totalGiveaways: number.isRequired,
  router: object.isRequired
};
export default connect(
  ({ giveaways }) => ({
    giveaways: giveaways.items,
    totalGiveaways: giveaways.totalGiveaways
  }),
  {
    fetchGiveaways,
    deleteSingleGiveaway,
    deleteGiveaways
  }
)(GiveawayContainer);
