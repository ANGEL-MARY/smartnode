const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'Seller' },
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    price: { type: String, required: true },
    sell_method: {
        type: String,
        required: true,
        enum: ['packet', 'loose'],
    },
    packet_weight: { type: Number },
    stock_details: { type: String, required: true },
})
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
