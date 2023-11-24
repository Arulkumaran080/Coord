package com.example.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String email;
	private String password;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id")
	List<Item> items;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="user_id")
	List<Collection> col;
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public User(String email, String password, List<Item> items, List<Collection> col) {
		super();
		this.email = email;
		this.password = password;
		this.items = items;
		this.col = col;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public List<Item> getItems() {
		return items;
	}
	public void setItems(List<Item> items) {
		this.items = items;
	}
	
	public List<Collection> getCol() {
		return col;
	}

	public void setCol(List<Collection> col) {
		this.col = col;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password + ", items=" + items + ", col=" + col
				+ "]";
	}

	
	
}
