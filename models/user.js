var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseStringQuery = require('mongoose-string-query');

module.exports = UserSchema = new Schema(
	{
		adhaar: {
			type: Number,
			trim: true,
			index: true,
			unique: true,
			required: true
		},
		name: {
			type: String,
			trim: true,
			required: true
		},
		mobile: {
			type: Number,
			trim: true,
			required: true
		},
		dob: {
			type: Date,
			required: true
		},
		altMobile: {
			type: Number,
			required: true
		},
		email: {
			type: String,
		},
		address: {
			addr1: {
				type: String,
				required: true
			},
			addr2: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			},
			district: {
				type: String,
				required: true
			},
			state: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			}
		},
		gender: {
			type: String,
			required: true
		},
		source: {
			type: String,
			required: true
		},
		srcType: {
			type: String,
			required: true
		},
		empStatus: {
			type: String,
			required: true
		},
		occupation: {
			type: String,
			required: true
		},
		currentAnnualIncome: {
			type: String,
			required: true
		},
		eduQual: {
			type: String,
			required: true
		},
		sucEnt: {
			type: String,
			required: true
		},
		faiEnt: {
			type: String,
			required: true
		},
		bankAcc: {
			type: String,
			required: true
		},
		creditHis: {
			type: String,
			required: true
		},
		assets: {
			type: Array,
			required: true
		},
		training: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		},
	},
	{ collection: 'users' }
);

UserSchema.pre('save', function(next) {
	if (!this.isNew) {
		next();
	} else {
		console.log('Success');
		next();
	}
});

UserSchema.plugin(mongooseStringQuery);
UserSchema.index({ adhaar: 1 });

module.exports = exports = mongoose.model('User', UserSchema);
