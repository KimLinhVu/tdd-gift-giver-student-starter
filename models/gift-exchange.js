const { BadRequestError } = require('../utils/errors')

function getRandomIdx(length) {
    return Math.floor(Math.random() * length)
}

class GiftExchange {
    static pairs(names) {
        if (names.length % 2 !== 0) {
            throw new BadRequestError()
        }
        const result = []
        
        while (names.length > 0) {
            const pair = []
            while (pair.length < 2) {
                const randomIdx = Math.floor(Math.random() * names.length)
                const name = names[randomIdx]
                names.splice(randomIdx, 1)
                pair.push(name)
            }
            result.push(pair)
        }

        return result
    }

    static traditional(names) {
        const result = []

        const randomIdx = getRandomIdx(names.length)
        let firstGiver = names[randomIdx]
        let firstTime = true
        names.splice(randomIdx, 1)
        let giver = ''
        let receiver = ''

        while (names.length > 0) {
            if (firstTime) {
                giver = firstGiver
                firstTime = false
            } else {
                giver = receiver
            }

            const idx = getRandomIdx(names.length)
            receiver = names[idx]
            names.splice(idx, 1)
            
            result.push(`${giver} is giving a gift to ${receiver}`)

            if (names.length === 0) {
                result.push(`${receiver} is giving a gift to ${firstGiver}`)
            }
        }

        return result
    }
}

module.exports = GiftExchange