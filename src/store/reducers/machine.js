import { orderBy, isEmpty } from 'lodash';

import * as actionTypes from '../actions/actionTypes';
import { updateObject, getFilterdResult } from '../../shared/utility';

const initialState = {
    machines: [],
    tmpMachines: [],
    loading: false,
    events: []
};

// all reducers here

// fetch machine start from server
const fetchMachinesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

// when fetch machines success from server
const fetchMachinesSuccess = (state, action) => {
    return updateObject(state, {
        machines: action.machines,
        tmpMachines: action.machines,
        loading: false
    });
};

// when fail to fetch machines from server
const fetchMachinesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

// fetch machine start from server
const fetchMachineDetailStart = (state, action) => {
    return updateObject(state, { loading: true });
};

// when fetch machines success from server
const fetchMachineDetailSuccess = (state, action) => {
    return updateObject(state, {
        machine: action.machine,
        loading: false
    });
};

// when fail to fetch machines from server
const fetchMachineDetailFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

// to sort machines as asc or desc order
const sortMachines = (state, action) => {
    let machines = state.machines;
    machines = orderBy(machines, [action.colName], [action.sortType]); // Use Lodash to sort array by property

    return updateObject(state, {
        machines: machines
    });
};

// to filter machines data
const filterMachines = (state, action) => {
    let machines = { ...state.tmpMachines };
    machines = getFilterdResult(machines, action.val)

    machines = isEmpty(action.val) ?
        state.tmpMachines : machines;

    return updateObject(state, {
        machines: machines
    });
};

// fetch events start from server
const fetchEventsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

// when fetch events success from server
const fetchEventsSuccess = (state, action) => {

    return updateObject(state, {
        events: action.events,
        loading: false
    });
};

// when fail to fetch events from server
const fetchEventsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const addNewEvent = (state, action) => {
    const events = state.events;
    const index = events.findIndex(e => e.machine_id === action.event.machine_id);

    if (index === -1) events.push(action.event);
    else events[index] = action.event;

    return updateObject(state, {
        events: events
    });
};

const fetchEvents = (state, action) => {
    return state;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // fetch machines from server 
        case actionTypes.FETCH_MACHINES_START: return fetchMachinesStart(state, action);
        case actionTypes.FETCH_MACHINES_SUCCESS: return fetchMachinesSuccess(state, action);
        case actionTypes.FETCH_MACHINES_FAIL: return fetchMachinesFail(state, action);
        // to sort and filter machines
        case actionTypes.SORT_MACHINES: return sortMachines(state, action);
        case actionTypes.FILTER_MACHINES: return filterMachines(state, action);
        // fetch machine detail from server
        case actionTypes.FETCH_MACHINE_DETAIL_START: return fetchMachineDetailStart(state, action);
        case actionTypes.FETCH_MACHINE_DETAIL_FAIL: return fetchMachineDetailFail(state, action);
        case actionTypes.FETCH_MACHINE_DETAIL_SUCCESS: return fetchMachineDetailSuccess(state, action);
        // fetch events from server
        case actionTypes.FETCH_EVENTS_START: return fetchEventsStart(state, action);
        case actionTypes.FETCH_EVENTS_SUCCESS: return fetchEventsSuccess(state, action);
        case actionTypes.FETCH_EVENTS_FAIL: return fetchEventsFail(state, action);
        case actionTypes.ADD_NEW_EVENT: return addNewEvent(state, action);
        case actionTypes.FETCH_EVENTS: return fetchEvents(state, action);

        default: return state;
    }
};

export default reducer;