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
        if (cart) {
            return res.status(200).json({
                success: true,
                data: cart,
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
async function cartUpdation(req, res) {
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
        const cart = await Cart.findById(id).exec()
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
            .populate('product')
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

module.exports = { addCart, cartDeletion, cartGet, cartGetAll, cartUpdation }
