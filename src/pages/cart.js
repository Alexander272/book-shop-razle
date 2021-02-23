import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { MainLayout } from '../layout/MainLayout'
import { PageMeta } from '../components/PageMeta/PageMeta'
import { addToCart, removeBookToCart, removeToCart } from '../store/cart/actions'
import { createOrder } from '../store/order/actions'
import classes from '../styles/cardPage.module.scss'

export default function CardPage() {
    const dispatch = useDispatch()
    const [price, setPrice] = useState(0)
    const [number, setNumber] = useState(0)
    const books = useSelector(state => state.cart.cart)
    const id = useSelector(state => state.user.id)
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        let currentPrice = 0
        let currentNumber = 0
        books.forEach(book => {
            currentPrice += book.bookId.price * book.count
            currentNumber += +book.count
        })
        setPrice(currentPrice)
        setNumber(currentNumber)
    }, [books])

    const removeHandler = event => {
        const index = books.findIndex(b => b.bookId._id === event.target.dataset.id)
        dispatch(removeBookToCart({ cart: books, book: books[index], id, token }))
    }

    const numberChangedHandler = event => {
        const index = books.findIndex(b => b.bookId._id === event.target.dataset.id)
        if (event.target.dataset.action === '-') {
            dispatch(removeToCart({ cart: books, book: books[index], id, token }))
        } else {
            dispatch(addToCart({ cart: books, book: books[index], id, token }))
        }
    }

    const orderHandler = async () => {
        dispatch(
            createOrder({
                token,
                data: {
                    book: books.map(book => ({
                        bookId: book.bookId.id,
                        name: book.bookId.name,
                        count: book.count,
                        price: book.bookId.price,
                    })),
                },
            })
        )
    }

    return (
        <MainLayout>
            <PageMeta title="Корзина" />
            <main className={'content'}>
                <h1 className={classes.title}>Корзина</h1>
                <div>
                    {books.length === 0 && (
                        <>
                            <p className={classes.emptyCard}>Ваша корзина пуста</p>
                            <Link to="/" className={classes.emptyCard_link}>
                                Продолжить покупки?
                            </Link>
                        </>
                    )}
                    {books.map(book => {
                        return (
                            <div key={book.bookId._id} className={classes.bookContainer}>
                                <div className={classes.linkBlock}>
                                    <div className={classes.image}>
                                        <Link to={`/book/${book.bookId._id}`}>
                                            <img
                                                src={book.bookId.previewUrl}
                                                alt={book.bookId.name}
                                            />
                                        </Link>
                                    </div>
                                    <div className={classes.info}>
                                        <p>
                                            <Link
                                                to={`/book/${book.bookId._id}`}
                                                className={classes.link}
                                            >
                                                {book.bookId.name}
                                            </Link>
                                        </p>
                                        <p className={classes.info_text}>{book.bookId.author}</p>
                                    </div>
                                </div>
                                <div className={classes.btns}>
                                    <p className={classes.numberText}>
                                        Количество:{' '}
                                        <span
                                            onClick={numberChangedHandler}
                                            data-action="-"
                                            data-id={book.bookId._id}
                                            className={[
                                                classes.numberBtn,
                                                classes.ml,
                                                classes.numberBtnLeft,
                                            ].join(' ')}
                                        >
                                            -
                                        </span>
                                        <span className={classes.number}>{book.count}</span>
                                        <span
                                            onClick={numberChangedHandler}
                                            data-action="+"
                                            data-id={book.bookId._id}
                                            className={[
                                                classes.numberBtn,
                                                classes.numberBtnRight,
                                            ].join(' ')}
                                        >
                                            +
                                        </span>
                                    </p>
                                    <p className={classes.priceText}>
                                        Цена за штуку:{' '}
                                        <span className={classes.price}>
                                            {new Intl.NumberFormat('ru-RU', {
                                                currency: 'RUB',
                                                style: 'currency',
                                            }).format(book.bookId.price)}
                                        </span>
                                    </p>
                                    <p
                                        onClick={removeHandler}
                                        data-id={book.bookId._id}
                                        className={classes.remove}
                                    >
                                        <FontAwesomeIcon
                                            className={classes.removeIcon}
                                            icon={faTrash}
                                        />{' '}
                                        Удалить
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    {books.length > 0 && (
                        <div className={classes.final}>
                            <div>
                                <p className={classes.finalPrice}>
                                    Итоговая цена:{' '}
                                    <span className={classes.price}>
                                        {new Intl.NumberFormat('ru-RU', {
                                            currency: 'RUB',
                                            style: 'currency',
                                        }).format(price)}
                                    </span>
                                </p>
                                <p className={classes.finalNumber}>
                                    Количество книг: <span className={classes.price}>{number}</span>
                                </p>
                            </div>
                            <div className={classes.order}>
                                {token ? (
                                    <p onClick={orderHandler} className={classes.finalBtn}>
                                        Оформить заказ
                                    </p>
                                ) : (
                                    <p className={classes.order_text}>
                                        Необходимо авторизироваться для офрмления заказа
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </MainLayout>
    )
}
