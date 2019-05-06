import React from "react";

import { withRouter } from "next/router";
import { object } from "prop-types";

import Head from "../components/head";
import GiveawayContainer from "../Containers/GiveawayContainer";
import FilterContainer from "../Containers/FilterContainer";
import Modal from "react-modal";
import GiveawayList from "../components/GiveawayList";

/**
 * Gets ordinary for number
 * @param {number} n
 * @returns {string} ordinary
 */
function oddsOrdiany(n) {
  let s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
/**
 * Formats odds in a pretty way :)
 * @param {number} odds
 * @param {number} oddsType
 * @returns {string|boolean}
 */
function oddsFormat(odds, oddsType) {
  switch (oddsType) {
    case 1:
    case 5:
      return `${oddsOrdiany(odds)} entry wins`;
    case 2:
    case 6:
      return ` 1 in ${odds} chance`;
    case 3:
    case 7:
      return `Every ${oddsOrdiany(odds)} wins`;
    default:
      return false;
  }
}

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { modal: !!props.router.query.giveaway };
  }
  _closeModal = () => {
    const { router } = this.props;
    this.setState({ modal: false }, () => {
      router.replace("/");
    });
  };
  render() {
    const { router } = this.props;
    const { giveaway } = router.query;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "300px",
        padding: "0",
        zIndex: 10
      },
      overlay: {
        zIndex: 10
      }
    };

    return (
      <React.Fragment>
        <Head
          title={giveaway ? giveaway.name : "Home - Amazon Giveaway List"}
          description={
            giveaway
              ? `Odds: ${oddsFormat(giveaway.odds, giveaway.oddsType) ||
                  "Sweepstakes"}| Requirement: ${giveaway.requirement}`
              : undefined
          }
          ogImage={
            giveaway ? giveaway.picture.replace("._SR160,160_", "") : undefined
          }
        />
        <div className={"content"}>
          <FilterContainer />
          <Modal
            style={customStyles}
            isOpen={this.state.modal}
            onRequestClose={this._closeModal}
          >
            <GiveawayList
              giveaways={[giveaway]}
              deleteSingleGiveaway={() => {}}
              totalGiveaways={1}
            />
          </Modal>
          <GiveawayContainer title={"All Giveaways"} router={router} />
        </div>
      </React.Fragment>
    );
  }
}
Home.propTypes = {
  router: object.isRequired
};

export default withRouter(Home);
