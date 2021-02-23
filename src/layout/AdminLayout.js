import React from 'react'
import { AdminNavbar } from '../components/AdminNavbar/AdminNavbar'
import classes from '../styles/admin.module.scss'

export const AdminLayout = ({ children, active = 'Статистика' }) => {
    return (
        <div className={'wrapper'}>
            <div className={'container'}>
                <div className={classes.content}>
                    <AdminNavbar active={active} />
                    {children}
                </div>
            </div>
        </div>
    )
}
