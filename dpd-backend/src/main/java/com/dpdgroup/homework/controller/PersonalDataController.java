package com.dpdgroup.homework.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dpdgroup.homework.exception.ResourceNotFoundException;
import com.dpdgroup.homework.model.PersonalData;
import com.dpdgroup.homework.repository.PersonalDataRepository;

@RestController
@RequestMapping("/api/person")
public class PersonalDataController {

	@Autowired
	private PersonalDataRepository personalDataRepository;

	@PostMapping("/add")
	public PersonalData addPersonalData(@RequestBody PersonalData personalData) {
		if (!isDataValid(personalData)) {
			throw new IllegalArgumentException();
		}
		return personalDataRepository.save(personalData);
	}

	@GetMapping("/get")
	public List<PersonalData> getPersonalData(@RequestParam(name = "page") int page,
			@RequestParam(name = "size") int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<PersonalData> personalDataPage = personalDataRepository.findAll(pageable);
		return personalDataPage.toList();
	}

	@PutMapping("/depersonalize")
	public PersonalData depersonalize(@RequestParam(name = "id") Long id) {
		Optional<PersonalData> optionalPersonalData = personalDataRepository.findById(id);
		if (optionalPersonalData.isEmpty()) {
			throw new ResourceNotFoundException("Personal data to be depersonalized does not exist with id: " + id);
		}
		PersonalData personalData = optionalPersonalData.get();
		depersonalize(personalData);
		return personalDataRepository.save(personalData);
	}

	private boolean isDataValid(PersonalData personalData) {
		// TODO
		return true;
	}

	private void depersonalize(PersonalData personalData) {
		personalData.setName(null);
		personalData.setTajNumber(null);
		personalData.setTaxIdentifier(null);
		personalData.setEmailAddress(null);

	}
}
