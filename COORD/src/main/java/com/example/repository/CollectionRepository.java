package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Collection;

public interface CollectionRepository extends JpaRepository<Collection, Integer>{

}
