/* eslint-disable consistent-return */
const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamps')

const { Schema } = mongoose

const UserSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    is_verified: { type: Boolean, required: true, default: false },
    type: {
        type: String,
        enum: ['seller', 'buyer'],
    },
})

UserSchema.plugin(timestamps)

const User = mongoose.model('User', UserSchema)

// make this available to our users in our Node applications
module.exports = User
