require('dotenv').config({ path: './.env' });

module.exports = {
	env: process.env.NODE_ENV || 'development',
	database: {
		uri: `YOUR MONGO URI`
	},
	server: {
		port: 2000
	}
};
