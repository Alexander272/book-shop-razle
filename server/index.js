const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')
const cors = require('cors')

const keys = require('./keys')
const fileMiddleware = require('./middleware/file.middleware')

const app = express()

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

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
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

app.use(fileMiddleware.single('image'))
app.use(helmet())
app.use(compression())

app.set('trust proxy', 'loopback, 127.0.0.1')

app.use(cors({ ...corsOptions, optionsSuccessStatus: 200 }))
app.options('*', cors({ ...corsOptions, optionsSuccessStatus: 204 }))

app.use('/auth', require('./routes/auth.routes'))
app.use('/cart', require('./routes/cart.routes'))
app.use('/user', require('./routes/user.routes'))
app.use('/book', require('./routes/book.routes'))
app.use('/genre', require('./routes/genre.routes'))
app.use('/order', require('./routes/order.routes'))
app.use('/statistics', require('./routes/statistics.routes'))
app.use('/subscribers', require('./routes/subscribers.routes'))
app.use('', require('./routes/catalog.routes'))

const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()
