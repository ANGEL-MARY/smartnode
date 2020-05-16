const express = require('express')

const router = express.Router()
const controller = require('../controllers/orders')

/* GET users listing. */
router.get('/', (req, res) => {
    controller.ordersGetAll(req, res)
})

router.get('/:id/seller', (req, res) => {
    controller.ordersGetSeller(req, res)
})
router.get('/:id', (req, res) => {
    controller.ordersGet(req, res)
})

router.post('/', (req, res) => {
    controller.ordersCreate(req, res)
})

router.patch('/:id', (req, res) => {
    controller.orderUpdate(req, res)
})

router.delete('/:id', (req, res) => {
    controller.orderDelete(req, res)
})

module.exports = router
