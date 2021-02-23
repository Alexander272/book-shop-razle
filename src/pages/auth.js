import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { Toasts } from '../components/Toasts/Toasts'
import { Loader } from '../components/Loader/Loader'
import { PageMeta } from '../components/PageMeta/PageMeta'
import { clear, login, register } from '../store/user/actions'
import { concatCart } from '../store/cart/actions'
import classes from '../styles/auth.module.scss'

const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

export default function AuthUsers() {
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const loading = useSelector(state => state.user.loading)
    const error = useSelector(state => state.user.error)
    const message = useSelector(state => state.user.message)
    const token = useSelector(state => state.user.token)
    const history = useHistory()

    const [registerState, setRegister] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [loginState, setLogin] = useState({
        email: '',
        password: '',
    })
    const [validErrors, setValidErrors] = useState({
        loginError: {
            email: false,
            password: false,
        },
        registerError: {
            name: false,
            email: false,
            password: false,
        },
    })

    useEffect(() => {
        if (token) {
            dispatch(concatCart({ token }))
            history.push('/')
        }
    }, [token])

    const clickHandler = () => {
        setActive(prev => !prev)
    }
    const onRegisterHandler = event => {
        setRegister({ ...registerState, [event.target.name]: event.target.value })
    }
    const onLoginHandler = event => {
        setLogin({ ...loginState, [event.target.name]: event.target.value })
    }

    const validation = state => {
        let name,
            valid = true
        if (state.password.trim().length < 6) {
            name = 'password'
            valid = false
        }
        if (!reg.test(state.email)) {
            name = 'email'
            valid = false
        }
        if (state.name) {
            if (state.name.trim().length < 3) {
                name = 'name'
                valid = false
            }
        }

        return { name, valid }
    }

    const onRegister = async event => {
        event.preventDefault()
        const { name, valid } = validation(registerState)
        if (!valid)
            setValidErrors(prev => ({
                ...prev,
                registerError: { name: false, password: false, email: false, [name]: true },
            }))
        else {
            dispatch(register(registerState))
            setTimeout(() => {
                dispatch(clear())
            }, 5500)
        }
    }

    const onLogin = async event => {
        event.preventDefault()
        const { name, valid } = validation(loginState)
        if (!valid)
            setValidErrors(prev => ({
                ...prev,
                loginError: { password: false, email: false, [name]: true },
            }))
        else {
            dispatch(login(loginState))
            if (error) {
                setTimeout(() => {
                    dispatch(clear())
                }, 5500)
            }
        }
    }

    return (
        <div className={'wrapper'}>
            <PageMeta title="Авторизация" />
            <div className={'container'}>
                {message && <Toasts type={'success'} message={message} />}
                {error && <Toasts type={'error'} message={error} />}
                <div className={classes.wrapper}>
                    <div
                        className={[
                            classes.container,
                            active ? classes.rightPanelActive : null,
                        ].join(' ')}
                    >
                        {loading && (
                            <div className={classes.loader}>
                                <Loader size="md" />
                            </div>
                        )}
                        <div className={[classes.formContainer, classes.signUpContainer].join(' ')}>
                            <form className={classes.form}>
                                <h1 className={classes.h1}>Создать аккаунт</h1>
                                <input
                                    value={registerState.name}
                                    name="name"
                                    onChange={onRegisterHandler}
                                    className={classes.input}
                                    required
                                    type="text"
                                    placeholder="Никнейм"
                                />
                                {validErrors.registerError.name && (
                                    <p className={classes.validErrors}>
                                        Никнейм должен быть длинее 3 символов
                                    </p>
                                )}
                                <input
                                    value={registerState.email}
                                    name="email"
                                    onChange={onRegisterHandler}
                                    className={classes.input}
                                    required
                                    type="email"
                                    placeholder="Email"
                                />
                                {validErrors.registerError.email && (
                                    <p className={classes.validErrors}>
                                        Поле содержит не корректный email
                                    </p>
                                )}
                                <input
                                    value={registerState.password}
                                    name="password"
                                    onChange={onRegisterHandler}
                                    className={classes.input}
                                    required
                                    type="password"
                                    placeholder="Пароль"
                                />
                                {validErrors.registerError.password && (
                                    <p className={classes.validErrors}>
                                        Пароль должен быть длинее 6 символов
                                    </p>
                                )}
                                <button onClick={onRegister} className={classes.button}>
                                    Зарегистрироваться
                                </button>
                            </form>
                        </div>
                        <div className={[classes.formContainer, classes.signInContainer].join(' ')}>
                            <form className={classes.form}>
                                <h1 className={classes.h1}>Войти</h1>
                                <input
                                    value={loginState.email}
                                    name="email"
                                    onChange={onLoginHandler}
                                    className={classes.input}
                                    required
                                    type="email"
                                    placeholder="Email"
                                />
                                {validErrors.loginError.email && (
                                    <p className={classes.validErrors}>
                                        Поле содержит не корректный email
                                    </p>
                                )}
                                <input
                                    value={loginState.password}
                                    name="password"
                                    onChange={onLoginHandler}
                                    className={classes.input}
                                    required
                                    type="password"
                                    placeholder="Пароль"
                                />
                                {validErrors.loginError.password && (
                                    <p className={classes.validErrors}>
                                        Пароль должен быть длинее 6 символов
                                    </p>
                                )}
                                <Link className={classes.a} to="/auth/reset">
                                    Забыли пароль?
                                </Link>
                                <button onClick={onLogin} className={classes.button}>
                                    Войти
                                </button>
                            </form>
                        </div>
                        <div className={classes.overlayContainer}>
                            <div className={classes.overlay}>
                                <div
                                    className={[classes.overlayPanel, classes.overlayLeft].join(
                                        ' '
                                    )}
                                >
                                    <h1 className={classes.h1}>Добро пожаловать!</h1>
                                    <p className={classes.p}>
                                        Чтобы оставаться на связи с нами, войдите, указав свою
                                        личную информацию
                                    </p>
                                    <button
                                        onClick={clickHandler}
                                        className={[classes.button, classes.ghost].join(' ')}
                                    >
                                        Войти
                                    </button>
                                </div>
                                <div
                                    className={[classes.overlayPanel, classes.overlayRight].join(
                                        ' '
                                    )}
                                >
                                    <h1 className={classes.h1}>Привет друг!</h1>
                                    <p className={classes.p}>
                                        Введите свои личные данные и начните покупки с нами
                                    </p>
                                    <button
                                        onClick={clickHandler}
                                        className={[classes.button, classes.ghost].join(' ')}
                                    >
                                        Зарегистрироваться
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
