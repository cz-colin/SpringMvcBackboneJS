<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html>
<head>
<title>Home</title>
<style type="text/css">
.error {
	color: red;
}
</style>
</head>
<body>
	<h1>Spring Demo</h1>

	<div class="loginDiv">

		<form name="loginUser" onsubmit="return false;">
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
			<input type="submit" value="Log In" id="login_button">
		</form>
		<span id="error"></span> <a href="sign-up">New User</a>
	</div>
	<script type="text/javascript"
		src='<c:url value="/js/jquery.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/underscore-min.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/backbone-min.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/model/LoginModel.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/view/LoginView.js"></c:url>'></script>

	<script>
		this.loginModel = new LoginModel({
			"baseUrl" : "${pageContext.servletContext.contextPath}",
		});
		var loginView = new LoginView({
			el : $(".loginDiv"),
			model : this.loginModel
		});
		loginView.render();
	</script>
</body>
</html>
