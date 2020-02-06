const Cart = require('../models/cart')



async function cartRegistration(req, res) {
    const { range, address, latitude, longitude } = req.body

    try {
        const cart = await Cart.create({
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