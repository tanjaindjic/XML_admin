package com.XmlWeb.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.XmlWeb.admin.model.Authority;
import com.XmlWeb.admin.repository.AuthorityRepository;

@Service
public class AuthorityService {
	
	@Autowired
	private AuthorityRepository authorityRepository;
	
	public void populateRepository(List<Authority> allRequests) {
		for (Authority Authority : allRequests) {
			authorityRepository.save(Authority);
		}
	}

	public void add(Authority a) {
		// TODO Auto-generated method stub
		authorityRepository.save(a);
	}

}
