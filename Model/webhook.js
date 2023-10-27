const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	events: {
		type: [String],
		required: true,
	},
});

module.exports = mongoose.model('Webhook', webhookSchema);
