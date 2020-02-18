/* eslint-disable no-else-return */
const Product = require('../models/product')
const Item = require('../models/itmes')

async function productRegistration(req, res) {
    const { seller, name, price, item, sell_method, packet_weight, stock_details } = req.body

    try {
        const itemObject = await Item.findOne({ _id: item }).exec()
        const product = await Product.create({
            item: itemObject,
            seller,
            name,
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
        const product = await Product.findById(id).exec()
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
