package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Collection;
import com.example.repository.CollectionRepository;
import com.example.service.CollectionService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CollectionController {
	
	@Autowired
	CollectionService collectionService;

	@Autowired
	CollectionRepository collectionRepository;
	
	@GetMapping("/col")
	public List<Collection> getAllCol() {
		return collectionRepository.findAll();
	}
	
	@GetMapping("/col/{colId}/item/{itemId}")
	public Collection assignItemToCollection(@PathVariable int colId,@PathVariable int itemId) {
		return collectionService.assignItemToCollection(colId,itemId);
	}
	
	@PutMapping("/col/{colId}/removeItem/{itemId}")
	public Collection removeItemFromCollection(@PathVariable int colId,@PathVariable int itemId) {
		return collectionService.removeItemFromCollection(colId, itemId);
	}
	
	@DeleteMapping("/col/delete/{id}")
	public void delete(@PathVariable int id) {
		collectionService.deleteCollection(id);
	}
}
