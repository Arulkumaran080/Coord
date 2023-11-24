package com.example;


import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.example.model.Item;
import com.example.model.User;
import com.example.service.IUserService;

@SpringBootApplication
public class CoordApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(CoordApplication.class, args);
	}

	@Autowired
	IUserService userService;
	
	@Override
	public void run(String... args) throws Exception {
		
		
		
		String[] tag1= {"sci-fi","adventure"};
		String[] tag2= {"drama","animation"};
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//		Date date=(Date)dateFormat.parse("2019-05-05");
//		Item item1=new Item("movie url", "sci-fi movie", "www.netflix.com",tag1,true,"daa","pin",date);
//		Item item2=new Item("url", "Its a drama kind of movie", "www.primevideo.com",tag2,false,"sdf","pin",date);
//		List<Item> items=Arrays.asList(item1,item2);
//		User user=new User("arul@gmail.com", "arul@123", items);
		
//		userService.saveUser(user);
	}
}
