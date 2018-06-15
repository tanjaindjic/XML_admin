package com.XmlWeb.admin.service;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.security.Security;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.aspectj.weaver.loadtime.Agent;
import org.bouncycastle.asn1.ASN1ObjectIdentifier;
import org.bouncycastle.asn1.x500.RDN;
import org.bouncycastle.asn1.x500.X500Name;
import org.bouncycastle.asn1.x500.style.BCStyle;
import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.pkcs.PKCS10CertificationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.XmlWeb.admin.dto.AgentRequestDTO;
import com.XmlWeb.admin.model.AgentRequest;
import com.XmlWeb.admin.model.Korisnik;
import com.XmlWeb.admin.repository.AgentRequestRepository;
import com.XmlWeb.admin.repository.KorisnikRepository;

@Service
public class AgentRequestService {
	
	@Autowired
	private AgentRequestRepository agentRequestRepository;
		
	@Autowired
	private CSRService csrService;
	
	@Autowired
	private KorisnikRepository korisnikRepo;
	
	
	public void populateRepository(List<AgentRequest> allRequests) {
		for (AgentRequest agentRequest : allRequests) {
			agentRequestRepository.save(agentRequest);
		}
	}
	
	public void addRequest(AgentRequest req) {
		System.out.println("sacuvao novi req");
		agentRequestRepository.save(req);
	}
	
	
	public List<AgentRequestDTO> makeDTORequests(){
		ArrayList<AgentRequestDTO> list = new ArrayList<>();
		for (AgentRequest ar : agentRequestRepository.findAll()) {
			AgentRequestDTO dto = createDTO(ar);
			list.add(dto);
		}
		return list;
	}
	
	public void syncReposytory() {}
	
	public AgentRequestDTO createDTO(AgentRequest req) {
		AgentRequestDTO dto = new AgentRequestDTO();
		InputStream csrStream = new ByteArrayInputStream(req.getCsr().getBytes());
		String username = csrService.readCertificateSigningRequest(csrStream);
		
		Korisnik k = korisnikRepo.findByUsernameIgnoreCase(username);
		if(k!=null) {
			dto.setKorisnikId(k.getId());
			dto.setFirstName(k.getFirstName());
			dto.setLastName(k.getLastName());
			dto.setEmail(k.getEmail());
			dto.setUsername(username);
			dto.setPassword(k.getPassword());
			dto.setLastPasswordResetDate(k.getLastPasswordResetDate());
			dto.setEnabled(k.isAktiviran());
			dto.setStatusNaloga(k.getStatusNaloga());
			dto.setAuthorities(k.getAuthorities());
			dto.setCsr(req.getCsr());
			dto.setAdresa(k.getAdresa());
			dto.setPIB(k.getPIB());
			dto.setCsrId(req.getId());
		}
		return dto;
	}

	public void deleteRequest(Long id) {
		
		try {
			RestTemplate restTemplate = new RestTemplate();
			String entityUrl = "https://localhost:8096/requests/" + id;
			restTemplate.delete(entityUrl);

		} catch (Exception ex) {
			System.out.println("Glavna baza nije dostupna, zahtevi ce biti preuzeti po ukljucenju baze.");
		}
		agentRequestRepository.deleteById(id);
		
	}
	
}
