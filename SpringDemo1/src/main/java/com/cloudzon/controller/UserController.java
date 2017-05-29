package com.cloudzon.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.cloudzon.common.Constant;
import com.cloudzon.dto.ResponseMessageDto;
import com.cloudzon.dto.UserDto;
import com.cloudzon.dto.UserLoginDto;
import com.cloudzon.exception.AuthorizationException;
import com.cloudzon.model.User;
import com.cloudzon.service.UserService;

@Controller
@RequestMapping("user")
public class UserController {

	private static final Logger logger = LoggerFactory
			.getLogger(UserController.class);

	@Resource(name = "userService")
	private UserService userService;

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public User login(@RequestBody UserLoginDto loginDto, HttpSession session) {
		logger.info("login user");
		User objUser = this.userService.login(loginDto);
		session.setAttribute("sessionUser", objUser);
		return objUser;
	}

	@RequestMapping(value = "/signUp", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public ResponseMessageDto signUp(@RequestBody UserDto userDto) {
		logger.info("login user");
		this.userService.signUp(userDto);
		return new ResponseMessageDto("Added");
	}

	@RequestMapping(value = "/userList", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<UserDto> userList(HttpSession session) {
		logger.info("userList");
		User objUser = (User) session.getAttribute(Constant.SESSION_USER);
		if (objUser != null) {
			return this.userService.userList(objUser);
		} else {
			throw new AuthorizationException("Session Expired");
		}
	}

	@RequestMapping(value = "/userList/{userId}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public UserDto userList(@PathVariable Long userId, HttpSession session) {
		logger.info("userList");
		User objUser = (User) session.getAttribute(Constant.SESSION_USER);
		if (objUser != null) {
			return this.userService.userList(userId);
		} else {
			throw new AuthorizationException("Session Expired");
		}
	}
}
