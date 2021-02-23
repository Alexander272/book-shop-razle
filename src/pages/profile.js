import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MainLayout } from '../layout/MainLayout'
import { Loader } from '../components/Loader/Loader'
import { Input } from '../components/Input/Input'
import { Toasts } from '../components/Toasts/Toasts'
import { PageMeta } from '../components/PageMeta/PageMeta'
import { clear, updateUser } from '../store/user/actions'
import classes from '../styles/profilePage.module.scss'

export default function ProfilePage() {
    const dispatch = useDispatch()
    const name = useSelector(state => state.user.name)
    const email = useSelector(state => state.user.email)
    const loading = useSelector(state => state.user.loading)
    const success = useSelector(state => state.user.message)
    const error = useSelector(state => state.user.error)
    const [validError, setValidError] = useState(null)
    const [form, setForm] = useState({
        name,
        email,
        password: '',
        newPassword: '',
        confirm: '',
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const saveHandler = async () => {
        const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        if (reg.test(email)) {
            setValidError('Неккоректный email')
            setTimeout(() => {
                setValidError('')
            }, 5500)
        } else if (form.password === form.newPassword) {
            setValidError('Новый пароль должен отличаться')
            setTimeout(() => {
                setValidError('')
            }, 5500)
        } else if (form.newPassword !== form.confirm) {
            setValidError('Пароли не совпадают')
            setTimeout(() => {
                setValidError('')
            }, 5500)
        } else {
            dispatch(
                updateUser({
                    token,
                    data: {
                        email: form.email,
                        name: form.name,
                        password: form.password,
                        newPassword: form.newPassword,
                    },
                })
            )
            setTimeout(() => {
                dispatch(clear())
            }, 5500)
        }
    }

    return (
        <MainLayout>
            <PageMeta title="Профиль" />
            <main className={'content'}>
                {success && <Toasts type={'success'} message={success} />}
                {(error || validError) && <Toasts type={'error'} message={error || validError} />}
                {loading ? (
                    <Loader size="md" />
                ) : (
                    <>
                        <div className={classes.breadcrumbs}>
                            <Link to="/" className={classes.text}>
                                Главная
                            </Link>{' '}
                            / <p className={classes.text}>Профиль</p>
                        </div>
                        <h1 className={classes.title}>Профиль</h1>
                        <div className={classes.form}>
                            {form && (
                                <>
                                    <Input
                                        name="name"
                                        placeholder="Никнейм"
                                        type="text"
                                        value={form.name}
                                        onChange={changeHandler}
                                    />
                                    <Input
                                        name="email"
                                        placeholder="Ваш email"
                                        type="email"
                                        value={form.email}
                                        onChange={changeHandler}
                                    />
                                    <Input
                                        name="password"
                                        placeholder="Старый пароль"
                                        type="password"
                                        value={form.password}
                                        onChange={changeHandler}
                                    />
                                    <Input
                                        name="newPassword"
                                        placeholder="Новый пароль"
                                        type="password"
                                        value={form.newPassword}
                                        onChange={changeHandler}
                                    />
                                    <Input
                                        name="confirm"
                                        placeholder="Повторите новый пароль"
                                        type="password"
                                        value={form.confirm}
                                        onChange={changeHandler}
                                    />
                                </>
                            )}

                            <p onClick={saveHandler} className={classes.btn}>
                                Сохранить
                            </p>
                        </div>
                    </>
                )}
            </main>
        </MainLayout>
    )
}
