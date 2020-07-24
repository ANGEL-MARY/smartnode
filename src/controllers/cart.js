const Cart = require('../models/cart')

async function addCart(req, res) {
    const { product, current_price } = req.body
    const { id } = req.decoded

    try {
        const cart = await Cart.create({
            user: id,
            product,
            current_price,
            is_sold: false,
        })

        const cartData = await Cart.findById(cart._id)
            .populate({
                path: 'product',
                populate: {
                    path: 'item',
                    model: 'Item',
                },
            })
            .exec()

        if (cartData) {
            return res.status(200).json({
                success: true,
                data: cartData,
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
async function cartUpdate(req, res) {
    const { id } = req.params

    try {
        const cart = await Cart.findByIdAndUpdate(id, {
            ...req.body,
        })
        if (cart) {
            return res.status(200).json({
                success: true,
                data: cart,
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
async function cartGet(req, res) {
    const { id } = req.params
    try {
        const cart = await Cart.findById(id)
            .populate({
                path: 'product',
                populate: {
                    path: 'item',
                    model: 'Item',
                },
            })
            .exec()
        if (cart) {
            return res.status(200).json({
                success: true,
                data: cart,
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
async function cartGetAll(req, res) {
    const { id } = req.decoded
    try {
        const cart = await Cart.find({ user: id, is_sold: false })
            .populate({
                path: 'product',
                populate: {
                    path: 'item',
                    model: 'Item',
                },
            })
            .exec()
        if (cart) {
            return res.status(200).json({
                success: true,
                data: cart,
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
async function cartDeletion(req, res) {
    const { id } = req.params
    try {
        const cart = await Cart.findByIdAndDelete(id).exec()
        console.log(cart)
        if (cart) {
            return res.status(200).json({
                success: true,
                data: {
                    deleted_id: cart._id,
                },
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

module.exports = { addCart, cartDeletion, cartGet, cartGetAll, cartUpdate }
