const mongoose = require('mongoose')

const { Schema } = mongoose

const SellerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    range: { type: String, required: true },
    location: { type: String, required: true },
})
const Seller = mongoose.model('Seller', SellerSchema)
module.exports = Seller
