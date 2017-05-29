var SignUpView = Backbone.View.extend({

	el : $(".signUpDiv"),
	initialize : function() {
	},
	render : function() {
		var template = _.template($(".signUpDiv").html(), {});
		this.$el.html(template);
		var that = this;
		$("#signUp_button").click(function() {
			that.reset();
		})
	},
	reset : function() {
		this.hideErrors();
		var baseUrl = this.model.get('baseUrl');
		this.signUpModel = new SignUpModel({
			"firstName" : $("#firstName").val(),
			"lastName" : $("#lastName").val(),
			"email" : $("#email").val(),
			"password" : $("#password").val()
		});

		if (!this.signUpModel.isValid()) {
			this.showErrors(this.signUpModel.validationError);
		} else {
			$.ajax({
				url : baseUrl + '/user/signUp',
				type : "POST",
				headers : {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json; charset=UTF-8'
				},
				data : JSON.stringify(this.signUpModel),
				success : function(data) {
					alert("Success");
					window.location = baseUrl;
				},
				error : function(response) {
					var response = $.parseJSON(response.responseText);
					var obj = JSON.stringify(response.errorMessage);
					$("#error").html("<font color='red'>" + obj + "</font>");
				}
			});
		}
	},
	showErrors : function(errors) {
		_.each(errors, function(error) {
			var controlGroup = this.$('.' + error.name);
			controlGroup.addClass('error');
			controlGroup.find('.help-inline').text(error.message);
			controlGroup.find('.help-inline').addClass('errorText');
		}, this);
	},
	hideErrors : function() {
		this.$('.control-group').removeClass('error');
		this.$('.help-inline').text('');
	}

});