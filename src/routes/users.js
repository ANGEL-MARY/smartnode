const express = require('express')

const router = express.Router()
const controller =  require('../controllers/authentication')

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource')
})

router.post('/login', (req, res) => {
    controller.userLogin(req, res)
})

module.exports = router
