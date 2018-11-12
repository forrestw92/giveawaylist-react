/* eslint-env jest */

import { render } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import Router from "next/router";
import Button from "../components/Button";
const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe("Button Component", () => {
  it("Button Renders", () => {
    const app = render(
      <Button
        className={"register"}
        _onClick={() => {}}
        type={"a"}
        label={"test"}
        href={"/"}
      />
    );
    expect(app.hasClass("register")).toBe(true);
    expect(app.text()).toEqual("test");
    expect(app.attr("href")).toEqual("/");
  });
});

describe("Button Component Snapshot", () => {
  it("Renders", () => {
    const component = renderer.create(
      <Button
        className={"register"}
        _onClick={() => {}}
        type={"a"}
        label={"test"}
        href={"/"}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
