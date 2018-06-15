package com.XmlWeb.admin;

import java.io.IOException;
import java.io.InputStream;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.XmlWeb.admin.model.AgentRequest;
import com.XmlWeb.admin.model.Authority;
import com.XmlWeb.admin.model.AuthorityName;
import com.XmlWeb.admin.model.Korisnik;
import com.XmlWeb.admin.model.Role;
import com.XmlWeb.admin.model.StatusKorisnika;
import com.XmlWeb.admin.repository.AuthorityRepository;
import com.XmlWeb.admin.repository.KorisnikRepository;
import com.XmlWeb.admin.service.AgentRequestService;
import com.XmlWeb.admin.service.AuthorityService;
import com.XmlWeb.admin.service.KorisnikService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


//VAZNO
//ZA GRESKU SunCertPathBuilderException: unable to find valid certification path to requested target:
//TREBA IMPORTOVATI CRT FAJL OD GLAVNE APLIKACIJE XML DA BI ADMIN MODUL SARADJIVAO SA GLAVNOM APLIKACIJOM
//CRT FAJL ADMIN MODUL TRAZI NA DEFAULT LOKACIJI JAVA/JRE/LIB/SECURITY/CACERTS
//keytool -import -file "C:\Users\hrcak\git\XMLBESP\projekat\src\main\resources\rootcertificate.crt" -keystore "C:\Program Files\Java\jre1.8.0_171\lib\security\cacerts" -alias "xmlcertificate"

@Component
public class StartData {
	
	@Autowired
	private KorisnikRepository korisnikRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
    private AuthorityRepository authorityRepository;
	
	@Autowired
    private AgentRequestService agentRequestService;

	@Autowired
	private KorisnikService korisnikService;

	@Autowired
	private AuthorityService authorityService;

	@PostConstruct
	 public void initIt() throws IOException{
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
         
         //izvdojiti u funkciju sync
        
         
         
         
         

	 }

}
