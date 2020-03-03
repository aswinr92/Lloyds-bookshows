import React from "react";
import { mount } from "enzyme";
import App from "./App";

describe("App", () => {
  it("should render the component", () => {
    const component = mount(<App />);
    expect(component.find("header").length).toEqual(1);
  });
});
