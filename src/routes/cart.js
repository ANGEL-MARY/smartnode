const express = require('express')
const jwt = require('../_util/jwt')

const router = express.Router()
const controller = require('../controllers/cart')

/* GET users listing. */
router.get('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.cartGetAll(req, res)
})
router.get('/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.cartGet(req, res)
})

router.post('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.addCart(req, res)
})

router.patch('/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.cartUpdate(req, res)
})

router.delete('/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.cartDeletion(req, res)
})

module.exports = router
