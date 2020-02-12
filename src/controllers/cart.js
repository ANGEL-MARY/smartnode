const Cart = require('../models/cart')



async function cartRegistration(req, res) {
    const { product, current_price, is_sold } = req.body

    try {
        const cart = await Cart.create({
            product,
            current_price,
            is_sold,


        })
        if (cart) {
            return res.status(200).json({
                success: true,
                data: cart
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
async function cartUpdation(req, res) {
    const { id } = req.params
    try {
        const cart = await Cart.findByIdAndUpdate(id, {
            ...req.body
        })
        if (cart) {
            return res.status(200).json({
                success: true,
                data: cart
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
async function cartGet(req, res) {
    const { id } = req.params
    try {
        const product = await Product.findById(id).exec()
        if (product) {
            return res.status(200).json({
                success: true,
                data: product
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
async function cartGetAll(req, res) {
    const { id } = req.params
    try {
        const cart = await Cart.find().exec()
        if (cart) {
            return res.status(200).json({
                success: true,
                data: cart
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
async function cartDeletion(req, res) {
    const { id } = req.params
    try {
        const cart = await Cart.findByIdAndDelete(id).exec()
        if (cart) {
            return res.status(200).json({
                success: true,
                data: cart
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