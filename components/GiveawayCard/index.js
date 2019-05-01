import React from "react";
import { string, number, func } from "prop-types";
import stylesheet from "./index.css";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardBody from "./CardBody";
import { enterGiveaway, saveGiveaway } from "../../API";
import CardActions from "./CardActions";
import Alert from "../Alert";
class GiveawayCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alert: undefined
    };
  }

  handleEnterClick = (id, giveaway) => {
    enterGiveaway(giveaway)
      .then(res => {
        if (res.data.success) {
          this.props.deleteSingleGiveaway(id);
        }
      })
      //TODO: Handle enter giveaway error
      .catch(error => console.log(error));
  };
  handleSaveClick = (giveaway, event) => {
    event.preventDefault();
    event.stopPropagation();
    saveGiveaway(giveaway)
      .then(res => {
        if (res.data.success) {
          this.setState({
            alert: (
              <Alert
                show={true}
                onDeath={() => this.setState({ alert: undefined })}
                ttl={2}
              >
                <p>Giveaway Saved!</p>
              </Alert>
            )
          });
        }
      })
      //TODO: Handle enter giveaway error
      .catch(({ response }) => {
        const { err, msg } = response.data;
        let alertType = "";
        if (err === "INVALID_AUTHORIZATION") {
          alertType = "danger";
        }
        if (err === "ENTERED_ALREADY") {
          alertType = "info";
        }
        this.setState({
          alert: (
            <Alert
              show={true}
              onDeath={() => this.setState({ alert: undefined })}
              ttl={3}
              alertType={alertType}
            >
              <p>{msg}</p>
            </Alert>
          )
        });
      });
  };
  render() {
    const {
      id,
      picture,
      name,
      requirement,
      odds,
      giveaway,
      addedDate,
      endDate,
      prize,
      category,
      winners,
      enteredCount,
      last_winner,
      oddsType
    } = this.props;
    return (
      <a
        className={"giveawayCard"}
        href={giveaway}
        rel={"nofollow"}
        target={"_blank"}
        onClick={() => this.handleEnterClick(id, giveaway)}
      >
        {this.state.alert}
        <CardHeader
          name={name}
          picture={picture}
          giveawayID={giveaway.replace("https://www.amazon.com/ga/p/", "")}
        />
        <CardBody
          endDate={endDate}
          addedDate={addedDate}
          prize={prize}
          winners={winners}
          odds={odds}
          requirement={requirement}
          category={category || "Uncategorized"}
          oddsType={oddsType}
        />
        <CardFooter last_winner={last_winner} enteredCount={enteredCount} />
        <CardActions
          id={id}
          handleEnterClick={this.handleEnterClick}
          handleSaveClick={this.handleSaveClick}
          giveaway={giveaway}
        />
        <style jsx>{stylesheet}</style>
      </a>
    );
  }
}

GiveawayCard.propTypes = {
  deleteSingleGiveaway: func.isRequired,
  picture: string.isRequired,
  name: string.isRequired,
  requirement: string.isRequired,
  odds: number.isRequired,
  giveaway: string.isRequired,
  isKindle: number.isRequired,
  addedDate: string.isRequired,
  endDate: string.isRequired,
  prize: number.isRequired,
  item: string.isRequired,
  category: string,
  winners: number.isRequired,
  enteredCount: number.isRequired,
  oddsType: number.isRequired,
  id: number.isRequired,
  last_winner: string.isRequired
};
export default GiveawayCard;
