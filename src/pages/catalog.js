import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { Loader } from '../components/Loader/Loader'
import { PageMeta } from '../components/PageMeta/PageMeta'
import { fetchBooks } from '../store/catalog/actions'
import { addToCart } from '../store/cart/actions'
import classes from '../styles/catalogPage.module.scss'

export default function HomePage() {
    const dispatch = useDispatch()
    const books = useSelector(state => state.catalog.books)
    const loading = useSelector(state => state.catalog.loading)
    const id = useSelector(state => state.user.id)
    const token = useSelector(state => state.user.token)
    const cart = useSelector(state => state.cart.cart)
    const [purchasedBooks, setPurchasedBooks] = useState([])
    const slug = useParams().slug

    useEffect(() => {
        dispatch(fetchBooks(slug))
    }, [])
    useEffect(() => {
        setPurchasedBooks(cart.map(b => b.bookId._id))
    }, [cart])

    const addToCartHandler = event => {
        const book = books[event.target.dataset.index]
        if (!purchasedBooks.includes(book._id)) {
            dispatch(
                addToCart({
                    cart,
                    book: {
                        _id: Date.now().toString(),
                        count: 1,
                        bookId: {
                            _id: book._id,
                            name: book.name,
                            author: book.author,
                            previewUrl: book.previewUrl,
                            price: book.price,
                        },
                    },
                    id,
                    token,
                })
            )
        }
    }

    return (
        <MainLayout>
            <PageMeta
                title={
                    slug === 'all' ? 'Каталог книг' : slug === 'new' ? 'Новинки' : 'Книги по жанру'
                }
            />
            <main className="content">
                {loading ? (
                    <Loader size="md" />
                ) : (
                    <>
                        <h1 className={classes.title}>
                            {slug === 'all'
                                ? 'Каталог книг'
                                : slug === 'new'
                                ? 'Новинки'
                                : 'Книги по жанру'}
                        </h1>
                        <div className={classes.books}>
                            {books &&
                                books.map((book, index) => {
                                    return (
                                        <div key={book._id} className={classes.book}>
                                            {book.new && (
                                                <div className={classes.new}>
                                                    <p className={classes.newText}>Новинка</p>
                                                </div>
                                            )}
                                            <div className={classes.linkBlock}>
                                                <div className={classes.imageContainer}>
                                                    <img
                                                        className={classes.image}
                                                        src={book.previewUrl}
                                                        alt={book.previewName}
                                                    />
                                                </div>
                                                <div className={classes.minInfo}>
                                                    <p className={classes.bookName}>{book.name}</p>
                                                    <p className={classes.author}>{book.author}</p>
                                                </div>
                                                <Link
                                                    to={`/book/${book._id}`}
                                                    className={classes.link}
                                                />
                                            </div>
                                            {book.availability ? (
                                                <div className={classes.priceBlock}>
                                                    <p
                                                        onClick={addToCartHandler}
                                                        data-index={index}
                                                        className={classes.price_buy}
                                                    >
                                                        <span className={classes.price}>
                                                            {new Intl.NumberFormat('ru-RU', {
                                                                currency: 'RUB',
                                                                style: 'currency',
                                                            }).format(book.price)}
                                                        </span>
                                                        {purchasedBooks.includes(book._id) ? (
                                                            <span className={classes.buy}>
                                                                В&nbsp;корзине
                                                            </span>
                                                        ) : (
                                                            <span className={classes.buy}>
                                                                Купить
                                                            </span>
                                                        )}
                                                    </p>
                                                    <div
                                                        className={[
                                                            classes.bg,
                                                            purchasedBooks.includes(book._id)
                                                                ? classes.lightBg
                                                                : null,
                                                        ].join(' ')}
                                                    ></div>
                                                </div>
                                            ) : (
                                                <div className={classes.bg_not}>
                                                    <p className={classes.not}>Нет в наличии</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                        </div>
                    </>
                )}
            </main>
        </MainLayout>
    )
}
