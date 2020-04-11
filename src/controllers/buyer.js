/* eslint-disable no-else-return */
/* eslint-disable no-console */
const Buyer = require('../models/buyer')
const User = require('../models/user')

async function buyerRegistration(req, res) {
    const { shopname, storetype, address, latitude, longitude } = req.body
    const { id } = req.decoded

    try {
        const user = await User.findOne({ _id: id }).exec()
        user.set('type', 'buyer')
        await user.save()
        const buyer = await Buyer.create({
            user,
            shopname,
            storetype,
            address,
            latitude,
            longitude,
        })
        if (buyer) {
            const userData = await User.findOne({ _id: id }).exec()
            userData.set('type', 'buyer')
            await userData.save()
            return res.status(200).json({
                success: true,
                data: buyer,
            })
        } else {
            return res.status(500).json({
                success: false,
                message:
                    'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}

async function buyerUpdation(req, res) {
    const { id } = req.params
    try {
        const buyer = await Buyer.findByIdAndUpdate(id, {
            ...req.body,
        })
        if (buyer) {
            return res.status(200).json({
                success: true,
                data: buyer,
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Not found',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function buyerGet(req, res) {
    const { id } = req.params
    try {
        const buyer = await Buyer.findById(id).exec()
        if (buyer) {
            return res.status(200).json({
                success: true,
                data: buyer,
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Not found',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function buyerDetails(req, res) {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id }).exec()
        const buyer = await Buyer.findOne({ user }).exec()
        if (buyer) {
            return res.status(200).json({
                success: true,
                data: buyer,
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Not found',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function buyerDeletion(req, res) {
    const { id } = req.params
    try {
        const buyer = await Buyer.findByIdAndDelete(id).exec()
        if (buyer) {
            return res.status(200).json({
                success: true,
                data: buyer,
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Not found',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}

module.exports = { buyerRegistration, buyerUpdation, buyerGet, buyerDetails, buyerDeletion }
