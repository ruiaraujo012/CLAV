const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatsSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    accessDate: {
        type: Date,
        required: true,
        unique: true
    }
})

const StatsModel = mongoose.model('stat', StatsSchema)

module.exports = StatsModel