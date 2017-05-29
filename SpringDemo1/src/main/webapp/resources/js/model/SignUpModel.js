var SignUpModel = Backbone.Model.extend({
	defaults : {
		"firstName" : '',
		"lastName" : '',
		"email" : '',
		"password" : ''
	},

	validate : function(attrs) {

		var errors = [];
		var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

		if (!attrs.firstName) {
			errors.push({
				name : 'firstName',
				message : '* Please enter First Name.'
			});
		}
		if (!attrs.lastName) {
			errors.push({
				name : 'lastName',
				message : '* Please enter Last Name.'
			});
		}
		if (!attrs.email) {
			errors.push({
				name : 'email',
				message : '* Please enter Email.'
			});
		} else if (!emailPattern.test(attrs.email)) {
			errors.push({
				name : 'email',
				message : '* Please enter valid Email Address.'
			});
		}
		if (!attrs.password) {
			errors.push({
				name : 'password',
				message : '* Please enter Password.'
			});
		}

		return errors.length > 0 ? errors : false;

	}
});