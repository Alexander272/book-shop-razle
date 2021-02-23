import React from 'react'
import url from 'url'
import path from 'path'
import express from 'express'
// import * as proxy from 'express-http-proxy'
import * as mongoose from 'mongoose'
import * as helmet from 'helmet'
import compression from 'compression'
import session from 'express-session'
import MongoStore from 'connect-mongodb-session'
import cors from 'cors'

import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter, matchPath } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { configureStore } from './store/rootStore'
import { getInitialState } from './store/getInitialState'
import { useRoutes } from './routes'
import rootSaga from './store/rootSaga'
import App from './App'

import keys from '../server/keys'
import fileMiddleware from '../server/middleware/file.middleware'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

const Store = MongoStore(session)
const store = new Store({
    collection: 'sessions',
    uri: keys.MONGODB_URL,
})

const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    credentials: true,
}

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(
    session({
        name: 'session',
        secret: keys.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 6, // 6 hours
            proxy: true,
        },
        store,
    })
)

server.use(fileMiddleware.single('image'))
// server.use(helmet())
server.use(compression())

server.use(cors({ ...corsOptions, optionsSuccessStatus: 200 }))
server.options('*', cors({ ...corsOptions, optionsSuccessStatus: 204 }))

server.use('/', express.static(path.join(__dirname)))
server.use('/images', express.static(path.join(__dirname, '..', 'images')))

server.use('/api/auth', require('../server/routes/auth.routes'))
server.use('/api/cart', require('../server/routes/cart.routes'))
server.use('/api/user', require('../server/routes/user.routes'))
server.use('/api/book', require('../server/routes/book.routes'))
server.use('/api/genre', require('../server/routes/genre.routes'))
server.use('/api/order', require('../server/routes/order.routes'))
server.use('/api/statistics', require('../server/routes/statistics.routes'))
server.use('/api/subscribers', require('../server/routes/subscribers.routes'))
server.use('/api', require('../server/routes/catalog.routes'))

async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
    } catch (e) {
        console.log(e)
    }
}
start()

server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        const routes = useRoutes(null)
        const location = req.url
        const context = {}
        const helmetContext = {}
        const { store } = configureStore(getInitialState(location), location)

        function renderApp() {
            const reactHtml = renderToString(
                <Provider store={store}>
                    <StaticRouter context={context} location={location}>
                        <HelmetProvider context={helmetContext}>
                            <App />
                        </HelmetProvider>
                    </StaticRouter>
                </Provider>
            )
            const reduxState = store.getState()
            const { helmet } = helmetContext

            if (context.url) {
                res.redirect(context.url)
                return
            }

            res.status(context.statusCode || 200).send(getHtml(reactHtml, reduxState, helmet))
        }

        store
            .runSaga(rootSaga)
            .toPromise()
            .then(() => renderApp())
            .catch(err => {
                throw err
            })

        const dataRequirements = []

        routes.some(route => {
            const { fetchData: fetchMethod } = route
            const match = matchPath(url.parse(location).pathname, route)

            if (match && fetchMethod) {
                dataRequirements.push(
                    fetchMethod({
                        dispatch: store.dispatch,
                        match,
                    })
                )
            }

            return Boolean(match)
        })

        return Promise.all(dataRequirements)
            .then(() => store.close())
            .catch(err => {
                throw err
            })
    })

function getHtml(reactHtml, reduxState = {}, helmet) {
    return `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" type="image/ico" href="/images/favicon.ico">
             <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Comfortaa&family=Lemonada&display=swap"
                rel="stylesheet"
            />
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        ${
            process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        </head>
        <body>
            <div id="app">${reactHtml}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
        </body>
        </html>
    `
}

export default server

// const markup = renderToString(
//     <StaticRouter context={context} location={req.url}>
//         <App />
//     </StaticRouter>
// )

// if (context.url) {
//     res.redirect(context.url)
// } else {
//     res.status(200).send(
//         `<!doctype html>
//     <html lang="ru">
//     <head>
//         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//         <meta charset="utf-8" />
//         <title>Welcome to Razzle</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1">
// ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
// ${
//     process.env.NODE_ENV === 'production'
//         ? `<script src="${assets.client.js}" defer></script>`
//         : `<script src="${assets.client.js}" defer crossorigin></script>`
// }
//     </head>
//     <body>
//         <div id="root">${markup}</div>
//     </body>
// </html>`
//     )
// }
