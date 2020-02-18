require('dotenv').config()
// ------ Plugin Imports ------///
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
// const firebaseAdmin = require('firebase-admin')
const morgan = require('morgan')
const fs = require('fs')
const rfs = require('rotating-file-stream')

const logDirectory = path.join(__dirname, 'logs')
// eslint-disable-next-line no-unused-expressions
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
const accessLogStream = rfs('requests.log', {
    interval: '1d', // rotate daily
    path: logDirectory,
})

// ------ App imports ------///
// eslint-disable-next-line no-unused-vars
const db = require('./_config/db')

// ------ Router imports ------///
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const sellerRouter = require('./routes/seller')
const itemRouter = require('./routes/item')
const productRouter = require('./routes/product')

// ------ Firebase ------///
// const firebaseConfig = require('./_config/firebase-config')

// firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(firebaseConfig),
//     databaseURL: 'https://studywiseapp.firebaseio.com',
// })

// ------ Express ------///
const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'media'))) // setting middleware
app.use('/media', express.static(`${__dirname}/media`))
console.log(`${__dirname}/media`)

// ------ APIs ------///
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/seller', sellerRouter)
app.use('/items', itemRouter)
app.use('/products', productRouter)

// Morgan logger
app.use(
    morgan('dev', {
        skip(req, res) {
            return res.statusCode < 200
        },
    }),
)
app.use(morgan('tiny', { stream: accessLogStream }))

module.exports = app
