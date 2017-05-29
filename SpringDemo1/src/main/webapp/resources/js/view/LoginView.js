var LoginView = Backbone.View.extend({

	el : $(".loginDiv"),
	initialize : function() {
	},
	render : function() {
		var template = _.template($(".loginDiv").html(), {});
		this.$el.html(template);
		var that = this;
		$("#login_button").click(function() {
			that.reset();
		})
	},
	reset : function() {
		this.hideErrors();
		this.loginModel = new LoginModel({
			"email" : $("#email").val(),
			"password" : $("#password").val()
		});

		if (!this.loginModel.isValid()) {
			this.showErrors(this.loginModel.validationError);
		} else {
			var baseUrl = this.model.get("baseUrl");
			$.ajax({
				url : baseUrl + '/user/login',
				type : "POST",
				headers : {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json; charset=UTF-8'
				},
				data : JSON.stringify(this.loginModel),
				success : function(data) {
					alert("Success");
					window.location = baseUrl + "/user-list";
				},
				error : function(response) {
					var response = $.parseJSON(e.responseText);
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