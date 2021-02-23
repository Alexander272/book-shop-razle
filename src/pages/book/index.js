import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MainLayout } from '../../layout/MainLayout'
import { Loader } from '../../components/Loader/Loader'
import { PageMeta } from '../../components/PageMeta/PageMeta'
import { fetchBook } from '../../store/book/actions'
import { addToCart } from '../../store/cart/actions'
import classes from '../../styles/bookPage.module.scss'

export default function BookPage() {
    const dispatch = useDispatch()
    const book = useSelector(state => state.book.book)
    const loading = useSelector(state => state.book.loading)
    const cart = useSelector(state => state.cart.cart)
    const id = useSelector(state => state.user.id)
    const token = useSelector(state => state.user.token)
    const [purchasedBook, setPurchasedBook] = useState(false)
    const bookId = useParams().id

    useEffect(() => {
        if (!book || bookId !== book._id) dispatch(fetchBook(bookId))
    }, [book])

    useEffect(() => {
        if (book) {
            setPurchasedBook(cart.findIndex(b => b.bookId._id === book._id) >= 0 ? true : false)
        }
    }, [book, cart])

    const addToCartHandler = () => {
        if (!purchasedBook) {
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
            setPurchasedBook(true)
        }
    }

    return (
        <MainLayout>
            <PageMeta title={book ? book.name : 'Название книги'} />
            <main className={'content'}>
                <div className={'container'}>
                    {loading ? (
                        <Loader size="md" />
                    ) : (
                        book && (
                            <>
                                <div className={classes.breadcrumbs}>
                                    <Link to="/" className={classes.text}>
                                        Главная
                                    </Link>{' '}
                                    / <p className={classes.text}>{book.name}</p>
                                </div>
                                <div className={classes.container}>
                                    <div className={classes.imageContainer}>
                                        <img src={book.previewUrl} alt={book.previewName} />
                                    </div>
                                    <div className={classes.info}>
                                        <h1 className={classes.title}>{book.name}</h1>
                                        <div className={classes.infoContainer}>
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>Автор</span>
                                                <span className={classes.info_value}>
                                                    {book.author}
                                                </span>
                                            </p>
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>Жанр</span>
                                                <span className={classes.info_value}>
                                                    {book.genre.bookGenres.map(g => (
                                                        <Link
                                                            key={g.genreId._id}
                                                            to={`/books/${g.genreId.engName}`}
                                                            className={classes.info_link}
                                                        >
                                                            {g.genreId.name}
                                                        </Link>
                                                    ))}
                                                </span>
                                            </p>
                                            {book.series && (
                                                <p className={classes.info_row}>
                                                    <span className={classes.info_name}>Серия</span>
                                                    <span className={classes.info_value}>
                                                        {book.series}
                                                    </span>
                                                </p>
                                            )}
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>
                                                    Издательство
                                                </span>
                                                <span className={classes.info_value}>
                                                    {book.publisher}
                                                </span>
                                            </p>
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>
                                                    Год издания
                                                </span>
                                                <span className={classes.info_value}>
                                                    {book.theYearOfPublishing}
                                                </span>
                                            </p>
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>ISBN</span>
                                                <span className={classes.info_value}>
                                                    {book.ISBN}
                                                </span>
                                            </p>
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>
                                                    Кол-во страниц
                                                </span>
                                                <span className={classes.info_value}>
                                                    {book.numberOfPages}
                                                </span>
                                            </p>
                                            {book.translator && (
                                                <p className={classes.info_row}>
                                                    <span className={classes.info_name}>
                                                        Переводчик
                                                    </span>
                                                    <span className={classes.info_value}>
                                                        {book.translator}
                                                    </span>
                                                </p>
                                            )}
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>Формат</span>
                                                <span className={classes.info_value}>
                                                    {book.format}
                                                </span>
                                            </p>
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>
                                                    Тип обложки
                                                </span>
                                                <span className={classes.info_value}>
                                                    {book.coverType}
                                                </span>
                                            </p>
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>Тираж</span>
                                                <span className={classes.info_value}>
                                                    {book.circulation}
                                                </span>
                                            </p>
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>Вес</span>
                                                <span className={classes.info_value}>
                                                    {book.weight}
                                                </span>
                                            </p>
                                            <p className={classes.info_row}>
                                                <span className={classes.info_name}>
                                                    Возрастные ограничения
                                                </span>
                                                <span className={classes.info_value}>
                                                    {book.ageRestrictions}
                                                </span>
                                            </p>
                                        </div>
                                        <div className={classes.price_buy}>
                                            <div className={classes.price}>
                                                <p className={classes.priceText}>
                                                    {new Intl.NumberFormat('ru-RU', {
                                                        currency: 'RUB',
                                                        style: 'currency',
                                                    }).format(book.price)}
                                                </p>
                                            </div>
                                            <div onClick={addToCartHandler} className={classes.buy}>
                                                <p className={classes.buyText}>
                                                    {purchasedBook ? 'В корзине' : 'Купить'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.annotation}>
                                        <p className={classes.annotation_name}>Аннотация</p>
                                        <p className={classes.annotation_item}>{book.annotation}</p>
                                    </div>
                                </div>
                            </>
                        )
                    )}
                </div>
            </main>
        </MainLayout>
    )
}
