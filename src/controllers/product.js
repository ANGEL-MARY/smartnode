const Product = require('../models/product')



async function productRegistration(req, res) {
    const { seller, name, price } = req.body

    try {
        const product = await Product.create({
            seller,
            name,
            price,

        })
        if (product) {
            return res.status(200).json({
                success: true,
                data: product
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
async function productUpdation(req, res) {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndUpdate(id, {
            ...req.body
        })
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
async function productGet(req, res) {
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
async function productGetAll(req, res) {
    const { id } = req.params
    try {
        const product = await Product.find().exec()
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
async function productDeletion(req, res) {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndDelete(id).exec()
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
