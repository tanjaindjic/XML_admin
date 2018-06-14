package com.XmlWeb.admin.service;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.security.Security;

import org.apache.commons.io.IOUtils;
import org.bouncycastle.asn1.ASN1ObjectIdentifier;
import org.bouncycastle.asn1.x500.RDN;
import org.bouncycastle.asn1.x500.X500Name;
import org.bouncycastle.asn1.x500.style.BCStyle;
import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.pkcs.PKCS10CertificationRequest;
import org.springframework.stereotype.Service;

@Service
public class CSRService {

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
	}
}
