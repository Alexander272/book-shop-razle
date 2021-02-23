import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import classes from './adminLink.module.scss'

export const AdminLink = ({ link, text, icon = null }) => {
    return (
        <div className={classes.container}>
            <Link to={link} className={classes.link}>
                {icon && <FontAwesomeIcon className={classes.icon} icon={icon} />}{' '}
                <span className={classes.devider} /> {text}
            </Link>
        </div>
    )
}
