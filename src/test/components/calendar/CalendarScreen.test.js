import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helper/calendar-messages-es";
import { types } from "../../../types/types";
import { eventSetActive } from "../../../actions/events";
import { act } from "react-dom/test-utils";

jest.mock("../../../actions/events", () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn()
}));
Storage.prototype.setItem = jest.fn()

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: "ABC123",
    name: "Edgar",
  },
  ui: {
    modalOpen: false,
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("testing in <CalendarScreen/>", () => {
  test("should snap correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('test with calendar interactions', () => {
    const calendar = wrapper.find("Calendar")

    const calendarMessages = calendar.prop("messages")
    expect(calendarMessages).toEqual(messages)
    
    calendar.prop("onDoubleClickEvent")()
    expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal})

    calendar.prop("onSelectEvent")({start: "Hello world"})
    expect(eventSetActive).toHaveBeenCalledWith({start: "Hello world"})
    act(()=>{
      calendar.prop("onView")("week")
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week")
    })


  })
  
});
