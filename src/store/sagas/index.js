import { takeEvery, all, takeLatest, take, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE } from 'react-router-redux';

import * as actionTypes from "../actions/actionTypes";
import * as sagas from "./machine";

export function* watchMachine() {
    yield all([
        takeEvery(actionTypes.FETCH_MACHINES, sagas.fetchMachinesSaga),
        takeEvery(actionTypes.SORT_MACHINES_UPDATE_URL, sagas.sortMachinesSaga),
        takeEvery(actionTypes.FILTER_MACHINES_UPDATE_URL, sagas.filterMachinesSaga),
        takeEvery(actionTypes.FETCH_MACHINE_DETAIL, sagas.fetchMachineDetailSaga)
    ]);
}

export function* watchNewEvents() {
    const watcher = yield takeLatest(actionTypes.FETCH_EVENTS, sagas.fetchNewEventsSaga);

    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}
