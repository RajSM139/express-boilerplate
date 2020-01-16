var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var config = require('./config');
const expressValidator = require('express-validator');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(expressValidator());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./routes')(app);
// app.use(require('./routes')(app));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// require('./utils/db');

// fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
//   require('./routes/' + file)(app);
// });

// console.info(
//   `API is now running on port ${config.server.port} in ${config.env} mode`
// );

app.listen(config.server.port, err => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

  require('./utils/db');

	console.info(
		`API is now running on port ${config.server.port} in ${config.env} mode`
	);
});

module.exports = app;
