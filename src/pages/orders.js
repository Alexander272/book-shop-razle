import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { Loader } from '../components/Loader/Loader'
import { PageMeta } from '../components/PageMeta/PageMeta'
import { fetchOrders } from '../store/order/actions'
import classes from '../styles/ordersPage.module.scss'

export default function OrderPage() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const orders = useSelector(state => state.orders.orders)
    const loading = useSelector(state => state.orders.loading)
    // const error = useSelector(state => state.orders.error)

    useEffect(() => {
        dispatch(fetchOrders(token))
    }, [])

    return (
        <MainLayout>
            <PageMeta title="Заказы" />
            <main className={'content'}>
                {loading ? (
                    <Loader size="md" />
                ) : (
                    <>
                        <div className={classes.breadcrumbs}>
                            <Link to="/" className={classes.text}>
                                Главная
                            </Link>{' '}
                            / <p className={classes.text}>Заказы</p>
                        </div>
                        <h1 className={classes.title}>Заказы</h1>
                        <div className={classes.books}>
                            {orders.length > 0 ? (
                                orders.map(o => {
                                    return (
                                        <div className={classes.order} key={o._id}>
                                            <h3 className={classes.orderTitle}>
                                                Заказ от{' '}
                                                {new Date(+o.dateOfOrders).toLocaleDateString()}
                                            </h3>
                                            <hr className={classes.hr} />
                                            <div>
                                                {o.book.map(book => {
                                                    return (
                                                        <div
                                                            className={classes.book}
                                                            key={book.bookId}
                                                        >
                                                            <p className={classes.bookName}>
                                                                <Link
                                                                    to={`/book/${book.bookId}`}
                                                                    className={classes.link}
                                                                >
                                                                    {book.name}
                                                                </Link>{' '}
                                                                <span className={classes.warn}>
                                                                    {book.count}
                                                                </span>
                                                            </p>
                                                            <p className={classes.price}>
                                                                Цена за 1 книгу:{' '}
                                                                <span className={classes.warn}>
                                                                    {new Intl.NumberFormat(
                                                                        'ru-RU',
                                                                        {
                                                                            currency: 'RUB',
                                                                            style: 'currency',
                                                                        }
                                                                    ).format(book.price)}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className={classes.empty}>Заказов пока нет</p>
                            )}
                        </div>
                    </>
                )}
            </main>
        </MainLayout>
    )
}
