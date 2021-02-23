import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { setSearch } from '../../store/search/actions'
import classes from './searchInput.module.scss'

export const SearchInput = () => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const onChangeHandler = event => {
        setInput(event.target.value)
    }

    const onSearch = () => {
        if (input) {
            dispatch(setSearch(input))
            history.push('/search')
        }
    }

    return (
        <div className={classes.field}>
            <input
                id="search"
                type="search"
                value={input}
                className={classes.input}
                onChange={onChangeHandler}
                placeholder="Поиск книг, авторов"
            />
            <label htmlFor="search" onClick={onSearch} className={classes.label}>
                <FontAwesomeIcon icon={faSearch} className={classes.icon} />
            </label>
        </div>
    )
}
