import React from 'react';

import classes from '../Table.css';

export const tableCaption = (props) => {
    return (
        <div className={classes.RespTableCaption} >
            {props.caption}
        </div>
    );
};

export default tableCaption;