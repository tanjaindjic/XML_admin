package com.XmlWeb.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.XmlWeb.admin.dto.AgentRequestDTO;
import com.XmlWeb.admin.service.AgentRequestService;


@RestController
public class RequestsController {
	
	@Autowired
	private AgentRequestService agentReqService;

	@RequestMapping(method = RequestMethod.GET, value = "/requests")
	public List<AgentRequestDTO> getRequests() {
		return agentReqService.makeDTORequests();
	}
}
