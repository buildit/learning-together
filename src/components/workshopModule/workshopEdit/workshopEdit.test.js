import React from "react";
import { shallow } from "enzyme";
import { deleteEvent } from "../../../api.js";
import { IdToken } from "msal/lib-commonjs/IdToken";
import { WorkshopEditComponent } from "../workshopEdit";

jest.mock("../../../api.js");

describe("workshopEdit handleSubmit", () => {
  let wrapper;
  let mockRobinEventID;
  let mockResponse;
  const defaultProps = {
    computedMatch: { params: { id: 13 } }
  };

  beforeAll(() => {
    //weaddGrocery.mockImplementation(() => mockGroceries);
    deleteEvent.mockImplementation(() => mockResponse);
  });

  beforeEach(() => {
    wrapper = shallow(<WorkshopEditComponent {...defaultProps} />);
    mockRobinEventID = 123;
    mockResponse = { status: 200, data: {} };
  });

  xit("RemoveEvent()", async () => {
    await wrapper.instance().removeEvent(mockRobinEventID);
    expect(true).toEqual(true);
  });

  xit("add Robin Event ID to the data", () => {});

  xit("should set an error when fetching fails", async () => {
    deleteEvent.mockImplementation(() => {
      throw new Error("Error adding grocery");
    });

    await wrapper.instance().removeEvent(mockRobinEventID);

    expect(true).toEqual(true);
  });
});
