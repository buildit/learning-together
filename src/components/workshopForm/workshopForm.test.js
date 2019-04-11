import React from "react";
import WorkshopFormComponent from "./workshopForm";
import { shallow } from "enzyme";

describe("workshop Form tests", () => {
  const wrapper = shallow(<WorkshopFormComponent />);

  it("should render workshopForm component", () => {
    expect(wrapper.length).toBe(1);
  });

  it("Should handle name input and update state", () => {
    const input = wrapper.find("input[name='name']");

    input.simulate("change", { target: { name: "name", value: "React" } });

    expect(wrapper.find("input[name='name']")).toHaveLength(1);
    expect(wrapper.state("name")).toBe("React");
  });

  it("Should handle link input and update state", () => {
    const input = wrapper.find("input[name='link']");

    input.simulate("change", {
      target: { name: "link", value: "https://www.google.com/" }
    });

    expect(wrapper.find("input[name='link']")).toHaveLength(1);
    expect(wrapper.state("link")).toBe("https://www.google.com/");
  });

  it("Should handle description input and update state", () => {
    const input = wrapper.find("textarea[name='description']");

    input.simulate("change", {
      target: {
        name: "description",
        value: "Learn all about building components"
      }
    });

    expect(wrapper.find("textarea[name='description']")).toHaveLength(1);
    expect(wrapper.state("description")).toBe(
      "Learn all about building components"
    );
  });
});
