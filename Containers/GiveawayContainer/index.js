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
class GiveawayContainer extends React.Component {
  state = {
    search: ""
  };
  handleSearch = e => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };

  componentDidMount() {
    const { query, pathname } = this.props.router;

    if (process.browser) {
      this.props.fetchGiveaways(query.pageId || 1, pathname);
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
      this.props.fetchGiveaways(query.pageId || 1, pathname);
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

    return (
      <main role="main" className={stylesheet.giveawayContainer}>
        <h1 className={stylesheet.title}>{title}</h1>
        <GiveawayHeader
          handleSearch={this.handleSearch}
          searchValue={this.state.search}
        />
        <GiveawayList
          giveaways={giveaways}
          deleteSingleGiveaway={deleteSingleGiveaway}
        />
        <Pagination
          totalPages={totalGiveaways / 24}
          currentlySelected={parseInt(router.query.pageId) || 1}
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
