const express = require('express')
const morgan = require('morgan')
const giftExchangeRouter = require('./routes/gift-exchange')
const quizRouter = require('./routes/quiz')
const { NotFoundError } = require('./utils/errors')

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use('/gift-exchange', giftExchangeRouter)
app.use('/quiz', quizRouter)

app.get('/', (req, res, next) => {
    res.status(200).json({ping: "pong"})
})

function genericErrorHandler(error, req, res, next) {
    const status = error.status || 500
    const message = error.message || "Something wen't wrong in the application"

    return res.status(status).json({error: {message: message, status: status}})
}

function fourZeroFourHandler(req, res, next) {
    return next(new NotFoundError())
}

app.use(fourZeroFourHandler)
app.use(genericErrorHandler)

module.exports = app