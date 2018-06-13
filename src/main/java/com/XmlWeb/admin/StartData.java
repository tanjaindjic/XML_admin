package com.XmlWeb.admin;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.XmlWeb.admin.model.Authority;
import com.XmlWeb.admin.model.AuthorityName;
import com.XmlWeb.admin.model.Korisnik;
import com.XmlWeb.admin.model.Role;
import com.XmlWeb.admin.model.StatusKorisnika;
import com.XmlWeb.admin.repository.AuthorityRepository;
import com.XmlWeb.admin.repository.KorisnikRepository;


@Component
public class StartData {
	
	@Autowired
	private KorisnikRepository korisnikRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	
	@Autowired
    private AuthorityRepository authorityRepository;

	@PostConstruct
	 public void initIt(){
		 Korisnik k = new Korisnik();
		 k.setUsername("admin");		
		 k.setPassword(bCryptPasswordEncoder.encode("admin"));
         k.setFirstName("Pera");
         k.setLastName("Peric");
         k.setAktiviran(true);
         k.setRole(Role.ADMIN);
         k.setStatusNaloga(StatusKorisnika.AKTIVAN);
         k.setEmail("admir@admir.com");
         k.setLastPasswordResetDate(new Date());
         List l = new ArrayList<>();
         Authority a = new Authority();
         a.setName(AuthorityName.ROLE_ADMIN);
         authorityRepository.save(a);
         l.add(a);
         k.setAuthorities(l);
         korisnikRepo.save(k);
         System.out.println("dodao admira");


	 }

}
