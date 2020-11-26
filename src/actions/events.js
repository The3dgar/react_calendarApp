import Swal from "sweetalert2";
import { fetchWithToken } from "../helper/fetch";
import { prepareEvents } from "../helper/prepareEvents";
import { types } from "../types/types";

// disparar si se graba en la base de datos
export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchWithToken("/events", event, "POST");
      const body = await resp.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("events");
      const body = await resp.json();
      console.log(body);
      const events = prepareEvents(body.events);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`/events/${event.id}`, event, "PUT");
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartDelete = (event) => {
  return async (dispatch, getState) => {
    const { activeEvent: event } = getState().calendar;
    try {
      const resp = await fetchWithToken(`/events/${event.id}`, event, "DELETE");
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventDeleted(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventLogout = () => ({
  type: types.eventLogout
})
