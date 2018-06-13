package com.XmlWeb.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	

	  private JavaMailSender mailSender;
	  

	  @Autowired
	  public EmailService(JavaMailSender mailSender) {
	    this.mailSender = mailSender;
	  }
	  
	  @Async
	  public void sendEmail(SimpleMailMessage email) {
	    mailSender.send(email);
	  }
			
	/*@Async
	public void sendEmail(String to) throws InterruptedException {
		
		System.out.println("Sending email...");
		try{
			String host ="smtp.mailhost.com" ;
	        String user = "mailUser";
	        String pass = "mailPass";
	        String from = "piginco@gmail.com";
	        String subject = "Activate your account";
	        String messageText =  "Please go to following link to activate your account: https://localhost:8096/confirm?token=" + to;
	        boolean sessionDebug = false;
	
	        Properties props = System.getProperties();
	
	        props.put("mail.smtp.starttls.enable", "true");
	        props.put("mail.smtp.host", host);
	        props.put("mail.smtp.port", "587");
	        props.put("mail.smtp.auth", "true");
	        props.put("mail.smtp.starttls.required", "true");
	
	        java.security.Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());
	        Session mailSession = Session.getDefaultInstance(props, null);
	        mailSession.setDebug(sessionDebug);
	        Message msg = new MimeMessage(mailSession);
	        msg.setFrom(new InternetAddress(from));
	        InternetAddress[] address = {new InternetAddress(to)};
	        msg.setRecipients(Message.RecipientType.TO, address);
	        msg.setSubject(subject); msg.setSentDate(new Date());
	        msg.setText(messageText);
	
	       Transport transport=mailSession.getTransport("smtp");
	       transport.connect(host, user, pass);
	       transport.sendMessage(msg, msg.getAllRecipients());
	       transport.close();
	       System.out.println("message send successfully");
	    }catch(Exception ex)
	    {
	        System.out.println(ex);
	    }

	}*/

}