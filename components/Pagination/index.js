/*eslint prettier/prettier:0*/
import React from "react";
import { number, bool, func } from "prop-types";
import stylesheet from "./index.css";
import PageLink from "./Link";

function Pagination(props) {
  const { totalPages, currentlySelected, hide, handleDelete } = props;

  const getPagingRange = (
    current = currentlySelected,
    { min = 1, total = totalPages, length = 3 } = {}
  ) => {
    if (length > total) length = total;

    if (current === 3) {
      length += 1;
    }
    if (current === total - 2) {
      length += 1;
    }

    let start = current - Math.floor(length / 2);
    start = Math.max(start, min);
    start = Math.min(start, min + total - length);

    if (current === total - 2) {
      start = total - 3;
    }
    const pages = Array.from({ length: length }, (el, i) => {
      return start + i;
    });
    if (current <= total - 1) {
      pages.splice(pages.length, 0, "Next");
      pages.splice(
        current <= total - 3 ? pages.length - 1 : pages.length - 1,
        0,
        "..."
      );
    }
    if (current <= total - 3) {
      pages.splice(pages.length - 1, 0, total);
    }
    if (current >= 2) {
      pages.splice(0, 0, "Back");
      pages.splice(1, 0, "...");
    }
    if (current >= 4) {
      pages.splice(1, 0, 1);
    }
    return pages;
  };
  if (!totalPages || totalPages === 1) return "";
  const renderPages = getPagingRange();
  return (
    <nav role="navigation" aria-label="Pagination Navigation" className={"nav"}>
      <ul className={`${"pagination"} ${hide ? "hide" : ""}`}>
        {renderPages.map((item, idx) => {
          return (
            <PageLink
              currentlySelected={currentlySelected}
              handleDelete={handleDelete}
              page={item}
              key={idx}
            />
          );
        })}
      </ul>
      <style jsx>{stylesheet}</style>
    </nav>
  );
}
Pagination.propTypes = {
  totalPages: number.isRequired,
  currentlySelected: number.isRequired,
  hide: bool.isRequired,
  handleDelete: func.isRequired
};

export default Pagination;
