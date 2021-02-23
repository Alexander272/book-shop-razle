import React, { useState, useEffect, useCallback } from 'react'
import * as axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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
    const [form, setForm] = useState({
        _id: null,
        name: '',
        engName: '',
    })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchGenre = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: 'GET',
                headers: { authorization: `Bearer ${token}` },
                data: null,
                url: `/api/genre/${id}`,
            })
            setForm(response.data)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (role !== 'user') fetchGenre()
    }, [fetchGenre])

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
                url: `/api/genre/update/${form._id}`,
            })
            setSuccess(response.data)
            setLoading(false)
            history.push('/admin/genres')
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
            <PageMeta title="Редактировать жанр" />
            {success.length > 0 && <Toasts type={'success'} message={success} />}
            {error.length > 0 && <Toasts type={'error'} message={error} />}
            <div className={classes.container}>
                <h1 className={classes.title}>Редактировать жанр</h1>
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
                                text={'Сохранить'}
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
