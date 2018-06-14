package com.XmlWeb.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.XmlWeb.admin.model.Authority;
import com.XmlWeb.admin.model.Korisnik;
import com.XmlWeb.admin.service.AuthorityService;
import com.XmlWeb.admin.service.KorisnikService;

@RestController
public class KorisnikController {
	
	@Autowired
	private KorisnikService korisnikService;
	
	@Autowired
	private AuthorityService authService;


	@RequestMapping(method = RequestMethod.POST, value = "/user")
	public void recieveKorisnik(@RequestBody Korisnik k) {
		for (Authority a : k.getAuthorities()) {
			authService.add(a);
		}
		
		korisnikService.addKorisnik(k);
		
	}
}
