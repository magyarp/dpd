package com.dpdgroup.homework.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dpdgroup.homework.model.PersonalData;

public interface PersonalDataRepository extends JpaRepository<PersonalData, Long> {

}
