import React from 'react';

import classes from './Table.css';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';
import TableFooter from './TableFooter/TableFooter';
import TableCaption from './TableCaption/TableCaption';

const table = (props) => {
    return (
        <div className={classes.RespTable}>
            <TableCaption caption={props.caption} />

            <TableHeader
                headerCells={props.headerCells}
                sortedUporDown={props.sortedUporDown}/>

            <TableBody data={props.data} />

            <TableFooter footerCells={props.footerCells} show={props.showFooter} />
        </div>
    );
};

export default table;