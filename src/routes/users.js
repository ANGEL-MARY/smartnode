const express = require('express')
const controller = require('../controllers/authentication')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource')
})

router.post('/login', (req, res) => {
    controller.userLogin(req, res)
})

module.exports = router
