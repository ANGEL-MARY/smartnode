const express = require('express')
const controller = require('../controllers/authentication')
const jwt = require('../_util/jwt')

const router = express.Router()

router.post('/login', (req, res) => {
    controller.userLogin(req, res)
})

router.post('/verify', (req, res) => {
    controller.userVerify(req, res)
})

router.get('/', jwt.verifyJWTTokenIsUser, (req, res) => {
    controller.getUser(req, res)
})

module.exports = router
