package com.example.service;

import com.example.model.Collection;

public interface ICollectionService {

	public Collection assignItemToCollection(int colId,int itemId);
	public Collection removeItemFromCollection(int colId,int itemId) ;
	public void deleteCollection(int colId);
}
