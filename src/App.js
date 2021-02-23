import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { useRoutes } from './routes'
import { getAuth } from './store/user/actions'
import { getUserCart } from './store/cart/actions'
import './styles/index.scss'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS

config.autoAddCss = false

const App = () => {
    const dispatch = useDispatch()
    const role = useSelector(state => state.user.role)
    const routes = useRoutes(role)
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        dispatch(getUserCart(token))
    }, [token])

    useEffect(() => {
        if (!role) dispatch(getAuth())
    }, [])

    return (
        <Switch>
            {routes.map(({ fetchData, ...routeProps }) => (
                <Route key={routeProps.path} {...routeProps} />
            ))}
        </Switch>
    )
}

export default App
