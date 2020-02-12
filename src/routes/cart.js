const express = require('express')

const router = express.Router()
const controller = require('../controllers/cart')

/* GET users listing. */
router.get('/', (req, res) => {
    controller.cartGet(req.res)
})
router.get('/', (req, res) => {
    controller.cartGet(req.res)
})


router.post('/registration', (req, res) => {
    controller.cartRegitration(req, res)
})

router.patch('/update', (req, res) => {
    controller.cartUpdation(req, res)
})

router.delete('/delete', (req, res) => {
    controller.cartDeletion(req, res)
})




module.exports = router