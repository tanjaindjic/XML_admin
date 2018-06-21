package com.XmlWeb.admin;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.XmlWeb.admin.security.CertificateDTO;
import com.XmlWeb.admin.service.CertificateService;
import com.XmlWeb.admin.service.KeyStoreService;

@Component
public class StartData {

	@Autowired 
	private KeyStoreService kss;
	
	@Autowired 
	private CertificateService cs;
	
	@PostConstruct
	private void init() {
		kss.createKeyStores();
		kss.loadKeyStore("ksCa.jks", "passwordCa");
		kss.loadKeyStore("ksNonCa.jks", "passwordNonCa");
		
		
		
		/*//kss.readIssuerFromStore("admin");
		// System.out.println(kss.getCertificates());
	
		CertificateDTO dto = new CertificateDTO();
		dto.setCommonName("admin");
		dto.setId("1");
		dto.setEmail("admir@admir.com");
		dto.setGivenName("Admin");
		dto.setSurname("Admin");
		dto.setCountry("RS");
		dto.setIsCa(true);
		dto.setIssuerName("");
		dto.setIssuerSerialNumber(null);
		dto.setOrgName("Pig Inc BOOKING");
		dto.setOrgNameUnit("Admin Sector");
		dto.setPIB("");
		dto.setAdresa("");
		cs.generateCertificate(dto);*/
		
		
	}
	
}
