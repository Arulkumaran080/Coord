package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.model.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
	
//	@Query("select p from Item p where p.star=true and p.user_id=?1")
//	List<Item> getStarredItem(int id);
	
	@Query("select distinct tags from Item")
	List<String> getTags();
	
	List<Item> findAllByUser_IdOrderByInsertionTimeDesc(int id);
	
	List<Item> findAllByUser_IdOrderByUpdationTimeDesc(int id);

}
