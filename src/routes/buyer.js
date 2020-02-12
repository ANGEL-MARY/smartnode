const express = require('express')

const router = express.Router()
const controller = require('../controllers/buyer')

/* GET users listing. */
router.get('/', (req, res) => {
    controller.buyerGet(req, res)
})
router.get('/', (req, res) => {
    controller.buyerGet(req, res)
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