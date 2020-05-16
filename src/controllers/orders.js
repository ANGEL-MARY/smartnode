const Cart = require('../models/cart')
const Orders = require('../models/orders')

async function ordersCreate(req, res) {
    const { cart: id } = req.body
    const { id: userId } = req.decoded

    try {
        const cart = await Cart.findById(id).exec()
        const { product, current_price } = cart

        const orders = await Orders.create({
            user: userId,
            product,
            current_price,
            is_sold: false,
        })
        if (orders) {
            return res.status(200).json({
                success: true,
                data: orders,
            })
        }
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function orderUpdate(req, res) {
    const { id } = req.params
    try {
        const order = await Orders.findByIdAndUpdate(id, {
            ...req.body,
        })
        if (order) {
            return res.status(200).json({
                success: true,
                data: order,
            })
        }
        return res.status(404).json({
            success: false,
            message: 'Not found',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function ordersGet(req, res) {
    const { id } = req.params
    try {
        const orders = await Orders.findById(id).exec()
        if (orders) {
            return res.status(200).json({
                success: true,
                data: orders,
            })
        }
        return res.status(404).json({
            success: false,
            message: 'Not found',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function ordersGetSeller(req, res) {
    const { id } = req.params
    try {
        const orders = await Orders.find({ seller: id })
            .populate('product')
            .exec()
        if (orders) {
            return res.status(200).json({
                success: true,
                data: orders,
            })
        }
        return res.status(404).json({
            success: false,
            message: 'Not found',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function ordersGetAll(req, res) {
    const { id } = req.decoded
    try {
        const orders = await Orders.find({ user: id })
            .populate('product')
            .exec()
        if (orders) {
            return res.status(200).json({
                success: true,
                data: orders,
            })
        }
        return res.status(404).json({
            success: false,
            message: 'Not found',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:
                'Yikes! An error occurred, we are sending expert donkeys to handle the situation ',
        })
    }
}
async function orderDelete(req, res) {
    const { id } = req.params
    try {
        const order = await Orders.findByIdAndDelete(id).exec()
        if (order) {
            return res.status(200).json({
                success: true,
                data: order,
            })
        }
        return res.status(404).json({
            success: false,
            message: 'Not found',
        })
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
    ordersCreate,
    orderDelete,
    ordersGet,
    ordersGetAll,
    ordersGetSeller,
    orderUpdate,
}
