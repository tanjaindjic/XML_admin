package com.XmlWeb.admin.controller;

import java.util.List;

import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.XmlWeb.admin.security.CertificateDTO;
import com.XmlWeb.admin.service.CertificateService;
import com.XmlWeb.admin.service.KeyStoreService;

@RestController
public class CertificateController {

	@Autowired
	private CertificateService certService;
	
	@Autowired
	private KeyStoreService keyStoreService;
	
	@RequestMapping(method=RequestMethod.POST, value="/generateCrt/req/{reqId}/user/{userId}", produces=MediaType.TEXT_PLAIN)
	public String getCSR(@RequestBody String csr, @PathVariable Long reqId, @PathVariable Long userId) {
		System.out.println("Usao u genereateCrt controller");
		
		return certService.generateCSR(csr, reqId, userId);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/getAdminCerts")
	public void getAdminCSR(@RequestHeader("Authorization") String accessToken) {
		
		System.out.println(accessToken);
		System.out.println("usao u getadmincerts");
		
		RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON);
        headers.add("Authorization", accessToken);HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<List<CertificateDTO>> rateResponse = restTemplate.exchange("https://localhost:8096/certificates/type/admin", 
        		HttpMethod.GET, entity,new ParameterizedTypeReference<List<CertificateDTO>>() {});
        
        List<CertificateDTO> certs = rateResponse.getBody();
        
        for (CertificateDTO certificateDTO : certs) {
        	if(certificateDTO.getIssuerSerialNumber().equals(certificateDTO.getSerialNumber())) {
        		certificateDTO.setIssuerSerialNumber("");
        		certificateDTO.setIssuerName("");
        		certificateDTO.setIsCa(true);
        	}
        		
        	keyStoreService.createKeyStores();
        	certService.generateCertificate(certificateDTO);
    
    		System.out.println(certificateDTO.getCommonName());
    		System.out.println("jeste ca");
    		System.out.println(keyStoreService.readIssuerFromStore(certificateDTO.getCommonName()));
       
		}
        System.out.println(keyStoreService.getCertificates().size());
        
	
	}
}
