import React, { useState } from 'react'
import { MainLayout } from '../layout/MainLayout'
import { Input } from '../components/Input/Input'
import { Textarea } from '../components/Textarea/Textarea'
import { PageMeta } from '../components/PageMeta/PageMeta'
import classes from '../styles/contact.module.scss'

export default function ContactPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <MainLayout>
            <PageMeta title={'Связатся с нами'} />
            <div className={classes.container}>
                <form className={classes.form}>
                    <h3 className={classes.title}>Связаться с нами</h3>
                    <Input
                        name="name"
                        placeholder="Ваше имя"
                        type="text"
                        value={form.name}
                        onChange={changeHandler}
                    />
                    <Input
                        name="email"
                        placeholder="Ваш email"
                        type="email"
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <Input
                        name="subject"
                        placeholder="Тема сообщения"
                        type="text"
                        value={form.subject}
                        onChange={changeHandler}
                    />
                    <Textarea
                        name="message"
                        placeholder="Сообщение"
                        value={form.message}
                        onChange={changeHandler}
                    />
                    <p className={classes.btn}>Отправить</p>
                </form>
            </div>
        </MainLayout>
    )
}
