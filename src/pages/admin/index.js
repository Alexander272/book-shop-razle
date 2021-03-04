import React, { useState, useEffect, useCallback } from 'react'
import * as axios from 'axios'
import { useSelector } from 'react-redux'
import { AdminLayout } from '../../layout/AdminLayout'
import { ErrorLayout } from '../../layout/ErrorLayout'
import { Loader } from '../../components/Loader/Loader'
import { PageMeta } from '../../components/PageMeta/PageMeta'
import classes from '../../styles/admin.module.scss'

export default function AdminPage() {
    const role = useSelector(state => state.user.role)
    const token = useSelector(state => state.user.token)
    const [stat, setStat] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchStatistics = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: 'GET',
                headers: { authorization: `Bearer ${token}` },
                data: null,
                url: '/api/statistics',
            })
            setStat(response.data)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (role !== 'user') fetchStatistics()
    }, [fetchStatistics])

    if (role === 'user') return <ErrorLayout />

    return (
        <AdminLayout active="Статистика">
            <PageMeta title="Статистика" />
            <div className={classes.container}>
                <h1 className={classes.title}>Статистика</h1>
                {loading ? (
                    <div className={classes.loader}>
                        <Loader size="md" />
                    </div>
                ) : (
                    stat && (
                        <div className={classes.form}>
                            <div className={classes.stat}>
                                <p className={classes.stat_p}>
                                    Всего покупок за месяц:{' '}
                                    <span className={classes.stat_warn}>{stat.totalPurchases}</span>
                                </p>
                                <p className={classes.stat_p}>
                                    Всего подписчиков:{' '}
                                    <span className={classes.stat_warn}>{stat.subscribers}</span>
                                </p>
                                <p className={classes.price}>
                                    Итоговая сумма всех покупок:{' '}
                                    <span className={classes.stat_warn}>
                                        {new Intl.NumberFormat('ru-RU', {
                                            currency: 'RUB',
                                            style: 'currency',
                                        }).format(stat.allPrice)}
                                    </span>
                                </p>
                            </div>
                            <div className={classes.books}>
                                <p className={[classes.stat_p, classes.books_p].join(' ')}>
                                    Купленные книги
                                </p>
                                {stat.books.map(book => {
                                    return (
                                        <div className={classes.stat_book} key={book.bookId}>
                                            <p className={classes.book_name}>
                                                <span>{book.name}</span> &#10006;{' '}
                                                <span className={classes.book_warn}>
                                                    {book.count}
                                                </span>
                                            </p>
                                            <p className={classes.book_name}>
                                                Цена за штуку:{' '}
                                                <span className={classes.book_warn}>
                                                    {new Intl.NumberFormat('ru-RU', {
                                                        currency: 'RUB',
                                                        style: 'currency',
                                                    }).format(book.price)}
                                                </span>
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                )}
            </div>
        </AdminLayout>
    )
}
