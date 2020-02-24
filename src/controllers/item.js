const Item = require('../models/items')
const uploadUtil = require('../_util/upload')

async function getItemList(req, res) {
    try {
        const itemList = await Item.find().exec()
        res.status(200).json({
            success: true,
            data: itemList,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:
                'Yikes! An error occured, we are sending expert monkeys to handle the situation ',
        })
    }
}

async function addItemList(req, res) {
    try {
        uploadUtil.upload(req, res, async err => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message:
                        'Yikes! An error occured, we are sending expert monkeys to handle the situation ',
                })
            }

            const { name } = req.body
            console.log(name)
            if (name) {
                const item = await Item.create({
                    name,
                    image: `media/${req.files[0].filename}`,
                })

                res.status(200).json({
                    success: true,
                    data: item,
                })
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'Bad request',
                })
            }
        })
    } catch (error) {
         console.log(error)
        res.status(500).json({
            success: false,
            message:
                'Yikes! An error occured, we are sending expert monkeys to handle the situation ',
        })
    }
}

module.exports = { getItemList, addItemList }
