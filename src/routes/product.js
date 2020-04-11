const express = require('express')
const jwt = require('../_util/jwt')

const router = express.Router()
const controller = require('../controllers/product')

/* GET users listing. */
router.get('/single/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.productGet(req, res)
})

router.get('/all', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.productGetAll(req, res)
})

router.post('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.productRegistration(req, res)
})

router.patch('/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.productUpdation(req, res)
})

router.delete('/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.productDeletion(req, res)
})

module.exports = router
