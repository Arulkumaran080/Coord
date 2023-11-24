package com.example.model;

import java.util.Arrays;
import java.sql.Date;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Item {

	@Id
	@GeneratedValue(generator = "item_gen",strategy = GenerationType.AUTO)
	@SequenceGenerator(name = "item_gen",sequenceName = "item_seq",initialValue = 1,allocationSize = 1)
	private Integer ItemId;
	private String title;
	private String description;
	@Column(length = 12000)
	private String urls;
	private String[] tags;
	private Boolean star;
	private String img;
	private String pin;
	private LocalDateTime insertionTime;
	private LocalDateTime updationTime;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	
	public Item() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Item(String title, String description, String urls, String[] tags, Boolean star, String img, String pin,
			LocalDateTime insertionTime, LocalDateTime updationTime) {
		super();
		this.title = title;
		this.description = description;
		this.urls = urls;
		this.tags = tags;
		this.star = star;
		this.img = img;
		this.pin = pin;
		this.insertionTime = insertionTime;
		this.updationTime = updationTime;
	}

	
	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Integer getItemId() {
		return ItemId;
	}


	public void setItemId(Integer itemId) {
		ItemId = itemId;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getUrls() {
		return urls;
	}


	public void setUrls(String urls) {
		this.urls = urls;
	}


	public String[] getTags() {
		return tags;
	}


	public void setTags(String[] tags) {
		this.tags = tags;
	}


	public Boolean getStar() {
		return star;
	}


	public void setStar(Boolean star) {
		this.star = star;
	}


	public String getImg() {
		return img;
	}


	public void setImg(String img) {
		this.img = img;
	}


	public String getPin() {
		return pin;
	}


	public void setPin(String pin) {
		this.pin = pin;
	}


	public LocalDateTime getInsertionTime() {
		return insertionTime;
	}


	public void setInsertionTime(LocalDateTime insertionTime) {
		this.insertionTime = insertionTime;
	}


	public LocalDateTime getUpdationTime() {
		return updationTime;
	}


	public void setUpdationTime(LocalDateTime updationTime) {
		this.updationTime = updationTime;
	}


	@Override
	public String toString() {
		return "Item [ItemId=" + ItemId + ", title=" + title + ", description=" + description + ", urls=" + urls
				+ ", tags=" + Arrays.toString(tags) + ", star=" + star + ", img=" + img + ", pin=" + pin
				+ ", insertionTime=" + insertionTime + ", updationTime=" + updationTime + ", user=" + user + "]";
	}


	
	
}
