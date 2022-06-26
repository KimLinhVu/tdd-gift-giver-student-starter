const express = require('express')
const GiftGiver = require('../models/gift-exchange')
const router = express.Router()

router.get('/', (req, res, next) => {
    try {
        const data = GiftGiver.quiz()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/', (req, res, next) => {
    try {
        const data = GiftGiver.quizResults(req.body.userAnswers)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

module.exports = router