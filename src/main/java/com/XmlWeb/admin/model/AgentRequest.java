package com.XmlWeb.admin.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.bouncycastle.pkcs.PKCS10CertificationRequest;

@Entity
public class AgentRequest {

	@Id
	@GeneratedValue
	private Long id;
	
	@Transient 
	private PKCS10CertificationRequest csr;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AgentRequest(Long id, PKCS10CertificationRequest csr) {
		super();
		this.id = id;
		this.csr = csr;

	}

	public PKCS10CertificationRequest getCsr() {
		return csr;
	}

	public void setCsr(PKCS10CertificationRequest csr) {
		this.csr = csr;
	}

	public AgentRequest() {
		super();
	}

}
