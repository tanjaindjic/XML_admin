package com.XmlWeb.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.XmlWeb.admin.dto.AgentRequestDTO;
import com.XmlWeb.admin.model.AgentRequest;
import com.XmlWeb.admin.repository.KorisnikRepository;
import com.XmlWeb.admin.service.AgentRequestService;
import com.XmlWeb.admin.service.KorisnikService;


@RestController
public class RequestsController {
	
	@Autowired
	private AgentRequestService agentReqService;
	
	@Autowired
	private KorisnikService korisnikService;

	@RequestMapping(method = RequestMethod.GET, value = "/requests")
	public List<AgentRequestDTO> getRequests() {
		return agentReqService.makeDTORequests();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/requests")
	public void receiveRequest(@RequestBody AgentRequest req) {
		agentReqService.addRequest(req);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/requests/{reqId}/user/{userId}")
	public void rejectRequest(@PathVariable Long reqId, @PathVariable Long userId) {
		korisnikService.deleteKorisnik(userId);
		agentReqService.deleteRequest(reqId);
	}
	
	
}
