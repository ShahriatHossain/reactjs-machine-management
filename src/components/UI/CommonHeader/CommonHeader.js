import React from 'react';
import { NavLink } from 'react-router-dom';

const commonHeader = (props) => {
    // check title is linkable or not
    let title = props.isLinkAble ? <NavLink
        to={props.url}
        exact
        activeStyle={{
            color: '#fa923f',
            textDecoration: 'underline'
        }}>
        {props.title}
    </NavLink> : <span>{props.title}</span>;

    return (
        <h3>
            <img src={props.icon} alt={props.title} />
            {title}
        </h3>
    )
}

export default commonHeader;