const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamps')

const { Schema } = mongoose

const OrdersSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller' },
    current_price: { type: Number, required: true },
    delivery_status: {
        type: String,
        enum: ['accepted', 'order_taken', 'delivered', 'canceled', 'rejected', 'pending'],
        required: true,
        default: 'pending',
    },
})

OrdersSchema.plugin(timestamps)
const Orders = mongoose.model('Orders', OrdersSchema)
module.exports = Orders
