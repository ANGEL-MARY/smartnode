const Seller = require('../models/seller')



async function sellerRegistration(req, res) {
    const { range, address, latitude, longitude } = req.body

    try {
        const seller = await Seller.create({
            range,
            address,
            latitude,
            longitude,

        })
        if (seller) {
            return res.status(200).json({
                success: true,
                data: seller
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
async function sellerUpdation(req, res) {
    const { id } = req.params
    try {
        const seller = await Seller.findByIdAndUpdate(id, {
            ...req.body
        })
        if (seller) {
            return res.status(200).json({
                success: true,
                data: seller
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
async function sellerGet(req, res) {
    const { id } = req.params
    try {
        const seller = await Seller.findById(id).exec()
        if (seller) {
            return res.status(200).json({
                success: true,
                data: seller
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
async function sellerGetAll(req, res) {
    const { id } = req.params
    try {
        const seller = await Seller.find().exec()
        if (seller) {
            return res.status(200).json({
                success: true,
                data: seller
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
async function sellerDeletion(req, res) {
    const { id } = req.params
    try {
        const seller = await Seller.findByIdAndDelete(id).exec()
        if (seller) {
            return res.status(200).json({
                success: true,
                data: seller
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

module.exports = { sellerRegistration, sellerUpdation, sellerGet, sellerGetAll, sellerDeletion }