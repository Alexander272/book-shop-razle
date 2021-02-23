import React, { useState } from 'react'
import * as axios from 'axios'
import { useSelector } from 'react-redux'
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
    const [isOpen, setIsOpen] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const variantRole = {
        user: 'Пользователь',
        editor: 'Редактор',
        admin: 'Администратор',
    }

    if (role !== 'admin' && role !== 'owner') return <ErrorLayout />

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const clickHandler = () => {
        setIsOpen(prev => !prev)
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
                url: `/api/user/create`,
            })
            setSuccess(response.data)
            setTimeout(() => {
                setSuccess('')
            }, 5500)
            setForm({
                name: '',
                email: '',
                password: '',
                role: 'user',
            })
            setLoading(false)
        } catch (e) {
            setLoading(false)
            setError(e.message.split(': ')[1])
            setTimeout(() => {
                setError('')
            }, 5500)
        }
    }

    return (
        <AdminLayout active="Пользователи">
            <PageMeta title="Добавить пользователя" />
            {success.length > 0 && <Toasts type={'success'} message={success} />}
            {error.length > 0 && <Toasts type={'error'} message={error} />}
            <div className={classes.container}>
                <h1 className={classes.title}>Добавить пользователя</h1>
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
                            <Input
                                name={'password'}
                                type={'password'}
                                value={form.password}
                                placeholder={'Пароль'}
                                onChange={changeHandler}
                            />
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
                            <Button text={'Создать'} type="primary" onClick={createHandler} />
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
