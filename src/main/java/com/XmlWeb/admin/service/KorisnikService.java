package com.XmlWeb.admin.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.XmlWeb.admin.dto.RegisterDTO;
import com.XmlWeb.admin.model.Authority;
import com.XmlWeb.admin.model.AuthorityName;
import com.XmlWeb.admin.model.Korisnik;
import com.XmlWeb.admin.model.Role;
import com.XmlWeb.admin.model.StatusKorisnika;
import com.XmlWeb.admin.repository.AuthorityRepository;
import com.XmlWeb.admin.repository.KorisnikRepository;


@Service
public class KorisnikService {

	@Autowired
	private KorisnikRepository korisnikRepo;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private AuthorityRepository autoRepo;
	

	public List<Korisnik> getAllKorisnik() {
		List<Korisnik> allKorisnik = new ArrayList<>();
		korisnikRepo.findAll().forEach(allKorisnik::add);
		// System.out.println(allKorisniks.size());
		return allKorisnik;
	}


	public Korisnik getKorisnik(String username) {

		return korisnikRepo.findByUsernameIgnoreCase(username);
	}

	public Korisnik getKorisnik(Long id) {
		return korisnikRepo.findById(id).get();
	}

	

	public void updatePassword(Korisnik a) {
		korisnikRepo.save(a);
	}

	public void deleteKorisnik(Long id) {
		Korisnik a = korisnikRepo.findById(id).get();
		korisnikRepo.delete(a);
	}

	public Korisnik findByEmail(String email) {
		return korisnikRepo.findByEmailIgnoreCase(email);
	}

	public Korisnik findByConfirmationToken(String confirmationToken) {
		return korisnikRepo.findByConfirmationToken(confirmationToken);
	}

	@SuppressWarnings("rawtypes")
	public ResponseEntity<HashMap> registerKorisnik(RegisterDTO regDetails) throws URISyntaxException, MalformedURLException, InterruptedException {
		HashMap<String, String> map = new HashMap<>();
		Korisnik k = korisnikRepo.findByUsernameIgnoreCase(regDetails.getUsername());
		if(k!=null) {
			map.put("text", "Username is already taken.");
			return new ResponseEntity<>(map, HttpStatus.EXPECTATION_FAILED);
		}
			
			
		k = korisnikRepo.findByEmailIgnoreCase(regDetails.getEmail());
		if(k!=null) {
			map.put("text", "Email is already taken.");
			return new ResponseEntity<>(map, HttpStatus.EXPECTATION_FAILED);
		}
			
			
		if(!regDetails.getPassword1().equals(regDetails.getPassword2()))
			{
			map.put("text", "Passwords don't match.");
			return new ResponseEntity<>(map, HttpStatus.EXPECTATION_FAILED);
			}
		
		/*Zxcvbn passwordCheck = new Zxcvbn();		
		Strength strength = passwordCheck.measure(regDetails.getPassword1());
		if (strength.getScore() < 1) {
			map.put("text","Your password is too weak. Please choose a stronger one.");
			return new ResponseEntity<>(map, HttpStatus.EXPECTATION_FAILED);
		}
			*/
		Korisnik novi = new Korisnik();
		novi.setAktiviran(false);
		List<Authority> l = new ArrayList<>();
		Authority a = new Authority();
		
		if(regDetails.getIsAgent()!=null)
			a.setName(AuthorityName.ROLE_AGENT);
		else a.setName(AuthorityName.ROLE_USER);
		autoRepo.save(a);
		l.add(a);
		novi.setAuthorities(l);
		novi.setEmail(regDetails.getEmail());
		novi.setFirstName(regDetails.getFirstname());
		novi.setLastName(regDetails.getLastname());
		novi.setPassword(bCryptPasswordEncoder.encode(regDetails.getPassword1()));
		novi.setStatusNaloga(StatusKorisnika.NEPOTVRDJEN);
		novi.setLastPasswordResetDate(new Date());
		novi.setUsername(regDetails.getUsername());
		if(novi.getAuthorities().get(0).getName().toString().equals(AuthorityName.ROLE_AGENT.toString()))
			novi.setRole(Role.AGENT);
		else novi.setRole(Role.USER);
		novi.setConfirmationToken(UUID.randomUUID().toString());
		korisnikRepo.save(novi);
		
		
	    String link =  "https://localhost:8096";
		SimpleMailMessage registrationEmail = new SimpleMailMessage();
		registrationEmail.setTo(novi.getEmail());
		registrationEmail.setSubject("Registration Confirmation");
		registrationEmail.setText("To confirm your e-mail address, please click the link below:\n" +
				link + "/confirm/"+novi.getConfirmationToken().toString());
		registrationEmail.setFrom("noreply@domain.com");
		
		emailService.sendEmail(registrationEmail);
		//return new ResponseEntity<String>("Almost there! Please finish your registration via link we sent on your email.", HttpStatus.OK);
		
		map.put("text", "Almost there! Please finish your registration via link we sent on your email.");
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	public ResponseEntity<HashMap> confirmReg(HttpServletResponse response, String token) throws IOException {
		System.out.println("JEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEJ ♥");
		HashMap<String, String> map = new HashMap<>();
		Korisnik k = korisnikRepo.findByConfirmationToken(token);
		if(k==null) {
			map.put("text", "Bad token. Registration failed.");
			return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
		}
		
		k.setAktiviran(true);
		k.setStatusNaloga(StatusKorisnika.AKTIVAN);
		korisnikRepo.save(k);
		map.put("text", "Success! Your account is active now.");
		response.sendRedirect("https://localhost:8096/#!/success/2");
		return new ResponseEntity<>(map, HttpStatus.OK);
			
			
		// TODO Auto-generated method stub
		
	}

}
