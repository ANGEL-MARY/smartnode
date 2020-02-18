const mongoose = require('mongoose')

const { Schema } = mongoose

const ItemSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
})

// we need to create a model using it
const Item = mongoose.model('Item', ItemSchema)

// make this available to our users in our Node applications
module.exports = Item
