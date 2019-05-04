const mongoose = require('mongoose')

const { Schema } = mongoose

const StatsSchema = new Schema({
	url: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	accessDate: {
		type: Date,
		required: true,
		unique: false
	}
})

const StatsModel = mongoose.model('stat', StatsSchema)

module.exports = StatsModel
