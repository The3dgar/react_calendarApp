import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import moment from "moment";
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from "../../../actions/events";
import { act } from "react-dom/test-utils";
import Swal from "sweetalert2";

jest.mock("../../../actions/events", () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minute(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: "Hola Mundo",
      notes: "Hello note",
      start: now.toDate(),
      end: nowPlusOne.toDate(),
    },
  },
  auth: {
    uid: "ABC123",
    name: "Edgar",
  },
  ui: {
    modalOpen: true,
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("testing in <CalendarModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should show the modal", () => {
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("should call update/close modal", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(eventStartUpdate).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("should show error if title is missed", () => {
    //  in this moment title field is empty
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
      true
    );
  });

  test("should create a new event", () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: "ABC123",
        name: "Edgar",
      },
      ui: {
        modalOpen: true,
      },
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hello testing in jest!",
      },
    });

    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(eventStartAddNew).toBeCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      notes: "",
      title: "Hello testing in jest!",
    });
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("should date validate", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hello testing in jest!",
      },
    });

    const today = new Date();
    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(today);
    });

    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(Swal.fire).toHaveBeenCalledWith("Error", "Fin debe ser mayor", "error")
  });
});
