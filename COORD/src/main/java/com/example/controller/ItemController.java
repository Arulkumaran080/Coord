package com.example.controller;

import java.text.SimpleDateFormat;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Item;
import com.example.repository.ItemRepository;
import com.example.service.IItemService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {

	@Autowired
	IItemService itemService;
	
	@Autowired
	ItemRepository itemRepository;
	
	@PutMapping("/update/item/{id}")
	public void updateItem(@PathVariable int id,@RequestBody Item item) {
		itemService.updateItem(id, item);
	}
	
	@DeleteMapping("/delete/item/{id}")
	public void deleteItem(@PathVariable int id) {
		itemService.DeleteItem(id);
	}
	
	@GetMapping("/abcd")
	public List<String> abcd(){
		return itemRepository.getTags();
	}
	
	@GetMapping("/item/getByInsertionTime/{id}")
	public List<Item> getItemsByInsertionTime(@PathVariable int id){
		return itemService.getItemsByUserIdOrderedByInsertionTimeDesc(id);
	}
	
	@GetMapping("/item/getByUpdationTime/{id}")
	public List<Item> getItemsByUpdationTime(@PathVariable int id){
		return itemService.getItemsByUserIdOrderedByUpdationTimeDesc(id);
	}
}
