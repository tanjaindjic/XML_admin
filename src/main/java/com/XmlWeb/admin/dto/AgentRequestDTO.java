package com.XmlWeb.admin.dto;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.security.Security;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.apache.commons.io.IOUtils;
import org.bouncycastle.asn1.ASN1ObjectIdentifier;
import org.bouncycastle.asn1.x500.RDN;
import org.bouncycastle.asn1.x500.X500Name;
import org.bouncycastle.asn1.x500.style.BCStyle;
import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.pkcs.PKCS10CertificationRequest;
import org.springframework.beans.factory.annotation.Autowired;

import com.XmlWeb.admin.model.AgentRequest;
import com.XmlWeb.admin.model.Authority;
import com.XmlWeb.admin.model.Korisnik;
import com.XmlWeb.admin.model.StatusKorisnika;
import com.XmlWeb.admin.repository.KorisnikRepository;
import com.XmlWeb.admin.service.CSRService;


public class AgentRequestDTO {
	

	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String username;
	private String password;
	private Date lastPasswordResetDate;
	private boolean enabled;
	private StatusKorisnika statusNaloga;
	private List<Authority> authorities;
	private String csr;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getLastPasswordResetDate() {
		return lastPasswordResetDate;
	}
	public void setLastPasswordResetDate(Date lastPasswordResetDate) {
		this.lastPasswordResetDate = lastPasswordResetDate;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public StatusKorisnika getStatusNaloga() {
		return statusNaloga;
	}
	public void setStatusNaloga(StatusKorisnika statusNaloga) {
		this.statusNaloga = statusNaloga;
	}
	public List<Authority> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}
	
	public String getCsr() {
		return csr;
	}
	public void setCsr(String csr) {
		this.csr = csr;
	}
	public AgentRequestDTO(Long id, String firstName, String lastName, String email, String username, String password,
			Date lastPasswordResetDate, boolean enabled, StatusKorisnika statusNaloga, List<Authority> authorities, String csr) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.username = username;
		this.password = password;
		this.lastPasswordResetDate = lastPasswordResetDate;
		this.enabled = enabled;
		this.statusNaloga = statusNaloga;
		this.authorities = authorities;
		this.csr = csr;
	}
	
	public AgentRequestDTO() {
		// TODO Auto-generated constructor stub
	}
	/*public AgentRequestDTO createDTO(AgentRequest req) {
		InputStream csrStream = new ByteArrayInputStream(req.getCsr().getBytes());
		String username = readCertificateSigningRequest(csrStream);
		System.out.println("USERNAME: "+ username);
		Korisnik k = korisnikRepo.findByUsernameIgnoreCase(username);
		if(k!=null) {
			this.id = k.getId();
			this.firstName = k.getFirstName();
			this.lastName = k.getLastName();
			this.email = k.getEmail();
			this.username = username;
			this.password = k.getPassword();
			this.lastPasswordResetDate = k.getLastPasswordResetDate();
			this.enabled = k.isAktiviran();
			this.statusNaloga = k.getStatusNaloga();
			this.authorities = k.getAuthorities();
			this.csr = req.getCsr();
		}
		//naci korisnika u repo i popuniti sva polja ovde iz tog korisnika
		return this;
	}
	
	private PKCS10CertificationRequest convertPemToPKCS10CertificationRequest(InputStream pem) {
	    Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());
	    PKCS10CertificationRequest csr = null;
	    ByteArrayInputStream pemStream = null;

	    pemStream = (ByteArrayInputStream) pem;

	    Reader pemReader = new BufferedReader(new InputStreamReader(pemStream));
	    PEMParser pemParser = null;
	    try {
	        pemParser = new PEMParser(pemReader);
	        Object parsedObj = pemParser.readObject();
	        System.out.println("PemParser returned: " + parsedObj);
	        if (parsedObj instanceof PKCS10CertificationRequest) {
	            csr = (PKCS10CertificationRequest) parsedObj;
	        }
	    } catch (IOException ex) {
	        ex.printStackTrace();
	    } finally {
	        if (pemParser != null) {
	            IOUtils.closeQuietly(pemParser);
	        }
	    }
	    return csr;
	}
	
	public String readCertificateSigningRequest(InputStream pem) {

	    PKCS10CertificationRequest csr = convertPemToPKCS10CertificationRequest(pem);
	    String username = null;

	    if (csr == null) {
	        System.out.println("FAIL! conversion of Pem To PKCS10 Certification Request");
	    } else {
	       X500Name x500Name = csr.getSubject();

	       System.out.println("x500Name is: " + x500Name + "\n");

	       username = getX500Field(BCStyle.UNIQUE_IDENTIFIER, x500Name);
	    }
	    return username;
	}
	
	private String getX500Field(ASN1ObjectIdentifier asn1ObjectIdentifier, X500Name x500Name) {
	    RDN[] rdnArray = x500Name.getRDNs(asn1ObjectIdentifier);

	    String retVal = null;
	    for (RDN item : rdnArray) {
	        retVal = item.getFirst().getValue().toString();
	    }
	    return retVal;
	}*/

}
