var mongoose = require('mongoose');
var config = require('../../config');

mongoose.Promise = global.Promise;

const connection = mongoose.connect(config.database.uri, { useNewUrlParser: true, useUnifiedTopology: true });

connection
	.then(db => {
		console.info(
			`Successfully connected to ${config.database.uri} MongoDB cluster in ${
				config.env
			} mode.`,
		);
		return db;
	})
	.catch((err) => {
		if (err.message.code === 'ETIMEDOUT') {
			console.info('Attempting to re-establish database connection.');
			mongoose.connect(config.database.uri, {useNewUrlParser: true, useUnifiedTopology: true });
		} else {
			console.error('Error while attempting to connect to database:');
			console.error(err);
		}
	});

module.exports = connection;
