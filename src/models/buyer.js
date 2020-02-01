const mongoose = require('mongoose')

const { Schema } = mongoose

const BuyerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    shopname: { type: String, required: true },
    storetype: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },

})
const Buyer = mongoose.model('Buyer', BuyerSchema)
module.exports = Buyer