<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link type="text/css" rel="stylesheet"
	href="<c:url value="css/jquery.dataTables.css"></c:url>" />
</head>
<body>

	<div class="userListDiv">
		<table id="userListTable">

		</table>
	</div>
	<script type="text/javascript"
		src='<c:url value="/js/jquery.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/jquery.dataTables.min.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/underscore-min.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/backbone-min.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/model/SignUpModel.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/view/UserListView.js"></c:url>'></script>
	<script type="text/javascript"
		src='<c:url value="/js/view/UpdateUserListView.js"></c:url>'></script>

	<script>
		var userListView = new UserListView({
			el : $(".userListDiv")
		});
		userListView.render();
	</script>
</body>
</html>