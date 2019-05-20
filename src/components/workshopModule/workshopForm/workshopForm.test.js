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

  it("Should handle category select and update state", () => {
    const select = wrapper.find("select[name='categorySelected']");

    select.simulate("change", {
      target: { name: "categorySelected", value: 2 }
    });

    expect(wrapper.find("select[name='categorySelected']")).toHaveLength(1);
    expect(wrapper.state("categorySelected")).toBe(2);
  });

  xit("Should handle start time input and update state", () => {
    const input = wrapper.find("input[name='startTime']");

    input.simulate("change", { target: { name: "startTime", value: "10:00" } });

    expect(wrapper.find("input[name='startTime']")).toHaveLength(1);
    expect(wrapper.state("startTime")).toBe("10:00");
  });

  xit("Should handle end time input and update state", () => {
    const input = wrapper.find("input[name='endTime']");

    input.simulate("change", { target: { name: "endTime", value: "13:00" } });

    expect(wrapper.find("input[name='endTime']")).toHaveLength(1);
    expect(wrapper.state("endTime")).toBe("13:00");
  });

  it("Should handle location select and update state", () => {
    const select = wrapper.find("select[name='location']");

    select.simulate("change", {
      target: { name: "location", value: 5 }
    });

    expect(wrapper.find("select[name='location']")).toHaveLength(1);
    expect(wrapper.state("location")).toBe(5);
  });

  it("Should handle room input and update state", () => {
    const input = wrapper.find("input[name='room']");

    input.simulate("change", { target: { name: "room", value: "Black" } });

    expect(wrapper.find("input[name='room']")).toHaveLength(1);
    expect(wrapper.state("room")).toBe("Black");
  });

  it("Should handle link input and update state", () => {
    const input = wrapper.find("input[name='link']");

    input.simulate("change", {
      target: { name: "link", value: "https://www.webex.com/" }
    });

    expect(wrapper.find("input[name='link']")).toHaveLength(1);
    expect(wrapper.state("link")).toBe("https://www.webex.com/");
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
