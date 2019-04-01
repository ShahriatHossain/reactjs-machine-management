import React from 'react';

import classes from '../Table.css';
import TableHeaderCell from './TableHeaderCell/TableHeaderCell';

export const tableHeader = (props) => {
    // adding header cell 
    const cells = props.headerCells.map((c, i) => (
        <TableHeaderCell
            key={i}
            val={c.label}
            isFilterAble={c.isFilterAble}
            isSortAble={c.isSortAble}
            sortedUp={() => props.sortedUporDown(c.name, 'desc')}
            sortedDown={() => props.sortedUporDown(c.name, 'asc')} />
    ));

    return (
        <div className={classes.RespTableHeader}>
            {cells}
        </div>
    );
};

export default tableHeader;