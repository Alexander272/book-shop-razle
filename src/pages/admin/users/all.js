import React, { useState, useEffect, useCallback } from 'react'
import * as axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { AdminLayout } from '../../../layout/AdminLayout'
import { ErrorLayout } from '../../../layout/ErrorLayout'
import { Loader } from '../../../components/Loader/Loader'
import { Toasts } from '../../../components/Toasts/Toasts'
import { PageMeta } from '../../../components/PageMeta/PageMeta'
import classes from '../../../styles/admin.module.scss'

export default function AdminUsersAll() {
    const role = useSelector(state => state.user.role)
    const token = useSelector(state => state.user.token)
    const history = useHistory()
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: 'GET',
                headers: { authorization: `Bearer ${token}` },
                data: null,
                url: '/api/user/all',
            })
            setUsers(response.data)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (role === 'admin' || role === 'owner') fetchUsers()
    }, [fetchUsers])

    if (role !== 'admin' && role !== 'owner') return <ErrorLayout />

    const deleteUser = async event => {
        const id = event.target.dataset.id
        try {
            setLoading(true)
            const response = await axios({
                method: 'POST',
                headers: { authorization: `Bearer ${token}` },
                data: null,
                url: `/api/user/remove/${id}`,
            })
            setSuccess(response.data)

            setUsers(prevState => prevState.filter(user => user._id != id))
            setTimeout(() => {
                setSuccess('')
            }, 5500)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            setErrorDel(e.message)
            setTimeout(() => {
                setErrorDel('')
            }, 5500)
        }
    }

    const updateUser = event => {
        history.push(`/admin/users/${event.target.dataset.id}`)
    }

    return (
        <AdminLayout active="Пользователи">
            <PageMeta title="Все пользователи" />
            <div className={classes.container}>
                {success.length > 0 && <Toasts type={'success'} message={success} />}
                {error.length > 0 && <Toasts type={'error'} message={error} />}
                <h1 className={classes.title}>Все пользователи</h1>
                <div className={classes.form}>
                    {loading ? (
                        <div className={classes.loader}>
                            <Loader size="md" />
                        </div>
                    ) : (
                        <>
                            {users &&
                                users.map(user => {
                                    return (
                                        <div key={user._id} className={classes.itemList}>
                                            <div>
                                                <p>Имя пользователя</p>
                                                <p className={classes.bold}>
                                                    <b>{user.name}</b>
                                                </p>
                                            </div>
                                            <div>
                                                <p>email</p>
                                                <p className={classes.bold}>
                                                    <b>{user.email}</b>
                                                </p>
                                            </div>
                                            <div>
                                                <p>Роль пользователя</p>
                                                <p className={classes.bold}>
                                                    <b>{user.role}</b>
                                                </p>
                                            </div>
                                            <div
                                                onClick={updateUser}
                                                data-id={user._id}
                                                className={[classes.icon, classes.editIcon].join(
                                                    ' '
                                                )}
                                            >
                                                <FontAwesomeIcon
                                                    className={classes.deleteIcon}
                                                    icon={faEdit}
                                                />
                                            </div>
                                            <div
                                                onClick={deleteUser}
                                                data-id={user._id}
                                                className={[classes.icon, classes.trashIcon].join(
                                                    ' '
                                                )}
                                            >
                                                <FontAwesomeIcon
                                                    className={classes.deleteIcon}
                                                    icon={faTrashAlt}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
