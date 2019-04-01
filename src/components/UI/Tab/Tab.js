import React from 'react';
import { startCase, toLower, replace } from 'lodash';

import classes from './Tab.css';

// prepare machine details
const getDetail = (data) => {
    const labels = Object.keys(data);
    const details = labels.map((l, i) => {
        let detail = '';
        if (l !== 'events') {
            detail = <div key={i}><strong>{startCase(toLower(replace(l, /_/g, ' ')))}</strong>: {data[l]}</div>
        }
        return detail;
    })

    return details.length > 0 ? details : 'No record found.';
}

// prepare events for machine
const getEvents = (data) => {
    const details = data.events.map((e, i) => {
        const labels = Object.keys(e);
        const events = labels.map((l, i) => (
            <div key={i}><strong>{startCase(toLower(l))}</strong>: {e[l]}</div>
        ))
        return events
    });

    return details.length > 0 ? details : 'No record found.';
}

// prepare live events for machine
const getLiveEvents = (liveEvents, machine) => {
    const details = liveEvents.filter(lv => lv.machine_id === machine.id).map((e, i) => {
        const labels = Object.keys(e);
        const events = labels.map((l, i) => (
            <div key={i}><strong>{startCase(toLower(l))}</strong>: {e[l]}</div>
        ))
        return events
    });

    return details.length > 0 ? details : 'No record found.';
}

const tab = (props) => {
    // generate tabl links
    const tabLinks = props.tabLinks.map(t => {
        const activeClass = props.selectedTab === t.name ? classes.TabActive : '';
        return (
            <button key={t.name} className={activeClass} onClick={() => props.clickTab(t.name)}>{t.label}</button>
        )
    });

    // tab details by tab clicked
    const tabDetails = props.tabLinks.map(td => {
        const style = td.name === props.selectedTab ? 'block' : 'none';
        let details = '';

        if (!props.data) return details;

        switch (td.name) {
            case 'details':
                details = getDetail(props.data);
                break;
            case 'events':
                details = getEvents(props.data);
                break;
            case 'live-events':
                details = getLiveEvents(props.liveEvents, props.data);
                break;
            default:
            //
        }

        return (
            <div key={td.name} className={classes.Tabcontent} style={{ display: style }}>
                {details}
            </div>
        )
    })

    return (
        <div>
            <h4>{props.tabTitle}</h4>
            <p>{props.tabDescription}</p>

            <div className={classes.Tab}>
                {tabLinks}
            </div>

            {tabDetails}
        </div>
    );
}

export default tab;