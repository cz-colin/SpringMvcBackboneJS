var UserListView = Backbone.View
		.extend({

			el : $(".userListDiv"),
			initialize : function() {
			},
			render : function() {
				var template = _.template($(".userListDiv").html(), {});
				this.$el.html(template);
				var that = this;
				that.getAllUsers();
			},
			getAllUsers : function() {
				this.hideErrors();
				$
						.ajax({
							url : 'user/userList',
							type : "GET",
							headers : {
								'Accept' : 'application/json',
							},
							success : function(data) {
								console.log(data);
								var len = data.length;
								var thead = $("<thead></thead>");
								var trh = $("<tr></tr>");
								var th0 = $("<th>Action</th>");
								var th1 = $("<th>First Name</th>");
								var th2 = $("<th>Last Name</th>");
								var th3 = $("<th>Email</th>");
								trh.append(th0);
								trh.append(th1);
								trh.append(th2);
								trh.append(th3);
								thead.append(trh);
								$("#userListTable").append(thead);
								var tBody = $("<tbody></tbody>");
								for (var i = (len - 1); i >= 0; i--) {
									var tr = $("<tr></tr>");
									var td0 = $("<td></td>")
									var td1 = $("<td>" + data[i].firstName
											+ "</td>");
									var td2 = $("<td>" + data[i].lastName
											+ "</td>");
									var td3 = $("<td>" + data[i].email
											+ "</td>");
									var button1 = $("<a href=# class='edit_button' title='edit' attr-id='"
											+ data[i].id + "'>Edit</a>");
									var button2 = $("<a href=# class='delete_button' title='delete' attr-id='"
											+ data[i].id + "'>Delete</a>");
									td0.append(button1);
									// td0.append(button2);
									tr.append(td0);
									tr.append(td1);
									tr.append(td2);
									tr.append(td3);
									tBody.append(tr);
								}
								$("#userListTable").append(tBody);

								var table = $('#userListTable').dataTable({
									responsive : true,
									"searching" : false,
									"order" : [ [ 0, "desc" ] ],
									"iDisplayLength" : 5,
									"columnDefs" : [ {
										orderable : false,
										targets : [ 0 ]
									} ],
									"bAutoWidth" : false,
									"bLengthChange" : false
								});
								$('.edit_button')
										.click(
												function() {
													var userId = $(this).attr(
															"attr-id");
													window.location.href = "update-user/"
															+ userId;
												});
							},
							error : function(response) {
								var response = $.parseJSON(e.responseText);
								var obj = JSON.stringify(response.errorMessage);
								$("#error").html(
										"<font color='red'>" + obj + "</font>");
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