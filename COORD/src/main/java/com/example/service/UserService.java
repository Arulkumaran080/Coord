package com.example.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Collection;
import com.example.model.Item;
import com.example.model.User;
import com.example.repository.UserRepository;

@Service
public class UserService implements IUserService{

	@Autowired
	UserRepository userRepository;
	
	@Override
	public User findByEmail(String Email) {
		return userRepository.findByEmail(Email);
	}

	@Override
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	@Override
	public void updateUser(String mail, User newUser) {
		User oldUser=userRepository.findByEmail(mail);
		oldUser.setEmail(newUser.getEmail());
		oldUser.setPassword(newUser.getPassword());
		
		userRepository.save(oldUser);
	}

	@Override
	public User addItem(int id, Item item) {
		Optional<User> user=userRepository.findById(id);
		if(user.isEmpty()) {
			return null;
		}
		User oldUser=user.get();
		item.setInsertionTime(LocalDateTime.now());
		item.setUpdationTime(LocalDateTime.now());
		oldUser.getItems().add(item);
		return userRepository.save(oldUser);
	}
	

	@Override
	public User findById(int id) {
//		Optional<User> user=userRepository.findById(id);
//		if(user.isEmpty()) {
//			return null;
//		}
//		return user.get();
		return userRepository.finById(id);
	}

	@Override
	public User addCollectionName(int id, Collection col) {
		User user=userRepository.finById(id);
		user.getCol().add(col);
		col.setInsertionTime(LocalDateTime.now());
		col.setUpdationTime(LocalDateTime.now());
		return userRepository.save(user);
	}

	

}
