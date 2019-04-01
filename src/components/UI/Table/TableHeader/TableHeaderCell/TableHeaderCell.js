import React from 'react';

import classes from '../../Table.css';

export const tableHeaderCell = (props) => {
    let cell = '';

    // checking header cell is sortable or not
    // if sortable then enable sort feature
    if (props.isSortAble) {
        cell = <div className={classes.Column2}>
            <div><i className={classes.Up} onClick={props.sortedDown}></i></div>
            <div><i className={classes.Down} onClick={props.sortedUp}></i></div>
        </div>
    }
    return (
        <div className={classes.TableHeaderCell}>
            <div className={classes.Row}>
                <div className={classes.Column2}>{props.val}</div>
                {cell}
            </div>
        </div>
    );
};

export default tableHeaderCell;