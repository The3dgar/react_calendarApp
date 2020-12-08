import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";
import Swal from "sweetalert2";

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn()
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe("testing in <LoginScreen/>", () => {

  beforeEach(()=>{
    jest.clearAllMocks()
  })
  test("should snap correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch login", () => {
    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startLogin).toHaveBeenCalledWith("edgarolivar16@gmail.cl", "123456");
  });

  test("should dispatch error if password1 != password2", async () => {
    // start register dont be called

    // swal.fire called with "Warning", "Passwords dont match", "warning"

    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "p1",
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "p2",
      },
    });
    expect(wrapper).toMatchSnapshot();
    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });

    expect(startRegister).toBeCalledTimes(0);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Warning",
      "Passwords dont match",
      "warning"
    );
  });

  test('should dispatch register with the same password', () => {
    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "1234567",
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "1234567",
      },
    });
    expect(wrapper).toMatchSnapshot();
    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });

    expect(startRegister).toBeCalled();
    expect(Swal.fire).not.toHaveBeenCalled()
  })
  
});
