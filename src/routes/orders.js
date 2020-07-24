const express = require('express')

const router = express.Router()
const controller = require('../controllers/orders')
const jwt = require('../_util/jwt')

/* GET users listing. */
router.get('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.ordersGetAll(req, res)
})

router.get('/:id/seller', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.ordersGetSeller(req, res)
})
router.get('/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.ordersGet(req, res)
})

router.post('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.ordersCreate(req, res)
})

router.post('/buy_now', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.ordersCreateDirect(req, res)
})
router.patch('/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.orderUpdate(req, res)
})

router.delete('/:id', (req, res) => {
    controller.orderDelete(req, res)
})

module.exports = router
