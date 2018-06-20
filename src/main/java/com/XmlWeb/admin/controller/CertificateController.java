package com.XmlWeb.admin.controller;

import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.XmlWeb.admin.service.CertificateService;

@RestController
public class CertificateController {

	@Autowired
	private CertificateService certService;
	
	@RequestMapping(method=RequestMethod.POST, value="/generateCrt/req/{reqId}/user/{userId}", produces=MediaType.TEXT_PLAIN)
	public String getCSR(@RequestBody String csr, @PathVariable Long reqId, @PathVariable Long userId) {
		System.out.println("Usao u genereateCrt controller");
		
		return certService.generateCSR(csr, reqId, userId);
	}
}
