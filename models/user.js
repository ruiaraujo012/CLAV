const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Boolean,
        required: true,
        default: 0 // 1 -> admin, 0 -> normal ...
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel