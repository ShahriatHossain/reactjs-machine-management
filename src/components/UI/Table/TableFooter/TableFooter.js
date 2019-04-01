import React from 'react';

import classes from '../Table.css';
import TableFooterCell from './TableFooterCell/TableFooterCell';

export const tableFooter = (props) => {
    const cells = props.footerCells.map((c, i) => (
        <TableFooterCell
            key={i}
            val={c.label} />
    ));

    let footer = '';
    if (props.show) {
        footer = <div className={classes.RespTableFooter}>
            {cells}
        </div>
    }

    return (
        <div>
            {footer}
        </div>
    );
};

export default tableFooter;