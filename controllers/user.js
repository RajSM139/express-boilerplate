var User = require('../models/user');
const { body } = require('express-validator/check');
const { validationResult } = require('express-validator/check');

const validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
				body('adhaar', 'Adhaar is required').exists(),
				body('adhaar').isInt(),
				body('name', `Name is required`).exists(),
				body('mobile', `Mobile is required and should be a number`).exists().isInt(),
				body('dob', `DOB is required`).exists(),
				body('altMobile', `Alternative Mobile is required and should be a number`).exists().isInt(),
				body('email', `Email should be a valid email`).optional().isEmail(),
				body('gender').exists().isIn(['Male', 'Female']),
				body('source').exists().isIn(['Event', 'Roadshow', 'Referral', 'Word of mouth', 'Press']),
				body('srcType').exists().isIn(['Inbound', 'Outbound']),
				body('empStatus').exists().isIn(['Self-employed', 'Unemployed', 'Employed']),
				body('occupation').exists().isIn(['Farmer', 'Mason', 'Poultry Farmer', 'Shopkeeper', 'Mechanic', 'Teacher', 'Housewife']),
				body('currentAnnualIncome').exists().isIn(['<2 lacs/annum', '2-5 lacs/annum', '5-10 lacs/annum', '10-20 lacs/annum', '>20 lacs/annum']),
				body('eduQual').exists().isIn(['Never went to school', '5th pass', '8th pass', '10th pass', '12th pass', 'Diploma', 'Graduate', 'Post-graduate']),
				body('sucEnt').exists().isInt(),
				// body('faiEnt').exists().isInt(),
				// body('bankAcc', `Adhaar is required and should be a number`).exists().isInt(),
				// body('creditHis', `Adhaar is required and should be a number`).exists().isInt(),
				// body('assets', `Adhaar is required and should be a number`).exists().isInt(),
				// body('training', `Adhaar is required and should be a number`).exists().isInt(),
				// body('status', `Adhaar is required and should be a number`).exists().isInt(),
       ]   
    }
  }
}

const checkUser = async(req, res) => {
	try {
		const adhaar = req.params;
		console.log(adhaar.adhaar);
		// const data = await User.apiQuery()
		// 	.select('name adhaar');
		const data = await User.find({name: 'Rajesh Mishra'}, 'name email');
		res.send({success: true, data});
	} catch(e) {
		console.log(e);
		res.send({error: true, message: 'API Error'});
	}
};

const createUser = async(req, res) => {
	try {
		const errors = validationResult(req);
		// console.log(errors);
		if (!errors.isEmpty()) {
			let errs = errors.array();
			const errMsgs = [];
			errs = errs.map((i) => {
				console.log(i);
				if(i.value) {
					errMsgs.push(`${i.param}: ${i.value} is ${i.msg}`);
				} else {
					errMsgs.push(`${i.param}: ${i.msg}`);
				}
			});
			res.status(422).send({ errMsgs });
		} else {
			const data = req.body;
			// console.log(req.body,'fdsfsd');
			// data.dob = new Date(data.dob);
			// await User.create(data);
			res.send({success: true, data});
		}
	} catch(e) {
		console.log(e);
		res.send({error: true, message: 'API Error'});
	}
};

module.exports = {
	checkUser,
	createUser,
	validate,
};


// exports.list = (req, res) => {
// 	const params = req.params || {};
// 	const query = req.query || {};

// 	const page = parseInt(query.page, 10) || 0;
// 	const perPage = parseInt(query.per_page, 10) || 10;

// 	User.apiQuery(req.query)
// 		.select('name email username bio url twitter background')
// 		.then(users => {
// 			res.json(users);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(422).send(err.errors);
// 		});
// };

// exports.get = (req, res) => {
// 	User.findById(req.params.userId)
// 		.then(user => {
// 			user.password = undefined;
// 			user.recoveryCode = undefined;

// 			res.json(user);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(422).send(err.errors);
// 		});
// };

// exports.put = (req, res) => {
// 	const data = req.body || {};

// 	if (data.email && !validator.isEmail(data.email)) {
// 		return res.status(422).send('Invalid email address.');
// 	}

// 	if (data.username && !validator.isAlphanumeric(data.username)) {
// 		return res.status(422).send('Usernames must be alphanumeric.');
// 	}

// 	User.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
// 		.then(user => {
// 			if (!user) {
// 				return res.sendStatus(404);
// 			}

// 			user.password = undefined;
// 			user.recoveryCode = undefined;

// 			res.json(user);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(422).send(err.errors);
// 		});
// };

// exports.post = (req, res) => {
// 	const data = Object.assign({}, req.body) || {};

// 	User.create(data)
// 		.then(user => {
// 			res.json(user);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).send(err);
// 		});
// };

// exports.delete = (req, res) => {
// 	User.findByIdAndUpdate(
// 		{ _id: req.params.user },
// 		{ active: false },
// 		{
// 			new: true
// 		}
// 	)
// 		.then(user => {
// 			if (!user) {
// 				return res.sendStatus(404);
// 			}

// 			res.sendStatus(204);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(422).send(err.errors);
// 		});
// };
