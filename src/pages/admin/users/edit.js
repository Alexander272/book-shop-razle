import React, { useState, useEffect, useCallback } from 'react'
import * as axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../../../components/Button/Button'
import { Input } from '../../../components/Input/Input'
import { Toasts } from '../../../components/Toasts/Toasts'
import { Loader } from '../../../components/Loader/Loader'
import { PageMeta } from '../../../components/PageMeta/PageMeta'
import { AdminLayout } from '../../../layout/AdminLayout'
import { ErrorLayout } from '../../../layout/ErrorLayout'
import classes from '../../../styles/admin.module.scss'

export default function AdminUsersAdd() {
    const role = useSelector(state => state.user.role)
    const token = useSelector(state => state.user.token)
    const history = useHistory()
    const id = useParams().id
    const [isOpen, setIsOpen] = useState(false)
    const [form, setForm] = useState({
        _id: null,
        name: '',
        email: '',
        isConfirmed: false,
        role: 'user',
    })
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const variantRole = {
        user: 'Пользователь',
        editor: 'Редактор',
        admin: 'Администратор',
    }

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: 'GET',
                headers: { authorization: `Bearer ${token}` },
                data: null,
                url: `/api/user/all/${id}`,
            })
            setForm(response.data)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (role === 'admin' || role === 'owner') fetchUser()
    }, [fetchUser])

    if (role !== 'admin' && role !== 'owner') return <ErrorLayout />

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const clickHandler = () => {
        setIsOpen(!isOpen)
    }

    const changeRoleHandler = event => {
        setIsOpen(false)
        let role = ''
        Object.values(variantRole).forEach((r, index) => {
            if (r === event.target.textContent) role = Object.keys(variantRole)[index]
        })
        setForm({ ...form, role })
    }

    const createHandler = async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: 'POST',
                headers: { authorization: `Bearer ${token}` },
                data: { ...form },
                url: `/api/user/edit/${form._id}`,
            })
            setSuccess(response.data)
            setLoading(false)
            history.push('/admin/users/all')
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError(e.message)
            setTimeout(() => {
                setError('')
            }, 5500)
        }
    }

    return (
        <AdminLayout active="Пользователи">
            <PageMeta title="Редактировать пользователя" />
            {success && <Toasts type={'success'} message={success} />}
            {error && <Toasts type={'error'} message={error} />}
            <div className={classes.container}>
                <h1 className={classes.title}>Редактировать пользователя</h1>
                <div className={classes.form}>
                    {loading ? (
                        <div className={classes.loader}>
                            <Loader size={'md'} />
                        </div>
                    ) : (
                        <>
                            <Input
                                name={'name'}
                                type={'text'}
                                value={form.name}
                                placeholder={'Никнейм'}
                                onChange={changeHandler}
                            />
                            <Input
                                name={'email'}
                                type={'email'}
                                value={form.email}
                                placeholder={'Email'}
                                onChange={changeHandler}
                            />
                            <p className={classes.listTitle}>
                                Потверждение:{' '}
                                {form.isConfirmed
                                    ? 'Профиль потвержден'
                                    : 'Профиль еще не потвержден'}
                            </p>

                            <div className={classes.list}>
                                <p className={classes.listTitle}>Роль</p>
                                <p onClick={clickHandler} className={classes.currentItem}>
                                    {
                                        Object.values(variantRole)[
                                            Object.keys(variantRole).findIndex(r => r === form.role)
                                        ]
                                    }
                                    <FontAwesomeIcon
                                        className={[
                                            classes.listIcon,
                                            isOpen ? classes.rotate : null,
                                        ].join(' ')}
                                        icon={faAngleDown}
                                    />
                                </p>
                                <div
                                    className={[
                                        classes.listVariable,
                                        !isOpen ? classes.hidden : null,
                                    ].join(' ')}
                                >
                                    {Object.values(variantRole).map(role => {
                                        return (
                                            <p
                                                key={role}
                                                onClick={changeRoleHandler}
                                                className={classes.item}
                                            >
                                                {role}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                            <Button text={'Сохранить'} type="primary" onClick={createHandler} />
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
