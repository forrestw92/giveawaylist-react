/* eslint-env jest */

import { render } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import Router from "next/router";
import { Navigation } from "../components/Navigation";
const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe("Navigation Component", () => {
  it("Has Logo", () => {
    jest.mock("next/router");
    const app = render(<Navigation currentPage={"/"} loggedIn={false} />);
    expect(app.find("img").attr("src")).toEqual("../../static/logo.svg");
  });
  it("Has Default Nav items", () => {
    jest.mock("next/router");
    const app = render(<Navigation currentPage={"/"} loggedIn={false} />);
    expect(app.find("li").length).toEqual(4);
  });
  it("Active Item Has Active Class", () => {
    jest.mock("next/router");
    const app = render(<Navigation currentPage={"/ending"} loggedIn={false} />);
    expect(app.find("li a.active").attr("href")).toEqual("/ending");
  });
});

describe("Navigation Component Snapshot", () => {
  it("Renders", () => {
    const component = renderer.create(
      <Navigation currentPage={"/"} loggedIn={false} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
