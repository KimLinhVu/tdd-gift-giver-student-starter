const { BadRequestError } = require('../utils/errors')

const quiz = [
    {
        question: "question #1",
        answerChoices: [
          "a. first answer choice",
          "b. second answer choice",
          "c. third answer choice",
          "d. fourth answer choice",
        ],
    },
    {
        question: "question #2",
        answerChoices: [
            "a. first answer choice",
            "b. second answer choice",
            "c. third answer choice",
            "d. fourth answer choice",
        ],
    },
    {
        question: "question #3",
        answerChoices: [
            "a. first answer choice",
            "b. second answer choice",
            "c. third answer choice",
            "d. fourth answer choice",
        ],
    },
    {
        question: "question #4",
        answerChoices: [
            "a. first answer choice",
            "b. second answer choice",
            "c. third answer choice",
            "d. fourth answer choice",
        ],
    },
    {
        question: "question #5",
        answerChoices: [
            "a. first answer choice",
            "b. second answer choice",
            "c. third answer choice",
            "d. fourth answer choice",
        ],
    },
]

const score = {
    a: 0,
    b: 1,
    c: 2,
    d: 3
}

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

    static quiz() {
        return quiz
    }

    static quizResults(userAnswers) {
        let total = 0

        userAnswers.forEach(element => {
            total += score[element]
        });

        if (total < 2) {
            return "personal care"
        } else if (total < 5) {
            return "clothing"
        } else if (total < 8) {
            return "accessories"
        } else if (total < 11) {
            return "home products"
        } else if (total < 14) {
            return "consumables"
        } else {
            return "technology"
        }
    }
}

module.exports = GiftExchange