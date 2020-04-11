/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const config = require('../_config/_config')

const phoneVerification = require('../_util/_phoneVerification')({ apiKey: config.API_KEY })

async function userLogin(req, res) {
    const { name, phone, via } = req.body
    const country_code = 91
    try {
        const user =
            (await User.findOne({ phone }).exec()) ||
            User.create({
                phone,
                name,
            })
        if (user) {
            phoneVerification.requestToken(phone, via, country_code, async err => {
                if (err) {
                    console.log(err)
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
    } catch (error) {
        console.log(error)
    }
}

async function userVerify(req, res) {
    try {
        const { otp, phone } = req.body

        const country_code = 91
        const user = await User.findOne({ phone }).exec()
        if (otp && user) {
            phoneVerification.verifyToken(phone, otp, country_code, async (err, response) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({
                        success: false,
                        message:
                            'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
                    })
                } else if (response.success) {
                    user.set('is_verified', true)
                    await user.save()
                    const jwtPayload = { phone: user.phone, id: user._id }
                    const jwtToken = await jwt.sign(jwtPayload, config.SECRET, {
                        expiresIn: '7d', // expires in 7 days
                    })
                    return res.status(200).json({
                        success: true,
                        access_token: jwtToken,
                        user,
                    })
                } else {
                    return res.status(202).json({
                        success: false,
                        message: 'invalid verification code',
                    })
                }
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'Bad request',
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert monkeys to handle the situation ',
        })
    }
}

async function retry(req, res) {
    try {
        const { phone, via } = req.body

        const country_code = 91

        if (phone && via) {
            phoneVerification.requestToken(phone, via, country_code, async err => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        success: false,
                        message: `Yikes! An error occurred, we are sending expert monkeys to handle the situation ${err}`,
                    })
                }
                return res.status(200).json({
                    success: true,
                })
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Bad request',
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert monkeys to handle the situation ',
        })
    }
}

async function getUser(req, res) {
    try {
        const { id } = req.decoded
        const user = await User.findOne({ _id: id }).exec()
        if (user) {
            return res.status(200).json({
                success: true,
                data: user,
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'Bad request',
            })
        }
    } catch (u) {
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert monkeys to handle the situation ',
        })
    }
}

module.exports = { userLogin, userVerify, retry, getUser }
