var UpdateUserView = Backbone.View.extend({

	el : $(".updateUserDiv"),
	initialize : function() {
	},
	render : function() {
		var template = _.template($(".updateUserDiv").html(), {});
		this.$el.html(template);
		var that = this;

		$("#update_button").click(function() {
			that.reset();
		})
	},
	reset : function() {

		this.hideErrors();
		var baseUrl = this.model.get('baseUrl');
		this.updateUserModel = new UpdateUserModel({
			"id" : $("#userId").val(),
			"firstName" : $("#firstName").val(),
			"lastName" : $("#lastName").val(),
		});

		if (!this.updateUserModel.isValid()) {
			this.showErrors(this.updateUserModel.validationError);
		} else {
			$.ajax({
				url : baseUrl + '/user/signUp',
				type : "POST",
				headers : {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json; charset=UTF-8'
				},
				data : JSON.stringify(this.updateUserModel),
				success : function(data) {
					alert("Success");
					window.location = baseUrl + "/user-list";
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
			console.log(error.name);
			controlGroup.find('.help-inline').text(error.message);
			controlGroup.find('.help-inline').addClass('errorText');
		}, this);
	},
	hideErrors : function() {
		this.$('.control-group').removeClass('error');
		this.$('.help-inline').text('');
	}

});