import React from 'react'
import { useSelector } from 'react-redux'
import { faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { AdminLink } from '../../../components/AdminLink/AdminLink'
import { AdminLayout } from '../../../layout/AdminLayout'
import { ErrorLayout } from '../../../layout/ErrorLayout'
import classes from '../../../styles/admin.module.scss'

export default function AdminUsers() {
    const role = useSelector(state => state.user.role)

    if (role !== 'admin' && role !== 'owner') return <ErrorLayout />

    return (
        <AdminLayout active="Пользователи">
            <div className={classes.container}>
                <h1 className={classes.title}>Пользователи</h1>
                <AdminLink
                    link="/admin/users/add"
                    text="Добавить пользователя"
                    icon={faPlusCircle}
                />
                <AdminLink link="/admin/users/all" text="Список пользователей" icon={faUser} />
            </div>
        </AdminLayout>
    )
}
