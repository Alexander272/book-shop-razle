import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBookOpen,
    faShoppingBasket,
    faSignInAlt,
    faEnvelope,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { SearchInput } from './SearchInput/SearchInput'
import { logout } from '../store/user/actions'

export const Header = ({ active }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const token = useSelector(state => state.user.token)
    const name = useSelector(state => state.user.name)
    const cart = useSelector(state => state.cart.cart)

    const openHandler = () => {
        setOpen(prev => !prev)
    }

    const LogoutHandler = async () => {
        dispatch(logout())
    }

    return (
        <header>
            <div className={'header__top'}>
                <Link to="/contacts" className={['header__contacts', 'header__darken'].join(' ')}>
                    <FontAwesomeIcon icon={faEnvelope} className={'header__top__icon'} />
                    Обратная связь
                </Link>
                {token ? (
                    <div className={'header__profile'}>
                        <p onClick={openHandler} className={'header__contacts'}>
                            <FontAwesomeIcon icon={faUser} className={'header__top__icon'} />
                            {name}
                        </p>
                        <div className={['profile__listLink', open ? null : 'h0'].join(' ')}>
                            <Link
                                to="/profile"
                                className={['header__contacts', 'profile__link'].join(' ')}
                            >
                                Профиль
                            </Link>
                            <Link
                                to="/orders"
                                className={['header__contacts', 'profile__link'].join(' ')}
                            >
                                Заказы
                            </Link>
                            <p
                                onClick={LogoutHandler}
                                className={['header__contacts', 'profile__link'].join(' ')}
                            >
                                Выйти
                            </p>
                        </div>
                    </div>
                ) : (
                    <Link to="/auth" className={'header__contacts'}>
                        <FontAwesomeIcon icon={faSignInAlt} className={'header__top__icon'} />
                        Войти
                    </Link>
                )}
            </div>
            <div className={'header'}>
                <Link to="/" className={'header__logo'}>
                    <FontAwesomeIcon icon={faBookOpen} className={'header__icon'} />
                    <span className={'header__title'}>BookShop</span>
                </Link>
                <SearchInput />
                <div className={'header__card_container'}>
                    <Link to="/cart" className={'header__card'}>
                        <FontAwesomeIcon icon={faShoppingBasket} className={'header__card_icon'} />
                    </Link>
                    <div className={'header__card_text'}>
                        <Link to="/cart" className={'header__card_link'}>
                            Корзина
                            {cart.length > 0 ? ': ' + cart.length : null}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
