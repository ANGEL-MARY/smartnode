const express = require('express')
const jwt = require('../_util/jwt')
const controller = require('../controllers/buyer')

const router = express.Router()

/* GET users listing. */
router.get('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.buyerDetails(req, res)
})

router.post('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.buyerRegistration(req, res)
})

router.get('/:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.buyerGet(req, res)
})

router.patch('/update:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.buyerUpdation(req, res)
})

router.delete('/delete:id', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.buyerDeletion(req, res)
})

module.exports = router
