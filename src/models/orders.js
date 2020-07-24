const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamps')

const { Schema } = mongoose

const OrdersSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    current_price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    status: {
        type: String,
        enum: ['accepted', 'delivered', 'rejected', 'pending'],
        required: true,
        default: 'pending',
    },
})

OrdersSchema.plugin(timestamps)
const Orders = mongoose.model('Orders', OrdersSchema)
module.exports = Orders
