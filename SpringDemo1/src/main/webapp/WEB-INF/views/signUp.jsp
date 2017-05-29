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

	<div class="signUpDiv">

		<form name="signUpUser" onsubmit="return false;">
			<label for="firstName">First Name </label>
			<div class="control-group firstName">
				<input type="text" name="firstName" id="firstName"> <span
					class="help-inline"></span>
			</div>
			<label for="lastName">Last Name </label>
			<div class="control-group lastName">
				<input type="text" name="lastName" id="lastName"> <span
					class="help-inline"></span>
			</div>

			<label for="email">Email </label>
			<div class="control-group email">
				<input type="text" name="email" id="email"> <span
					class="help-inline"></span>
			</div>
			<label for="pswd">Password </label>
			<div class="password control-group">
				<input type="password" name="password" id="password"> <span
					class="help-inline"></span>
			</div>
			<input type="submit" value="Sign Up" id="signUp_button">
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
		src='<c:url value="/js/view/SignUpView.js"></c:url>'></script>

	<script>
		this.signUpModel = new SignUpModel({
			"baseUrl" : "${pageContext.servletContext.contextPath}",
		});
		var signUpView = new SignUpView({
			el : $(".signUpDiv"),
			model : this.signUpModel
		});
		signUpView.render();
	</script>

</body>
</html>