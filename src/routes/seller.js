const express = require('express')
const jwt = require('../_util/jwt')
const controller = require('../controllers/seller')

const router = express.Router()

router.get('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.sellerDetails(req, res)
})

router.get('/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.sellerGet(req, res)
})

router.post('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.sellerRegistration(req, res)
})

router.patch('/update/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.sellerUpdate(req, res)
})

router.delete('/delete/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.sellerDeletion(req, res)
})

module.exports = router
