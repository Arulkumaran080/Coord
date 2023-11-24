package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.xyz;
import com.example.model.Collection;
import com.example.model.Item;
import com.example.model.User;
import com.example.repository.UserRepository;
import com.example.service.IUserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	IUserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/user")
	public User saveUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
	@GetMapping("/user")
	public List<User> getUser(){
		return userService.getAllUser();
	}
	
	@GetMapping("/user/{id}")
	public User getById(@PathVariable int id) {
		return userService.findById(id);
	}
	
	@PutMapping("/passwordUpdate/{email}")
	public void update(@PathVariable("email") String email,@RequestBody User newUser) {
		
		userService.updateUser(email, newUser);
	}
	
	@PostMapping("/add/{id}")
	public User addItem(@PathVariable int id,@RequestBody Item item) {
		return userService.addItem(id, item);
	}
	
	@PostMapping("/add/Collection/{id}")
	public User addCollectionName(@PathVariable int id,@RequestBody Collection col) {
		return userService.addCollectionName(id, col);
	}
	
	@GetMapping("/userMail/{mail}")
	public User getbymail(@PathVariable String mail) {
		return userRepository.findByEmail(mail);
	}
}
