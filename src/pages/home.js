import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'
import { MainLayout } from '../layout/MainLayout'
import { Loader } from '../components/Loader/Loader'
import { PageMeta } from '../components/PageMeta/PageMeta'
import { fetchAllBooks } from '../store/home/actions'
import 'react-alice-carousel/lib/alice-carousel.css'
import classes from '../styles/homePage.module.scss'

export default function HomePage() {
    const dispatch = useDispatch()
    const newBooks = useSelector(state => state.home.newBooks)
    // const popularBooks = useSelector(state => state.home.popularBooks)
    const allBooks = useSelector(state => state.home.allBooks)
    const loading = useSelector(state => state.home.loading)
    const error = useSelector(state => state.home.error)

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    }

    useEffect(() => {
        if (!newBooks.length) dispatch(fetchAllBooks())
    }, [newBooks])

    const handleDragStart = e => e.preventDefault()

    return (
        <MainLayout>
            <PageMeta
                title={'Book shop — интернет-магазин книг'}
                descroption={
                    'Интернет-магазин «Book shop» – один из новых в России книжных магазинов. Здесь вы можете купить книги всех направлений и стилей по выгодным ценам с бесплатной доставкой!'
                }
            />
            <main className="content">
                {loading ? (
                    <Loader size="md" />
                ) : (
                    <>
                        <div className={classes.titleContainer}>
                            <h1 className={classes.title}>Новинки</h1>
                            <Link className={classes.titleLink} to="/books/new">
                                Все новинки
                            </Link>
                        </div>
                        {newBooks && (
                            <AliceCarousel
                                mouseTracking
                                items={newBooks.map((book, index) => {
                                    return (
                                        <div
                                            key={book._id}
                                            data-value={index + 1}
                                            className={classes.book}
                                        >
                                            <div className={classes.linkBlock}>
                                                <div className={classes.imageContainer}>
                                                    <img
                                                        className={classes.image}
                                                        src={book.previewUrl}
                                                        alt={book.previewName}
                                                    />
                                                </div>
                                                <div className={classes.minInfo}>
                                                    <p className={classes.author}>{book.author}</p>
                                                    <p className={classes.bookName}>{book.name}</p>
                                                    <Link
                                                        to={`/book/${book._id}`}
                                                        className={classes.link}
                                                    >
                                                        Подробнее
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                responsive={responsive}
                            />
                        )}
                        <div className={classes.titleContainer}>
                            <h1 className={classes.title}>Книги</h1>
                            <Link className={classes.titleLink} to="/books/all">
                                Все книги
                            </Link>
                        </div>
                        {allBooks && (
                            <AliceCarousel
                                mouseTracking
                                items={allBooks.map((book, index) => {
                                    return (
                                        <div
                                            key={book._id}
                                            data-value={index + 1}
                                            className={classes.book}
                                        >
                                            <div className={classes.linkBlock}>
                                                <div className={classes.imageContainer}>
                                                    <img
                                                        className={classes.image}
                                                        src={book.previewUrl}
                                                        alt={book.previewName}
                                                    />
                                                </div>
                                                <div className={classes.minInfo}>
                                                    <p className={classes.author}>{book.author}</p>
                                                    <p className={classes.bookName}>{book.name}</p>
                                                    <Link
                                                        to={`/book/${book._id}`}
                                                        className={classes.link}
                                                    >
                                                        Подробнее
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                responsive={responsive}
                            />
                        )}
                    </>
                )}
            </main>
        </MainLayout>
    )
}

// <div className={classes.titleContainer}>
//     <h1 className={classes.title}>Популярные книги</h1>
//     {/* <Link className={classes.titleLink} to="/books/popular">
//                                 Все популярные книги
//                             </Link> */}
// </div>
// {
//     popularBooks && (
//         <AliceCarousel
//             mouseTracking
//             items={popularBooks.map((book, index) => {
//                 return (
//                     <div key={book._id} data-value={index + 1} className={classes.book}>
//                         <div className={classes.linkBlock}>
//                             <div className={classes.imageContainer}>
//                                 <img
//                                     className={classes.image}
//                                     src={book.previewUrl}
//                                     alt={book.previewName}
//                                 />
//                             </div>
//                             <div className={classes.minInfo}>
//                                 <p className={classes.author}>{book.author}</p>
//                                 <p className={classes.bookName}>{book.name}</p>
//                                 <Link to={`/book/${book._id}`} className={classes.link}>
//                                     Подробнее
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             })}
//             responsive={responsive}
//         />
//     )
// }
