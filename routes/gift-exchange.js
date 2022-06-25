const express = require("express")
const router = express.Router()
const GiftExchange = require('../models/gift-exchange')
const { BadRequestError } = require("../utils/errors")

router.post('/pairs', (req, res, next) => {
    try {
        if (!req.body || !req.body.names) {
            next(new BadRequestError())
        } else {
            let data = GiftExchange.pairs(req.body.names)
            res.status(200).json(data)
        }
    } catch (error) {
        next(error)
    }
})

router.post('/traditional', (req, res, next) => {
    try {
        if (!req.body || !req.body.names) {
            next(new BadRequestError())
        } else {
            let data = GiftExchange.traditional(req.body.names)
            res.status(200).json(data)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router