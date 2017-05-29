var UpdateUserListView = Backbone.View.extend({

	el : $(".updateUserDiv"),
	initialize : function() {
	},
	render : function() {
		var template = _.template($(".updateUserDiv").html(), {});
		this.$el.html(template);
		var that = this;
		that.getUserById();
	},
	getUserById : function() {
		this.hideErrors();
		var baseUrl = this.model.get("baseUrl");
		var userId = this.model.get("userId");
		$.ajax({
			url : baseUrl + '/user/userList/' + userId,
			type : "GET",
			headers : {
				'Accept' : 'application/json',
			},
			success : function(data) {
				$("#userId").val(data.id);
				$("#firstName").val(data.firstName);
				$("#lastName").val(data.lastName);
			},
			error : function(response) {
				var response = $.parseJSON(e.responseText);
				var obj = JSON.stringify(response.errorMessage);
				$("#error").html("<font color='red'>" + obj + "</font>");
			}
		});
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