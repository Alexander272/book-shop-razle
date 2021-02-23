import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Toasts } from '../components/Toasts/Toasts'
import { Loader } from '../components/Loader/Loader'
import { PageMeta } from '../components/PageMeta/PageMeta'
import { clear, login } from '../store/user/actions'
import { concatCart } from '../store/cart/actions'
import classes from '../styles/auth.module.scss'

const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

export default function ResetUsers() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const history = useHistory()
    const reset = useParams().reset

    const [loginState, setLogin] = useState({
        email: '',
        password: '',
    })
    const [validErrors, setValidErrors] = useState({
        loginError: {
            email: false,
            password: false,
        },
    })

    useEffect(() => {
        console.log(reset)
    }, [])

    const onLoginHandler = event => {
        setLogin({ ...loginState, [event.target.name]: event.target.value })
    }

    const validation = state => {
        let name,
            valid = true
        if (reset) {
            if (state.password.trim().length < 6) {
                name = 'password'
                valid = false
            }
        } else {
            if (!reg.test(state.email)) {
                name = 'email'
                valid = false
            }
        }

        return { name, valid }
    }

    const onReset = async event => {
        event.preventDefault()
        const { name, valid } = validation(loginState)
        if (!valid)
            setValidErrors(prev => ({
                ...prev,
                loginError: { password: false, email: false, [name]: true },
            }))
        else {
            const res = await axios.post('/api/auth/reset', {
                email: loginState.email,
            })
            setLogin({
                email: '',
                password: '',
            })
            if (!res.data.error) setMessage(res.data.payload)
            else setError(res.data.error)
            setTimeout(() => {
                setMessage(null)
                setError(null)
            }, 5500)
        }
    }

    const onSave = async event => {
        event.preventDefault()
        const { name, valid } = validation(loginState)
        if (!valid)
            setValidErrors(prev => ({
                ...prev,
                loginError: { password: false, email: false, [name]: true },
            }))
        else {
            const res = await axios.post('/api/auth/resetPassword', {
                password: loginState.password,
                token: reset,
            })
            setLogin({
                email: '',
                password: '',
            })
            if (!res.data.error) {
                setMessage(res.data.payload)
                history.push('/auth')
            } else setError(res.data.error)
        }
    }

    return (
        <div className={'wrapper'}>
            <PageMeta title="Восстановить пароль" />
            <div className={'container'}>
                {message && <Toasts type={'success'} message={message} />}
                {error && <Toasts type={'error'} message={error} />}
                <div className={classes.wrapper}>
                    <div className={[classes.container, classes.rightPanelActive].join(' ')}>
                        {loading && (
                            <div className={classes.loader}>
                                <Loader size="md" />
                            </div>
                        )}
                        <div className={[classes.formContainer, classes.signInContainer].join(' ')}>
                            <form className={classes.form}>
                                <h1 className={classes.h1}>Восстановить пароль</h1>
                                {!reset && (
                                    <>
                                        <input
                                            value={loginState.email}
                                            name="email"
                                            onChange={onLoginHandler}
                                            className={classes.input}
                                            required
                                            type="email"
                                            placeholder="Email"
                                        />
                                        <button onClick={onReset} className={classes.button}>
                                            Сбросить
                                        </button>
                                    </>
                                )}
                                {validErrors.loginError.email && (
                                    <p className={classes.validErrors}>
                                        Поле содержит не корректный email
                                    </p>
                                )}
                                {reset && (
                                    <>
                                        <input
                                            value={loginState.password}
                                            name="password"
                                            onChange={onLoginHandler}
                                            className={classes.input}
                                            required
                                            type="password"
                                            placeholder="Пароль"
                                        />
                                        <button onClick={onSave} className={classes.button}>
                                            Сохранить
                                        </button>
                                    </>
                                )}
                                {validErrors.loginError.password && (
                                    <p className={classes.validErrors}>
                                        Пароль должен быть длинее 6 символов
                                    </p>
                                )}
                            </form>
                        </div>
                        <div className={classes.overlayContainer}>
                            <div className={classes.overlay}>
                                <div
                                    className={[classes.overlayPanel, classes.overlayLeft].join(
                                        ' '
                                    )}
                                >
                                    <h1 className={classes.h1}>Привет друг</h1>
                                    <p className={classes.p}>
                                        На этой форме вы можете восстановить ваш пароль и продолжать
                                        пользоваться нашим магазином!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
