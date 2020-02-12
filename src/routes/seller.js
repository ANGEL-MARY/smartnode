const express = require('express')

const router = express.Router()
const controller = require('../controllers/seller')

/* GET users listing. */
router.get('/', (req, res) => {
    controller.sellerGet(req, res)
})

router.get('/', (req, res) => {
    controller.sellerGet(req, res)
})

router.post('/registration', (req, res) => {
    controller.sellerRegitration(req, res)
})

router.patch('/update', (req, res) => {
    controller.sellerUpdation(req, res)
})

router.delete('/delete', (req, res) => {
    controller.sellerDeletion(req, res)
})




module.exports = router