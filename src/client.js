import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { HelmetProvider } from 'react-helmet-async'
import { configureStore } from './store/rootStore'
import App from './App'

const { store, history } = configureStore(window.__INITIAL_STATE__)

hydrate(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)

if (module.hot) {
    module.hot.accept()
}
