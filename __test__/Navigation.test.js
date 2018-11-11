/* eslint-env jest */

import { render } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import Router from "next/router";
import { Navigation } from "../components/Navigation";
const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe("With Enzyme", () => {
  it("Navigation Has Logo", () => {
    jest.mock("next/router");
    const app = render(<Navigation currentPage={"/"} loggedIn={false} />);
    expect(app.find("img").attr("src")).toEqual("../../static/logo.svg");
  });
});

describe("With Snapshot Testing", () => {
  it("Navigation Has Logo", () => {
    const component = renderer.create(
      <Navigation currentPage={"/"} loggedIn={false} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
