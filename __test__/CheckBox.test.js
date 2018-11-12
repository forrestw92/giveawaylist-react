/* eslint-env jest */

import { shallow, render } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import Router from "next/router";
import CheckBox from "../components/CheckBox";
const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe("CheckBox Component", () => {
  const appShallow = shallow(
    <CheckBox
      _onChange={() => {}}
      label={"Hide Books"}
      name={"hideBooks"}
      id={"hideBooks"}
    />
  );
  const appRender = render(
    <CheckBox
      _onChange={() => {}}
      label={"Hide Books"}
      name={"hideBooks"}
      id={"hideBooks"}
    />
  );
  it("has Label", () => {
    expect(appShallow.find("label").text()).toEqual("Hide Books");
  });
  it("has Checkbox", () => {
    expect(appShallow.find("input").hasClass("checkbox")).toBe(true);
  });
  it("has Attr Name", () => {
    expect(appRender.find(".checkbox").attr("name")).toEqual("hideBooks");
  });
  it("has Attr ID", () => {
    expect(appRender.find(".checkbox").attr("id")).toEqual("hideBooks");
  });
});
describe("CheckBox Component Snapshot", () => {
  it("Renders", () => {
    const component = renderer.create(
      <CheckBox
        _onChange={() => {}}
        label={"Hide Books"}
        name={"hideBooks"}
        id={"hideBooks"}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
