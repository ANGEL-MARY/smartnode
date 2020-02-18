const express = require('express')

const router = express.Router()
const controller = require('../controllers/product')

/* GET users listing. */
router.get('/', (req, res) => {
    controller.productGet(req, res)
})

router.get('/all', (req, res) => {
    controller.productGetAll(req, res)
})

router.post('/', (req, res) => {
    controller.productRegistration(req, res)
})

router.patch('/update', (req, res) => {
    controller.productUpdation(req, res)
})

router.delete('/delete', (req, res) => {
    controller.productDeletion(req, res)
})

module.exports = router
