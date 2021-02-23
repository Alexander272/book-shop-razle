import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import * as axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AdminLayout } from '../../../layout/AdminLayout'
import { ErrorLayout } from '../../../layout/ErrorLayout'
import { Toasts } from '../../../components/Toasts/Toasts'
import { Loader } from '../../../components/Loader/Loader'
import { Button } from './../../../components/Button/Button'
import { PageMeta } from '../../../components/PageMeta/PageMeta'
import classes from '../../../styles/admin.module.scss'

export default function AdminEdit() {
    const role = useSelector(state => state.user.role)
    const token = useSelector(state => state.user.token)
    const history = useHistory()
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const fetchGenres = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: 'GET',
                headers: { authorization: `Bearer ${token}` },
                data: null,
                url: '/api/genre',
            })
            setGenres(response.data)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (role !== 'user') fetchGenres()
    }, [fetchGenres])

    if (role === 'user') return <ErrorLayout />

    const onRemoveHandler = async event => {
        const id = event.target.dataset.id
        try {
            setLoadingDel(true)
            const response = await axios({
                method: 'POST',
                headers: { authorization: `Bearer ${token}` },
                data: null,
                url: `/api/genre/remove/${id}`,
            })
            setSuccess(response.data)

            setGenres(prev => prev.filter(genre => genre._id != id))
            setTimeout(() => {
                setSuccess('')
            }, 5500)
            setLoadingDel(false)
        } catch (e) {
            setLoadingDel(false)
            setErrorDel(e.message)
            setTimeout(() => {
                setErrorDel('')
            }, 5500)
        }
    }

    const addHandler = () => {
        history.push('/admin/genres/add')
    }

    return (
        <AdminLayout active="Жанры">
            <PageMeta title="Жанры книг" />
            <div className={classes.container}>
                <h1 className={classes.title}>Жанры книг</h1>
                {success.length > 0 && <Toasts type={'success'} message={success} />}
                {error.length > 0 && <Toasts type={'error'} message={error} />}
                <div className={classes.form}>
                    <Button text={'Добавть'} type="primary" icon={faPlus} onClick={addHandler} />
                    {loading ? (
                        <div className={classes.loader}>
                            <Loader size="md" />
                        </div>
                    ) : (
                        <div className={classes.books}>
                            {genres &&
                                genres.map(genre => {
                                    return (
                                        <div key={genre._id} className={classes.bookContainer}>
                                            <div className={classes.info}>
                                                <p className={classes.info_p}>
                                                    <b>Название</b>: {genre.name}
                                                </p>
                                                <p className={classes.info_p}>
                                                    <b>Название</b>: {genre.engName}
                                                </p>
                                            </div>
                                            <div className={classes.btns}>
                                                <Link
                                                    to={`/admin/genres/${genre._id}`}
                                                    className={classes.btn_link}
                                                >
                                                    <FontAwesomeIcon
                                                        className={classes.deleteIcon}
                                                        icon={faEdit}
                                                    />
                                                </Link>
                                                <p
                                                    onClick={onRemoveHandler}
                                                    data-id={genre._id}
                                                    className={classes.btn_del}
                                                >
                                                    <FontAwesomeIcon
                                                        className={classes.deleteIcon}
                                                        icon={faTrash}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
