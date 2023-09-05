package com.exam.examserver.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.exam.examserver.model.User;
import com.exam.examserver.model.UserRole;

public interface UserService {
	
	//creating user
	public User createUser(User user,Set<UserRole> userRoles) throws Exception;
	
	//get user by name
	public User getUser(String username);
	
	//delete user by id
	public void deleteUser(Long userId);
	
	//update user
	public User updateUser(User user);
}
