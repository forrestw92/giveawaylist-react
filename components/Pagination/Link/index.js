import React from "react";
import PropTypes, { number, func, string } from "prop-types";
import Link from "next/link";
import stylesheet from "./index.css";
function PageLink(props) {
  const { page, currentlySelected, handleDelete } = props;
  const SEPARATOR = "...";
  const BACK = "Back";
  const NEXT = "Next";
  const ariaLabel = () => {
    if (page === SEPARATOR) {
      return undefined;
    }
    if (!isNaN(page)) {
      return `Page ${page}`;
    }
    if (page === currentlySelected) {
      return `Current Page, Page ${page}`;
    }
    return `${page} Page`;
  };
  const buildClasses = () => {
    if (page === SEPARATOR) {
      return "separator";
    }
    if (!isNaN(page)) {
      if (page === currentlySelected) {
        return "disabled";
      }
      return "page";
    }
    return "backNext";
  };
  const buildPageNumber = () => {
    if (page === BACK) {
      return currentlySelected - 1;
    }
    if (page === NEXT) {
      return currentlySelected + 1;
    }
    return page;
  };
  return (
    <li
      aria-current={page === currentlySelected ? true : undefined}
      aria-label={ariaLabel()}
      rel={page === BACK ? "prev" : page === NEXT ? "next" : undefined}
      className={buildClasses()}
    >
      {page !== SEPARATOR ? (
        <Link shallow href={`?pageId=${buildPageNumber()}`}>
          <a className={"link"} onClick={() => handleDelete()}>
            {page}
          </a>
        </Link>
      ) : (
        page
      )}
      <style jsx>{stylesheet}</style>
    </li>
  );
}
PageLink.propTypes = {
  page: PropTypes.oneOfType([string, number]).isRequired,
  currentlySelected: number.isRequired,
  handleDelete: func.isRequired
};
export default PageLink;
