package com.dpdgroup.homework.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "personaldata")
@Data
@NoArgsConstructor
public class PersonalData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String placeOfBirth;
	private Date dateOfBirth;
	private String motherName;
	private String tajNumber;
	private String taxIdentifier;
	private String emailAddress;

	@ElementCollection(targetClass = String.class)
	private List<String> phoneNumbers = new ArrayList<>();

	@ElementCollection(targetClass = Address.class)
	private List<Address> addresses = new ArrayList<>();
}
