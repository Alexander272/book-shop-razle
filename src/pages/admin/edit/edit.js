import React, { useState, useEffect, useCallback } from 'react'
import * as axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { faAngleDown, faSave, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AdminLayout } from '../../../layout/AdminLayout'
import { ErrorLayout } from '../../../layout/ErrorLayout'
import { Input } from '../../../components/Input/Input'
import { SwitchInput } from '../../../components/SwitchInput/SwitchInput'
import { FileInput } from '../../../components/FileInput/FileInput'
import { Textarea } from './../../../components/Textarea/Textarea'
import { Button } from '../../../components/Button/Button'
import { Toasts } from '../../../components/Toasts/Toasts'
import { Loader } from '../../../components/Loader/Loader'
import { PageMeta } from '../../../components/PageMeta/PageMeta'
import classes from '../../../styles/admin.module.scss'

export default function AdminEditById() {
    const role = useSelector(state => state.user.role)
    const token = useSelector(state => state.user.token)
    const history = useHistory()
    const id = useParams().id
    const [form, setForm] = useState({
        _id: null,
        name: '',
        availability: true,
        new: false,
        annotation: '',
        publisher: '',
        author: '',
        series: '',
        theYearOfPublishing: '',
        ISBN: '',
        numberOfPages: 0,
        format: '',
        coverType: '',
        circulation: 0,
        weight: '',
        ageRestrictions: '',
        translator: '',
        genre: null,
        price: 0,
    })
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [selectGenres, setSelectGenres] = useState([])
    const [genres, setGenres] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchBook = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: 'GET',
                headers: { authorization: `Bearer ${token}` },
                data: null,
                url: `/api/catalog/${id}`,
            })
            setForm(response.data)
            setImageUrl({ url: response.data.previewUrl, name: response.data.previewName })
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }, [])

    const fetchGanres = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/genre')
            setGenres(response.data)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (role !== 'user') {
            fetchBook()
            fetchGanres()
        }
    }, [fetchBook])
    useEffect(() => {
        if (role !== 'user' && form.genre)
            setSelectGenres(
                form.genre.bookGenres.map(g => ({ id: g.genreId._id, name: g.genreId.name }))
            )
    }, [form])

    if (role === 'user') return <ErrorLayout />

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }
    const cwitchHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.checked,
        })
    }

    const uploadHandler = file => {
        if (file) setImage(file)
        else setImage(null)
    }
    const getImage = data => {
        if (data) setImageUrl(data)
        else setImageUrl(null)
    }

    const openHandler = () => {
        setIsOpen(prev => !prev)
    }
    const addHandler = () => {
        setIsAdd(prev => !prev)
    }

    const changeGenreHandler = event => {
        const targetId = event.target.dataset.id
        const targetName = event.target.dataset.name
        setIsOpen(false)
        setSelectGenres(prev => prev.concat([{ id: targetId, name: targetName }]))
        setIsAdd(false)
    }
    const removeGenreHandler = event => {
        const targetId = event.target.dataset.id
        setSelectGenres(prev => prev.filter(g => g.id !== targetId))
    }

    const updateHandler = async () => {
        try {
            setLoading(true)
            let formData
            if (image) {
                formData = new FormData()
                formData.append('image', image)
                formData.append('bookName', form.name)
            }
            const resultGenres = selectGenres.map(g => ({ genreId: g.id }))
            const response = await axios({
                method: 'POST',
                headers: { authorization: `Bearer ${token}` },
                data: {
                    book: {
                        _id: form._id,
                        name: form.name,
                        availability: form.availability,
                        annotation: form.annotation,
                        publisher: form.publisher,
                        author: form.author,
                        series: form.series,
                        ISBN: form.ISBN,
                        format: form.format,
                        coverType: form.coverType,
                        weight: form.weight,
                        ageRestrictions: form.ageRestrictions,
                        translator: form.translator,
                        genre: {
                            bookGenres: resultGenres,
                        },
                        theYearOfPublishing: +form.theYearOfPublishing,
                        numberOfPages: +form.numberOfPages,
                        circulation: +form.circulation,
                        price: +form.price,
                    },
                    formData,
                },
                url: '/api/book/update',
            })
            setSuccess(response.data)
            history.push('/admin/edit')
        } catch (e) {
            console.log(e.message)
            setLoading(false)
            setError(e.message)
            setTimeout(() => {
                setError('')
            }, 5500)
        }
    }

    return (
        <AdminLayout active="Редактировать">
            <PageMeta title="Редактировать книгу" />
            <div className={classes.container}>
                <h1 className={classes.title}></h1>
                {success && <Toasts type={'success'} message={success} />}
                {error && <Toasts type={'error'} message={error} />}
                <div className={classes.form}>
                    {loading ? (
                        <div className={classes.loader}>
                            <Loader size={'md'} />
                        </div>
                    ) : (
                        <>
                            <Input
                                type="text"
                                name="name"
                                value={form.name}
                                placeholder="Название"
                                onChange={changeHandler}
                            />
                            <SwitchInput
                                name="new"
                                checked={form.new}
                                placeholderTrue="Новинка"
                                placeholderFalse="Не новинка"
                                onChange={cwitchHandler}
                            />
                            <SwitchInput
                                name="availability"
                                checked={form.availability}
                                placeholderTrue="Есть в наличии"
                                placeholderFalse="Нет в наличии"
                                onChange={cwitchHandler}
                            />
                            <FileInput
                                name="image"
                                title="Изображение книги"
                                folderName="books"
                                onUpload={uploadHandler}
                                getImage={getImage}
                                image={imageUrl}
                            />
                            <Textarea
                                name="annotation"
                                placeholder="Аннотация"
                                value={form.annotation}
                                onChange={changeHandler}
                            />
                            <Input
                                type="text"
                                name="publisher"
                                value={form.publisher}
                                placeholder="Издательство"
                                onChange={changeHandler}
                            />
                            <Input
                                type="text"
                                name="author"
                                value={form.author}
                                placeholder="Автор"
                                onChange={changeHandler}
                            />
                            <Input
                                type="text"
                                name="series"
                                value={form.series}
                                placeholder="Серия"
                                onChange={changeHandler}
                            />
                            <Input
                                type="text"
                                name="theYearOfPublishing"
                                value={form.theYearOfPublishing}
                                placeholder="Год издания"
                                onChange={changeHandler}
                            />
                            <Input
                                type="text"
                                name="ISBN"
                                value={form.ISBN}
                                placeholder="ISBN"
                                onChange={changeHandler}
                            />
                            <Input
                                type="number"
                                name="numberOfPages"
                                value={form.numberOfPages}
                                placeholder="Кол-во страниц"
                                onChange={changeHandler}
                            />
                            <Input
                                type="text"
                                name="format"
                                value={form.format}
                                placeholder="Формат"
                                onChange={changeHandler}
                            />
                            <Input
                                type="text"
                                name="coverType"
                                value={form.coverType}
                                placeholder="Тип обложки"
                                onChange={changeHandler}
                            />
                            <Input
                                type="number"
                                name="circulation"
                                value={form.circulation}
                                placeholder="Тираж"
                                onChange={changeHandler}
                            />
                            <Input
                                type="text"
                                name="weight"
                                value={form.weight}
                                placeholder="Вес, г"
                                onChange={changeHandler}
                            />
                            <Input
                                type="text"
                                name="ageRestrictions"
                                value={form.ageRestrictions}
                                placeholder="Возрастные ограничения"
                                onChange={changeHandler}
                            />
                            {/* <Input
                                type="text"
                                name="genre"
                                value={form.genre}
                                placeholder="Жанр"
                                onChange={changeHandler}
                            /> */}
                            <p className={classes.listTitle}>Жанр</p>
                            {selectGenres.length > 0 && (
                                <div className={classes.genreContainer}>
                                    {selectGenres.map(genre => (
                                        <p className={classes.genre} key={genre.id}>
                                            <span>{genre.name}</span>
                                            <span
                                                className={classes.genreIcon}
                                                data-id={genre.id}
                                                onClick={removeGenreHandler}
                                            >
                                                <FontAwesomeIcon
                                                    className={classes.iconNoEvents}
                                                    icon={faTimes}
                                                />
                                            </span>
                                        </p>
                                    ))}
                                </div>
                            )}
                            {!isAdd ? (
                                <Button
                                    text="Добавть жанр"
                                    type="primary"
                                    icon={faPlus}
                                    onClick={addHandler}
                                />
                            ) : (
                                genres.length > 0 && (
                                    <div className={classes.list}>
                                        <p onClick={openHandler} className={classes.currentItem}>
                                            {genres[0].name}
                                            <FontAwesomeIcon
                                                className={[
                                                    classes.listIcon,
                                                    isOpen ? classes.rotate : null,
                                                ].join(' ')}
                                                icon={faAngleDown}
                                            />
                                        </p>
                                        <div
                                            className={[
                                                classes.listVariable,
                                                !isOpen ? classes.hidden : null,
                                            ].join(' ')}
                                        >
                                            {genres.map(g => {
                                                return (
                                                    <p
                                                        key={g._id}
                                                        data-id={g._id}
                                                        data-name={g.name}
                                                        onClick={changeGenreHandler}
                                                        className={classes.item}
                                                    >
                                                        {g.name}
                                                    </p>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            )}
                            <div className={classes.genreContainer}></div>
                            <Input
                                type="text"
                                name="translator"
                                value={form.translator}
                                placeholder="Переводчик (необязательно)"
                                onChange={changeHandler}
                            />
                            <Input
                                type="number"
                                name="price"
                                value={form.price}
                                placeholder="Цена книги"
                                onChange={changeHandler}
                            />
                            <Button
                                text="Сохранить"
                                icon={faSave}
                                type="primary"
                                onClick={updateHandler}
                            />
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
