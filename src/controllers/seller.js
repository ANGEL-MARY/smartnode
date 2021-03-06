/* eslint-disable no-else-return */
const Seller = require('../models/seller')
const User = require('../models/user')

async function sellerRegistration(req, res) {
    const { range, address, latitude, longitude } = req.body
    const { id } = req.decoded

    try {
        const user = await User.findOne({ _id: id }).exec()
        const seller = await Seller.create({
            user,
            range,
            address,
            latitude,
            longitude,
        })
        if (seller) {
            user.set('type', 'seller')
            await user.save()
            return res.status(200).json({
                success: true,
                data: seller,
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
async function sellerUpdate(req, res) {
    const { id } = req.params
    try {
        const seller = await Seller.findByIdAndUpdate(id, {
            ...req.body,
        })
        if (seller) {
            return res.status(200).json({
                success: true,
                data: seller,
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
async function sellerGet(req, res) {
    try {
        const user = await User.find({ phone: '9633498059' }).exec()
        const seller = await Seller.find({ 'user.phone': '9633498059' }).exec()
        if (seller) {
            return res.status(200).json({
                success: true,
                data: seller,
                user,
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
async function sellerDetails(req, res) {
    const { id } = req.decoded
    try {
        const user = await User.findOne({ _id: id }).exec()
        const seller = await Seller.findOne({ user }).exec()
        if (seller) {
            return res.status(200).json({
                success: true,
                data: seller,
            })
        } else {
            return res.status(404).json({
                success: false,
                message: user,
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
async function sellerDeletion(req, res) {
    const { id } = req.params
    try {
        const seller = await Seller.findByIdAndDelete(id).exec()
        if (seller) {
            return res.status(200).json({
                success: true,
                data: seller,
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

module.exports = { sellerRegistration, sellerUpdate, sellerGet, sellerDetails, sellerDeletion }
