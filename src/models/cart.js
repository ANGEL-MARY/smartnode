const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamps')

const { Schema } = mongoose

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    current_price: { type: Number, required: true },
    is_sold: { type: Boolean, required: true, default: false },
})

CartSchema.plugin(timestamps)
const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart