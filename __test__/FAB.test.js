/* eslint-env jest */

import { render } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import Router from "next/router";
import FAB from "../components/FAB";

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe("FAB Component", () => {
  const app = render(
    <FAB
      _onClick={() => {}}
      className={"fab"}
      ariaLabel={"Filter"}
      image={"../../static/icons/filter.svg"}
    />
  );
  it("Has Class", () => {
    expect(app.hasClass("fab")).toBe(true);
  });
  it("Has Aria Label", () => {
    expect(app.attr("aria-label")).toEqual("Filter");
  });
  it("Has Image", () => {
    expect(app.find("svg")).toBeTruthy();
  });
});

describe("FAB Component Snapshot", () => {
  it("Renders", () => {
    const component = renderer.create(
      <FAB
        _onClick={() => {}}
        className={"fab"}
        ariaLabel={"Filter"}
        image={"../../static/icons/filter.svg"}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
