import React from 'react';
import { Link } from 'react-router-dom';

import classes from '../../Table.css';

export const tableBodyCell = (props) => {
    const cell = props.index === 0 ? <Link to={'/machines/' + props.val}>{props.val}</Link>
        : <div>{props.val}</div>
    return (
        <div className={classes.TableBodyCell}>
            {cell}
        </div>
    );
};

export default tableBodyCell;