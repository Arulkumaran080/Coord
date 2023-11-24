package com.example.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Item;
import com.example.repository.ItemRepository;

@Service
public class ItemService implements IItemService {
	
	@Autowired
	ItemRepository itemRepository;

	@Override
	public void updateItem(int id, Item item) {
		Optional<Item> oldItem=itemRepository.findById(id);
		if(oldItem.isPresent()) {
			Item item1=oldItem.get();
			item1.setDescription(item.getDescription());
			item1.setStar(item.getStar());
			item1.setTags(item.getTags());
			item1.setTitle(item.getTitle());
			item1.setUrls(item.getUrls());
			item1.setImg(item.getImg());
			item1.setPin(item.getPin());
			item1.setInsertionTime(item.getInsertionTime());
			item1.setUpdationTime(LocalDateTime.now());
			itemRepository.save(item1);
		}
	}

	@Override
	public void DeleteItem(int id) {
		itemRepository.deleteById(id);
	}

	@Override
	public List<Item> getItemsByUserIdOrderedByInsertionTimeDesc(int id) {
		return itemRepository.findAllByUser_IdOrderByInsertionTimeDesc(id);
	}

	@Override
	public List<Item> getItemsByUserIdOrderedByUpdationTimeDesc(int id) {
		return itemRepository.findAllByUser_IdOrderByUpdationTimeDesc(id);
	}
}
