const express = require('express')

const router = express.Router()
const controller = require('../controllers/cart')

/* GET users listing. */
router.get('/', (req, res) => {
    controller.cartGetAll(req, res)
})
router.get('/:id', (req, res) => {
    controller.cartGet(req, res)
})

router.post('/', (req, res) => {
    controller.addCart(req, res)
})

router.patch('/:id', (req, res) => {
    controller.cartUpdate(req, res)
})

router.delete('/:id', (req, res) => {
    controller.cartDeletion(req, res)
})

module.exports = router
