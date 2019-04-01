import * as actionTypes from "./actionTypes";

// all action creators here

// for machines fetch success from server
export const fetchMachinesSuccess = machines => ({
  type: actionTypes.FETCH_MACHINES_SUCCESS,
  machines: machines,
  tmpMachines: machines
});

// if machines fetch fail from server
export const fetchMachinesFail = error => ({
  type: actionTypes.FETCH_MACHINES_FAIL,
  error: error
});

// for machines fetch start from server
export const fetchMachinesStart = () => ({
  type: actionTypes.FETCH_MACHINES_START
});

// for machines data fetched from server
export const fetchMachines = (values) => ({
  type: actionTypes.FETCH_MACHINES,
  values
});

// machine fetch success from server
export const fetchMachineDetailSuccess = machine => ({
  type: actionTypes.FETCH_MACHINE_DETAIL_SUCCESS,
  machine: machine
});

// machine fetch fail from server
export const fetchMachineDetailFail = error => ({
  type: actionTypes.FETCH_MACHINE_DETAIL_FAIL,
  error: error
});

// machine fetch start from server
export const fetchMachineDetailStart = () => ({
  type: actionTypes.FETCH_MACHINE_DETAIL_START
});

// for machines data fetched from server
export const fetchMachineDetail = (value) => ({
  type: actionTypes.FETCH_MACHINE_DETAIL,
  value
});

// to sort machines asc order by column name
export const sortMachines = (name, sortType) => ({
  type: actionTypes.SORT_MACHINES,
  colName: name,
  sortType
});

// to update url for sorting machines asc order by column name
export const sortMachinesUpdateUrl = (name, sortType, history) => ({
  type: actionTypes.SORT_MACHINES_UPDATE_URL,
  colName: name,
  sortType,
  history
});

// to filter machines data by search text
export const filterMachines = (val) => ({
  type: actionTypes.FILTER_MACHINES,
  val: val
});

// to filter machines data by search text
export const filterMachinesUpdateUrl = (val, history) => ({
  type: actionTypes.FILTER_MACHINES_UPDATE_URL,
  val: val,
  history
});

// fetch events success
export const fetchEventsSuccess = events => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  events: events
});

// fetch events fail
export const fetchEventsFail = error => ({
  type: actionTypes.FETCH_EVENTS_FAIL,
  error: error
});

// fetch events start
export const fetchEventsStart = () => ({
  type: actionTypes.FETCH_EVENTS_START
});

// fetch events
export const fetchEvents = () => ({
  type: actionTypes.FETCH_EVENTS
});

// check for new events
export const addNewEvent = (event) => ({
  type: actionTypes.ADD_NEW_EVENT,
  event: event
});