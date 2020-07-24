// const jwt = require('jsonwebtoken')

const logger = require('../_config/logger')
const config = require('../_config/_config')

const phoneVerification = require('../_util/_phoneVerification')({ apiKey: config.API_KEY })

const User = require('../models/user')

async function userSignIn(req, res) {
    try {
        const { phone, via, type, country_code } = req.body
        const { email, uid } = req.decoded
        if (phone && via) {
            const user =
                (await User.findById(uid).exec()) ||
                (await User.create({ phone, email, uid, type }))
            if (user) {
                phoneVerification.requestToken(phone, via, country_code, async err => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: `Yikes! An error occurred, we are sending expert monkeys to handle the situation ${err}`,
                        })
                    }
                    return res.status(200).json({
                        success: true,
                    })
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Bad request',
            })
        }
    } catch (error) {
        logger.error({ name: error.name, message: error.message })
        res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert monkeys to handle the situation ',
        })
    }
}

async function userVerify(req, res) {
    try {
        const { otp, phone, country_code } = req.body
        const user = await User.findOne({ phone }).exec()
        if (otp && user) {
            phoneVerification.verifyToken(phone, otp, country_code, async (err, response) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message:
                            'Yikes! An error occurred, we are sending expert monkeys to handle the situation ',
                    })
                } else if (response.success) {
                    user.set('verified', true)
                    await user.save()
                    res.status(200).json(response)
                } else {
                    res.status(202).json({
                        success: false,
                        message: 'invalid verification code',
                    })
                }
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Bad request',
            })
        }
    } catch (error) {
        logger.error(error)
        res.json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert monkeys to handle the situation ',
        })
    }
}

async function retry(req, res) {
    try {
        const { phone, via, country_code } = req.body

        if (phone && via) {
            // eslint-disable-next-line no-unused-vars
            phoneVerification.verifyToken(phone, via, country_code, async (err, response) => {
                if (err) {
                    logger.error(err.message)
                    res.status(500).json({
                        success: false,
                        message:
                            'Yikes! An error occurred, we are sending expert monkeys to handle the situation ',
                    })
                } else {
                    res.status(200).json({
                        success: true,
                    })
                }
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Bad request',
            })
        }
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert monkeys to handle the situation ',
        })
    }
}

module.exports = { userSignIn, userVerify, retry }
