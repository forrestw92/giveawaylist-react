import React, { Component } from "react";
import Link from "next/link";
import { number } from "prop-types";
import stylesheet from "./styles.css";
export default class Pageination extends Component {
  render() {
    const { totalPages, currentlySelected } = this.props;
    const SEPERATOR = "...",
      NEXT = "Next",
      BACK = "Back";
    const genPages = () => {
      const lowestSelection = 1;
      const highestSelection = Math.ceil(totalPages);
      const renderLowAmmount = 3;
      const renderHighAmmount = highestSelection - 2;
      const renderItems = [
        {
          id: 0,
          disabled: currentlySelected === 1,
          text: BACK,
          render: currentlySelected > 1
        },
        {
          id: 1,
          disabled: false,
          text: "1",
          render: currentlySelected > renderLowAmmount
        },
        {
          id: 2,
          disabled: true,
          text: SEPERATOR,
          render: currentlySelected > 1
        },
        {
          id: 3,
          disabled: currentlySelected === 1,
          text:
            currentlySelected <= renderLowAmmount ? "1" : currentlySelected - 1,
          render: currentlySelected < renderHighAmmount
        },
        {
          id: 4,
          disabled: currentlySelected !== 3 && currentlySelected !== 1,
          text:
            currentlySelected === 3
              ? "2"
              : currentlySelected === 1
                ? currentlySelected + 1
                : currentlySelected,
          render: true
        },
        {
          id: 5,
          disabled: currentlySelected === 3,
          text:
            currentlySelected === 3 || currentlySelected === 1
              ? "3"
              : currentlySelected + 1,
          render: true
        },
        {
          id: 6,
          disabled: false,
          text:
            currentlySelected === renderLowAmmount
              ? "4"
              : currentlySelected === renderHighAmmount
                ? highestSelection
                : "",
          render:
            currentlySelected === renderLowAmmount ||
            currentlySelected === renderHighAmmount
        },
        {
          id: 7,
          disabled: true,
          text: SEPERATOR,
          render:
            currentlySelected <= renderHighAmmount ||
            currentlySelected === renderHighAmmount
        },
        { id: 8, disabled: false, text: highestSelection, render: true },
        {
          id: 9,
          disabled: false,
          text: NEXT,
          render:
            currentlySelected >= 1 && currentlySelected !== renderHighAmmount
        }
      ];
      return renderItems;
    };
    return (
      <ul className={stylesheet["pageination"]}>
        {genPages()
          .filter(item => item.render)
          .map(item => (
            <li
              key={item.id}
              className={
                item.disabled ? stylesheet["disabled"] : stylesheet["page"]
              }
            >
              {item.disabled ? (
                item.text
              ) : (
                <Link
                  href={`?pageId=${
                    item.text === BACK
                      ? currentlySelected - 1
                      : item.text === NEXT
                        ? currentlySelected + 1
                        : item.text.toString()
                  }`}
                >
                  <a onClick={() => this.props.deleteGiveaways()}>
                    {item.text.toString()}
                  </a>
                </Link>
              )}
            </li>
          ))}
      </ul>
    );
  }
}
Pageination.propTypes = {
  totalPages: number.isRequired,
  currentlySelected: number.isRequired
};
