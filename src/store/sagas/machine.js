import { put, take, call } from "redux-saga/effects";
import queryString from 'query-string';
import { startCase, toLower } from 'lodash';
import moment from 'moment';

import axios from "../../axios-machines";
import * as actions from "../actions";
import * as socketSaga from './socket';

export function* fetchMachineDetailSaga(action) {
  // dispatch fetch machine start action
  yield put(actions.fetchMachineDetailStart());

  try {
    // retrieve data from server
    const response = yield axios.get("/api/v1/machines/" + action.value);
    const result = response.data.data;
    const error = response.data.error;

    const modifiedResult = {
      id: result.id,
      status: startCase(toLower(result.status)),
      machine_type: startCase(toLower(result.machine_type)),
      longitude: result.longitude,
      latitude: result.latitude,
      last_maintenance: moment(result.last_maintenance).format('DD/MM/YYYY'),
      install_date: moment(result.install_date).format('DD/MM/YYYY'),
      floor: result.floor,
      events: result.events.map(e => {
        return {
          timestamp: moment(e.timestamp).format('DD/MM/YYYY'),
          status: startCase(toLower(e.status)),
        }
      })
    };

    // dispatch fetch machine success action with payload
    yield put(actions.fetchMachineDetailSuccess(modifiedResult));

    // checking error to throw an exception
    if (error) {
      throw error;
    }

  } catch (error) {
    // dispatch fetch machines fail action with error payload
    yield put(actions.fetchMachineDetailFail(error));
  }
}

export function* fetchMachinesSaga(action) {
  // dispatch fetch machine start action
  yield put(actions.fetchMachinesStart());

  try {
    // retrieve data from server
    const response = yield axios.get("/api/v1/machines");
    const results = response.data.data;
    const error = response.data.error;

    // checking error to throw an exception
    if (error) {
      throw error;
    }

    const fetchedMachines = [];

    // add results formatting data
    for (let key in results) {
      fetchedMachines.push({
        ...{
          id: results[key].id,
          status: startCase(toLower(results[key].status)),
          machine_type: startCase(toLower(results[key].machine_type)),
          longitude: results[key].longitude,
          latitude: results[key].latitude,
          last_maintenance: moment(results[key].last_maintenance).format('DD/MM/YYYY'),
          install_date: moment(results[key].install_date).format('DD/MM/YYYY'),
          floor: results[key].floor,
        }
      });
    }

    // dispatch fetch machines success action with payload
    yield put(actions.fetchMachinesSuccess(fetchedMachines));

    // parsing values from query string url
    const values = yield queryString.parse(action.values);

    // dispatch filter machines action with payload
    yield put(actions.filterMachines(values.filter));

    // dispatch sort machines actions by sort value from query string with payload
    yield put(actions.sortMachines(values.sortBy, values.sort));

  } catch (error) {
    // dispatch fetch machines fail action with error payload
    yield put(actions.fetchMachinesFail(error));
  }
}

export function* sortMachinesSaga(action) {
  // dispatch sort machine asc or desc action
  yield put(actions.sortMachines(action.colName, action.sortType));

  // update url
  yield action.history.push('/machines?sort=' + action.sortType + '&sortBy=' + action.colName)
}

export function* filterMachinesSaga(action) {
  // dispatch fitler machines action
  yield put(actions.filterMachines(action.val));

  // update url
  yield action.history.push('/machines?filter=' + action.val)
}


export function* fetchNewEventsSaga() {
  const socket = yield call(socketSaga.connectToSocket);
  const channel = yield call(socketSaga.joinChannel, socket, 'events');

  const socketChannel = yield call(socketSaga.createSocketChannel, channel, 'new');

  while (true) {
    const action = yield take(socketChannel);
    yield put(actions.addNewEvent(action));
  }
}
