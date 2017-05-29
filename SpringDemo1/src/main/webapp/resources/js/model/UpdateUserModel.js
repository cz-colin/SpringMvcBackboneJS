var UpdateUserModel = Backbone.Model.extend({
	defaults : {
		"userId" : '',
		"firstName" : '',
		"lastName" : '',
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
		return errors.length > 0 ? errors : false;

	}
});