/* eslint-disable no-console */
const Buyer = require('../models/buyer')



async function buyerRegistration(req, res) {
    const { shopname, storetype, address, latitude, longitude } = req.body

    try {
        const buyer = await Buyer.create({
            shopname,
            storetype,
            address,
            latitude,
            longitude,

        })
        if (buyer) {
            return res.status(200).json({
                success: true,
                data: buyer
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function buyerUpdation(req, res) {
    const { id } = req.params
    try {
        const buyer = await Buyer.findByIdAndUpdate(id, {
            ...req.body
        })
        if (buyer) {
            return res.status(200).json({
                success: true,
                data: buyer
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
            message: 'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
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
                data: buyer
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
            message: 'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function buyerGetAll(req, res) {
    const { id } = req.params
    try {
        const buyer = await Buyer.find().exec()
        if (buyer) {
            return res.status(200).json({
                success: true,
                data: buyer
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
            message: 'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
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
                data: buyer
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
            message: 'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}




module.exports = { buyerRegistration, buyerUpdation, buyerGet, buyerGetAll, buyerDeletion }