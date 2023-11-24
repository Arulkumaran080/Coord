package com.example.service;

import java.util.List;

import com.example.model.Collection;
import com.example.model.Item;
import com.example.model.User;

public interface IUserService {

	User findByEmail(String Email);
	User saveUser(User user);
	List<User> getAllUser();
	void updateUser(String mail,User newUser);
	User addItem(int id,Item item);
	User addCollectionName(int id,Collection col);
	User findById(int id);
}
