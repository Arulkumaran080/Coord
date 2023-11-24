package com.example.service;

import java.util.List;

import com.example.model.Item;

public interface IItemService {
	void updateItem(int id,Item item);
	void DeleteItem(int id);
	List<Item> getItemsByUserIdOrderedByInsertionTimeDesc(int id);
	List<Item> getItemsByUserIdOrderedByUpdationTimeDesc(int id);
//	List<Item> getStarredItem(int id);
}
