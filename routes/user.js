var User = require('../controllers/user');

module.exports = app => {

	app.get('/user/check-user/:adhaar', User.checkUser);
	app.post('/user/create-user', User.validate('createUser'), User.createUser);

	//other routes..
}