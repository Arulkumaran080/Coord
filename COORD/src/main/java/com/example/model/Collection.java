package com.example.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Collection {
	
	@Id
	@GeneratedValue(generator = "col_gen",strategy = GenerationType.AUTO)
	@SequenceGenerator(name = "col_gen",sequenceName = "col_seq",initialValue = 1,allocationSize = 1)
	private Integer CollectionId;
	private String CollectionName;
	private String Discription;
	private String ImageUrl;
	private LocalDateTime insertionTime;
	private LocalDateTime updationTime;
	private Boolean star;
	
	@ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinTable(name="col_item",
		joinColumns = @JoinColumn(name="col_id"),
		inverseJoinColumns = @JoinColumn(name="item_id")
			)
	private Set<Item> item=new HashSet<>();

	public Collection() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public Collection(String collectionName, String discription, String imageUrl, LocalDateTime insertionTime,
			LocalDateTime updationTime, Boolean star, Set<Item> item) {
		super();
		CollectionName = collectionName;
		Discription = discription;
		ImageUrl = imageUrl;
		this.insertionTime = insertionTime;
		this.updationTime = updationTime;
		this.star = star;
		this.item = item;
	}



	public Integer getCollectionId() {
		return CollectionId;
	}
	public void setCollectionId(Integer collectionId) {
		CollectionId = collectionId;
	}
	public String getCollectionName() {
		return CollectionName;
	}
	public void setCollectionName(String collectionName) {
		CollectionName = collectionName;
	}
	public Set<Item> getItem() {
		return item;
	}
	public void setItem(Set<Item> item) {
		this.item = item;
	}
	public LocalDateTime getInsertionTime() {
		return insertionTime;
	}	public void setInsertionTime(LocalDateTime insertionTime) {
		this.insertionTime = insertionTime;
	}
	public LocalDateTime getUpdationTime() {
		return updationTime;
	}
	public void setUpdationTime(LocalDateTime updationTime) {
		this.updationTime = updationTime;
	}
	public Boolean getStar() {
		return star;
	}
	public void setStar(Boolean star) {
		this.star = star;
	}
	
	public String getDiscription() {
		return Discription;
	}

	public void setDiscription(String discription) {
		Discription = discription;
	}
	

	public String getImageUrl() {
		return ImageUrl;
	}



	public void setImageUrl(String imageUrl) {
		ImageUrl = imageUrl;
	}



	@Override
	public String toString() {
		return "Collection [CollectionId=" + CollectionId + ", CollectionName=" + CollectionName + ", Discription="
				+ Discription + ", ImageUrl=" + ImageUrl + ", insertionTime=" + insertionTime + ", updationTime="
				+ updationTime + ", star=" + star + ", item=" + item + "]";
	}



	

	
		
}
