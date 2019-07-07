import React, { useState } from "react";

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
function Home(props) {
  let [modal, setModal] = useState(
    !!props.router.query.giveaway || !!props.router.query.winners
  );
  const { router } = props;
  const { giveaway, winners } = router.query;

  const _closeModal = () => {
    setModal(false);
    router.replace("/");
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "300px",
      padding: winners ? "5px" : "0",
      textAlign: winners ? "center" : "initial",
      zIndex: 10,
      border: winners && "1px solid rgba(0,0,0,0.25)",
      borderRadius: "0",
      background: winners && "rgb(255, 255, 255)"
    },
    overlay: {
      zIndex: 10
    }
  };

  return (
    <React.Fragment>
      <Head
        title={
          giveaway
            ? giveaway.name
            : "List of all updated open Amazon Giveaways - Amazon Giveaway List"
        }
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
        <Modal style={customStyles} isOpen={modal} onRequestClose={_closeModal}>
          {giveaway && (
            <GiveawayList
              giveaways={[giveaway]}
              deleteSingleGiveaway={() => {}}
              totalGiveaways={1}
            />
          )}
          {winners && (
            <React.Fragment>
              <h4>Giveaway Ended</h4>
              {winners.length >= 1 ? (
                <React.Fragment>
                  <h5>Winners</h5>
                  <ol className="winners">
                    {winners.map((winner, idx) => (
                      <li className="name" key={idx}>
                        {winner}
                      </li>
                    ))}
                  </ol>
                </React.Fragment>
              ) : (
                <h5>Time Expired. No Winners</h5>
              )}
            </React.Fragment>
          )}
        </Modal>
        <GiveawayContainer title={"All Giveaways"} router={router} />
      </div>
    </React.Fragment>
  );
}
Home.propTypes = {
  router: object.isRequired
};

export default withRouter(Home);
