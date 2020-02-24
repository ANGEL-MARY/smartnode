/* eslint-disable no-else-return */
const Product = require('../models/product')
const Item = require('../models/items')
const Seller = require('../models/seller')

async function productRegistration(req, res) {
    const { price, item, sell_method, packet_weight, stock_details } = req.body
    const { id } = req.decoded

    try {
        const itemObject = await Item.findOne({ _id: item }).exec()
        const seller = await Seller.findOne({ user: id }).exec()
        const product = await Product.create({
            item: itemObject,
            seller,
            price,
            sell_method,
            packet_weight,
            stock_details,
        })
        if (product) {
            return res.status(200).json({
                success: true,
                data: product,
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
async function productUpdation(req, res) {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndUpdate(id, {
            ...req.body,
        })
        if (product) {
            return res.status(200).json({
                success: true,
                data: product,
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
async function productGet(req, res) {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
            .populate('item')
            .populate('seller')
            .exec()
        if (product) {
            return res.status(200).json({
                success: true,
                data: product,
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
async function productGetAll(req, res) {
    try {
<<<<<<< HEAD
        console.log("hi")
=======
>>>>>>> 39fd2c0fdbafa520655dd66cff1e87e4fe17aea9
        const product = await Product.find()
            .populate('item')
            .exec()
        if (product) {
            return res.status(200).json({
                success: true,
                data: product,
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
async function productDeletion(req, res) {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndDelete(id).exec()
        if (product) {
            return res.status(200).json({
                success: true,
                data: product,
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

module.exports = {
    productRegistration,
    productGet,
    productGetAll,
    productUpdation,
    productDeletion,
}
