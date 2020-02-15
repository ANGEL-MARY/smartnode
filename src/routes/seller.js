const express = require('express')

const router = express.Router()
const controller = require('../controllers/seller')

router.get('/', (req, res) => {
    controller.sellerGet(req, res)
})

router.post('', (req, res) => {
    controller.sellerRegistration(req, res)
})

router.patch('/update', (req, res) => {
    controller.sellerUpdate(req, res)
})

router.delete('/delete', (req, res) => {
    controller.sellerDeletion(req, res)
})

module.exports = router
