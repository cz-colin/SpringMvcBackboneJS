package com.cloudzon.service;

import java.util.List;

import com.cloudzon.dto.UserDto;
import com.cloudzon.dto.UserLoginDto;
import com.cloudzon.model.User;

public interface UserService {

	public User login(UserLoginDto loginDto);

	public List<UserDto> userList(User user);

	public UserDto userList(Long userId);

	public void signUp(UserDto userDto);
}
