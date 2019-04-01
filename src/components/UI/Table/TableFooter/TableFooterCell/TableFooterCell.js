import React from 'react';

import classes from '../../Table.css';

export const tableFooterCell = (props) => {
    return (
        <div className={classes.TableFooterCell}>
            {props.val}
        </div>
    );
};

export default tableFooterCell;