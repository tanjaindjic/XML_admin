package com.XmlWeb.admin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Transient;

import org.bouncycastle.pkcs.PKCS10CertificationRequest;

@Entity
public class AgentRequest {

	@Id
	@GeneratedValue
	private Long id;
	
	@Lob
	@Column(length = 100000 ) 
	private String csr;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AgentRequest(Long id, String csr) {
		super();
		this.id = id;
		this.csr = csr;

	}

	public String getCsr() {
		return csr;
	}

	public void setCsr(String csr) {
		this.csr = csr;
	}

	public AgentRequest() {
		super();
	}

}
