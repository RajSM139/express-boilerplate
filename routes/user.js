var User = require('../controllers/user');

module.exports = app => {
	app.get("/health-check", (req, res) => {
		console.log('He');
	  res.send({ success: true, message: "Test Success" });
	});
	app.get('/user/check-user/:adhaar', User.checkUser);
	app.post('/user/create-user', User.validate('createUser'), User.createUser);

	//other routes..
}
