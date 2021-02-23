import React, { useState } from 'react'
import axios from 'axios'

export const Footer = () => {
    const [success, setSuccess] = useState('')
    const [input, setInput] = useState('')

    const changeHandler = event => {
        setInput(event.target.value)
    }
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    const clickHandler = async () => {
        if (reg.test(input)) {
            const res = await axios.post('/api/subscribers/add', { email: input })
            if (res.data) {
                setInput('')
                setSuccess('Успешно')
            }
        }
    }

    return (
        <footer className={'footer'}>
            <div className={'footer_bottom'}>
                <div className={'footer__subcribe_container'}>
                    <h5 className={'footer__title'}>Подписка на новости</h5>
                    <p className={'footer__text'}>
                        Будьте в курсе наших акций, скидкок и спец.предложений
                    </p>
                    <div className={'footer__subcribe'}>
                        <div className={'footer__input_container'}>
                            <input
                                onChange={changeHandler}
                                value={input}
                                type="email"
                                className={'footer__input'}
                                placeholder="Введите свой email"
                            />
                            <p onClick={clickHandler} className={'footer__input_btn'}>
                                Подписаться
                            </p>
                        </div>

                        <p className={success.length === 0 ? 'footer__hidden' : 'footer__text'}>
                            {/* На ваш email было отправлено письмо со ссылкой подтверждения подписки */}
                            Спасибо за подписку
                        </p>
                    </div>
                </div>
                {/* <div className="footer__buy">
                    <p className="footer__buy-text">Принимаем к оплате</p>
                    <div className="footer__img-container">
                        <div className="footer__img">
                            <img className="footer__img-icon" src="./img/visa.svg" alt="visa" />
                        </div>
                        <div className="footer__img">
                            <img className="footer__img-icon" src="./img/mastercard.svg" alt="mastercard" />
                        </div>
                        <div className="footer__img">
                            <img className="footer__img-icon" src="./img/mir.svg" alt="mir" />
                        </div>
                        <div className="footer__img">
                            <img className="footer__img-icon" src="./img/qiwi.svg" alt="qiwi" />
                        </div>
                        <div className="footer__img">
                            <img className="footer__img-icon" src="./img/webmoney.svg" alt="webmoney" />
                        </div>
                        <div className="footer__img">
                            <img className="footer__img-icon" src="./img/yandex-money.svg" alt="yandex-money" />
                        </div>
                    </div>
                </div> */}
            </div>
            <p className={'footer__copy'}>2020 &copy; Интернет-магазин книг.</p>
        </footer>
    )
}
