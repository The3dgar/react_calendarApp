import Swal from "sweetalert2";
import { fetchWithOutToken, fetchWithToken } from "../helper/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
  // dispatch gracias al thunk
  return async (dispatch) => {
    const resp = await fetchWithOutToken("auth", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      const { token, uid, name } = body;
      localStorage.setItem("token", token);
      localStorage.setItem("token_init", new Date().getTime());

      dispatch(login({ uid, name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchWithOutToken(
      "auth/new",
      { email, password, name },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      const { token, uid, name } = body;
      localStorage.setItem("token", token);
      localStorage.setItem("token_init", new Date().getTime());

      dispatch(login({ uid, name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startLogout = () => {
  return dispatch => {
    localStorage.clear()
    dispatch(eventLogout())
    dispatch(logout())
  }
}

const logout = () => ({type: types.authLogout})

export const startChecking  = ()  => {
  return async dispatch => {
    const token = localStorage.getItem("token")

    if(!token) return dispatch(checkingFinish())
    
    const resp = await fetchWithToken("auth/renew");
    const body = await resp.json();
    if (body.ok) {
      const { token, uid, name } = body;
      localStorage.setItem("token", token);
      localStorage.setItem("token_init", new Date().getTime());

      dispatch(login({ uid, name }));
    } else {
      Swal.fire("Errores", body.msg, "error");
      dispatch(checkingFinish())
    }
  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinish
})