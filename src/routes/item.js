const express = require('express')
const controller = require('../controllers/item')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res) => {
    controller.getItemList(req, res)
})

router.post('/', (req, res) => {
    controller.addItemList(req, res)
})

module.exports = router