package com.example.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Collection;
import com.example.model.Item;
import com.example.repository.CollectionRepository;
import com.example.repository.ItemRepository;

@Service
public class CollectionService implements ICollectionService {
	
	@Autowired
	CollectionRepository collectionRepository;
	
	@Autowired
	ItemRepository itemRepository;

	@Override
	public Collection assignItemToCollection(int colId, int itemId) {
		Collection col=collectionRepository.findById(colId).get();
		Item item=itemRepository.findById(itemId).get();
		Set<Item> items=col.getItem();
		items.add(item);
		col.setItem(items);
		return collectionRepository.save(col);
	}

	@Override
	public Collection removeItemFromCollection(int colId, int itemId) {
		Collection col=collectionRepository.findById(colId).get();
		Item i=itemRepository.findById(itemId).get();
		col.getItem().remove(i);
		return collectionRepository.save(col);
	}

	@Override
	public void deleteCollection(int colId) {
		Collection col=collectionRepository.findById(colId).get();
		col.getItem().clear();
		collectionRepository.deleteById(colId);
	}

}
