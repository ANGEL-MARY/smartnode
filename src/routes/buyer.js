const express = require('express')

const router = express.Router()
const controller = require('../controllers/authentication')

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource')
})

router.post('/registration', (req, res) => {
    controller.buyerRegitration(req, res)
})

router.patch('/update', (req, res) => {
    controller.buyerUpdation(req, res)
})

router.delete('/delete', (req, res) => {
    controller.buyerDeletion(req, res)
})




module.exports = router