import React, { useState } from 'react'
import * as axios from 'axios'
import { useSelector } from 'react-redux'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../../components/Button/Button'
import { Input } from '../../../components/Input/Input'
import { Toasts } from '../../../components/Toasts/Toasts'
import { Loader } from '../../../components/Loader/Loader'
import { AdminLayout } from '../../../layout/AdminLayout'
import { ErrorLayout } from '../../../layout/ErrorLayout'
import classes from '../../../styles/admin.module.scss'

export default function AdminUsersAdd() {
    const role = useSelector(state => state.user.role)
    const token = useSelector(state => state.user.token)
    const [form, setForm] = useState({
        name: '',
        engName: '',
    })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    if (role === 'user') return <ErrorLayout />

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createHandler = async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: 'POST',
                headers: { authorization: `Bearer ${token}` },
                data: { ...form },
                url: `/api/genre/add`,
            })
            setSuccess(response.data)
            setTimeout(() => {
                setSuccess('')
            }, 5500)
            setForm({
                name: '',
                engName: '',
            })
            setLoading(false)
        } catch (e) {
            setLoading(false)
            setError(e.message)
            setTimeout(() => {
                setError('')
            }, 5500)
        }
    }

    return (
        <AdminLayout active="Жанры">
            <PageMeta title="Добавить жанр" />
            {success.length > 0 && <Toasts type={'success'} message={success} />}
            {error.length > 0 && <Toasts type={'error'} message={error} />}
            <div className={classes.container}>
                <h1 className={classes.title}>Добавить жанр</h1>
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
                                placeholder={'Название'}
                                onChange={changeHandler}
                            />
                            <Input
                                name={'engName'}
                                type={'text'}
                                value={form.engName}
                                placeholder={'Название на английском'}
                                onChange={changeHandler}
                            />
                            <Button
                                text={'Создать'}
                                type="primary"
                                icon={faPlus}
                                onClick={createHandler}
                            />
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
