import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faPlusCircle,
    faHome,
    faSignOutAlt,
    faUser,
    faChartBar,
    faListUl,
} from '@fortawesome/free-solid-svg-icons'
import { logout } from '../../store/user/actions'
import classes from './adminNavbar.module.scss'

export const AdminNavbar = ({ active }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const LogoutHandler = async () => {
        dispatch(logout())
        history.push('/')
    }

    return (
        <nav className={classes.nav}>
            <Link to={'/'} className={classes.link}>
                <FontAwesomeIcon icon={faHome} className={classes.icon} />
                Главная
            </Link>
            <Link
                to={'/admin'}
                className={[classes.link, active === 'Статистика' ? classes.active : null].join(
                    ' '
                )}
            >
                <FontAwesomeIcon icon={faChartBar} className={classes.icon} />
                Статистика
            </Link>
            <Link
                to={'/admin/add'}
                className={[classes.link, active === 'Добавить' ? classes.active : null].join(' ')}
            >
                <FontAwesomeIcon icon={faPlusCircle} className={classes.icon} />
                Добавить
            </Link>
            <Link
                to={'/admin/edit'}
                className={[classes.link, active === 'Редактировать' ? classes.active : null].join(
                    ' '
                )}
            >
                <FontAwesomeIcon icon={faPen} className={classes.icon} />
                Редактировать
            </Link>
            <Link
                to={'/admin/genres'}
                className={[classes.link, active === 'Жанры' ? classes.active : null].join(' ')}
            >
                <FontAwesomeIcon icon={faListUl} className={classes.icon} />
                Жанры книг
            </Link>
            <Link
                to={'/admin/users'}
                className={[classes.link, active === 'Пользователи' ? classes.active : null].join(
                    ' '
                )}
            >
                <FontAwesomeIcon icon={faUser} className={classes.icon} />
                Пользователи
            </Link>
            <p onClick={LogoutHandler} className={classes.link}>
                <FontAwesomeIcon icon={faSignOutAlt} className={classes.icon} />
                Выйти из системы
            </p>
        </nav>
    )
}
