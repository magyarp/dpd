package com.dpdgroup.homework.model;

import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class Address {
	private String postalCode;
	private String city;
	private String street;
	private String houseNumber;
}