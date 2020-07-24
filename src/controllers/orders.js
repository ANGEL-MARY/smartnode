const Cart = require('../models/cart')
const Orders = require('../models/orders')

async function ordersCreateDirect(req, res) {
    const { product, current_price } = req.body
    const { id: userId } = req.decoded
    try {
        const order = await Orders.create({
            user: userId,
            product,
            current_price,
            is_sold: false,
        })
        const orderData = await Orders.findById(order._id)
            .populate({
                path: 'product',
                populate: {
                    path: 'item',
                    model: 'Item',
                },
            })
            .populate('user')
            .exec()

        console.log(orderData)
        if (orderData) {
            return res.status(200).json({
                success: true,
                data: orderData,
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
async function ordersCreate(req, res) {
    const { carts = [] } = req.body
    const { id: userId } = req.decoded

    try {
        let isOrderPlaced = true
        carts.forEach(async cartId => {
            const cart = await Cart.findById(cartId).exec()
            const { product, current_price } = cart

            const orders = await Orders.create({
                user: userId,
                product,
                current_price,
                is_sold: false,
            })
            // eslint-disable-next-line no-unneeded-ternary
            isOrderPlaced = orders ? true : false
        })

        if (isOrderPlaced) {
            return res.status(200).json({
                success: true,
                data: 'Order placed',
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
        const orders = await Orders.findById(id)
            .populate({
                path: 'product',
                populate: {
                    path: 'item',
                    model: 'Item',
                },
            })
            .populate('user')
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
async function ordersGetSeller(req, res) {
    const { id } = req.params
    try {
        const orders = await Orders.find({ seller: id })
            .populate({
                path: 'product',
                populate: {
                    path: 'item',
                    model: 'Item',
                },
            })
            .populate('user')
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
            .populate({
                path: 'product',
                populate: {
                    path: 'item',
                    model: 'Item',
                },
            })
            .populate('user')
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
    ordersCreateDirect,
}
