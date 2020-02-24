const express = require('express')

const router = express.Router()
const controller = require('../controllers/product')

/* GET users listing. */
router.get('/single/:id', (req, res) => {
    controller.productGet(req, res)
})

router.get('/all', (req, res) => {
    controller.productGetAll(req, res)
})

router.post('/', (req, res) => {
    controller.productRegistration(req, res)
})

router.patch('/:id', (req, res) => {
    controller.productUpdation(req, res)
})

router.delete('/:id', (req, res) => {
    controller.productDeletion(req, res)
})

module.exports = router
