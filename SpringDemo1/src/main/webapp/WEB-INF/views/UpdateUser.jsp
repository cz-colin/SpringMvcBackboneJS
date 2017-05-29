<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<style type="text/css">
.error {
	color: red;
}
</style>
</head>
<body>

	<div class="updateUserDiv">

		<form name="updateUser" onsubmit="return false;">
			<input type="hidden" name="userId" id="userId"> <label
				for="firstName">First Name </label>
			<div class="control-group firstName">
				<input type="text" name="firstName" id="firstName"> <span
					class="help-inline"></span>
			</div>
			<label for="lastName">Last Name </label>
			<div class="control-group lastName">
				<input type="text" name="lastName" id="lastName"> <span
					class="help-inline"></span>
			</div>
			<input type="submit" value="Update" id="update_button">
		</form>

		<span id="error"></span>
	</div>
	<script type="text/javascript"
		src='<c:url value="/js/jquery.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/underscore-min.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/backbone-min.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/model/SignUpModel.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/model/UpdateUserModel.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/view/UpdateUserListView.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/view/UpdateUserView.js"></c:url>'></script>

	<script>
		var hrefurl = $(location).attr("href");
		var userId = hrefurl.substr(hrefurl.lastIndexOf('/') + 1)
		this.updateUserModel = new UpdateUserModel({
			"baseUrl" : "${pageContext.servletContext.contextPath}",
			"userId" : userId
		});
		var updateUserListView = new UpdateUserListView({
			el : $(".updateUserDiv"),
			model : this.updateUserModel
		});
		updateUserListView.render();
		var updateUserView = new UpdateUserView({
			el : $(".updateUserDiv"),
			model : this.updateUserModel
		});
		updateUserView.render();
	</script>

</body>
</html>