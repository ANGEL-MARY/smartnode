/* eslint-disable no-console */
const User = require('../models/user')
const config = require('../_config/_config')
console.log(config.API_KEY)

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
        const { otp, phone, country_code } = req.body
        const user = await User.findOne({ phone }).exec()
        if (otp && user) {
            phoneVerification.verifyToken(phone, otp, country_code, async(err, response) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
                    })
                } else if (response.success) {
                    user.set('is_verified', true)
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
        res.json({
            success: false,
            message: 'Yikes! An error occurred, we are sending expert monkeys to handle the situation ',
        })
    }
}

module.exports = { userLogin, userVerify }