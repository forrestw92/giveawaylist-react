import React, { Component } from "react";
import Link from "next/link";
import { number, func } from "prop-types";
import stylesheet from "./styles.css";
export default class Pagination extends Component {
  render() {
    const { totalPages, currentlySelected } = this.props;
    const SEPARATOR = "...",
      NEXT = "Next >",
      BACK = "< Back";
    const genPages = () => {
      const lowestSelection = 1;
      const highestSelection = Math.ceil(totalPages);
      const renderLowAmmount = 3;
      const renderHighAmmount = highestSelection - 3;
      const renderItems = [
        {
          id: 0,
          disabled: currentlySelected === lowestSelection,
          text: BACK,
          render: currentlySelected > lowestSelection
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
          text: SEPARATOR,
          render: currentlySelected > lowestSelection
        },
        {
          id: 3,
          disabled:
            currentlySelected === lowestSelection ||
            currentlySelected === renderHighAmmount,
          text:
            currentlySelected <= renderLowAmmount
              ? "1"
              : currentlySelected >= renderHighAmmount
                ? currentlySelected
                : currentlySelected - 1,
          render: currentlySelected < renderHighAmmount + 1
        },
        {
          id: 4,
          disabled:
            currentlySelected >= renderHighAmmount
              ? currentlySelected !== renderHighAmmount &&
                currentlySelected <= highestSelection - 2
              : currentlySelected !== 3 &&
                currentlySelected !== lowestSelection &&
                currentlySelected !== renderHighAmmount,
          text:
            currentlySelected === 3
              ? "2"
              : currentlySelected === lowestSelection ||
                currentlySelected === renderHighAmmount
                ? currentlySelected + 1
                : currentlySelected === highestSelection - 1
                  ? currentlySelected - 1
                  : currentlySelected === highestSelection
                    ? currentlySelected - 2
                    : currentlySelected,
          render: true
        },
        {
          id: 5,
          disabled:
            currentlySelected === 3 ||
            currentlySelected === renderLowAmmount ||
            currentlySelected === highestSelection - 1,
          text:
            currentlySelected === 3 || currentlySelected === lowestSelection
              ? "3"
              : currentlySelected >= renderHighAmmount
                ? currentlySelected === highestSelection - 2
                  ? highestSelection - 1
                  : highestSelection - 1
                : currentlySelected + 1,
          render: true
        },
        {
          id: 6,
          disabled: currentlySelected === highestSelection,
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
          text: SEPARATOR,
          render:
            currentlySelected <= renderHighAmmount ||
            currentlySelected === renderHighAmmount
        },
        {
          id: 8,
          disabled: currentlySelected === highestSelection,
          text: highestSelection,
          render: currentlySelected !== renderHighAmmount
        },
        {
          id: 9,
          disabled: false,
          text: NEXT,
          render:
            currentlySelected >= lowestSelection &&
            currentlySelected !== renderHighAmmount + 1 &&
            currentlySelected <= renderHighAmmount
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
                item.text === SEPARATOR && item.disabled
                  ? stylesheet["separator"]
                  : item.disabled
                    ? stylesheet["disabled"]
                    : stylesheet["page"]
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
Pagination.propTypes = {
  totalPages: number.isRequired,
  currentlySelected: number.isRequired,
  deleteGiveaways: func.isRequired
};
