import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../styles/errorPage.module.scss'

export const ErrorLayout = () => {
    const createSpan = (number, count) => {
        const spans = []
        for (let i = 0; i < count; i++) {
            spans.push(
                <span key={i + number} className={classes.particle}>
                    {number}
                </span>
            )
        }
        return spans
    }
    return (
        <main className={[classes.errorBlock, 'wrapper', 'container'].join(' ')}>
            {createSpan(4, 40)}
            {createSpan(0, 40)}
            <div className={classes.content}>
                <p>Черт побери,</p>
                <p>
                    Вы потерялись в <strong>404</strong> галактике.
                </p>
                <p>
                    <Link to="/">Вернуться на землю</Link>
                </p>
            </div>
        </main>
    )
}
