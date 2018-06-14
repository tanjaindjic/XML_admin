package com.XmlWeb.admin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.XmlWeb.admin.dto.AgentRequestDTO;
import com.XmlWeb.admin.model.AgentRequest;
import com.XmlWeb.admin.repository.AgentRequestRepository;

@Service
public class AgentRequestService {
	
	@Autowired
	private AgentRequestRepository agentRequestRepository;
	
	
	public void populateRepository(List<AgentRequest> allRequests) {
		for (AgentRequest agentRequest : allRequests) {
			agentRequestRepository.save(agentRequest);
		}
	}
	
	public AgentRequestDTO createDTO(AgentRequest agentRequest) {
		AgentRequestDTO dto = new AgentRequestDTO();
		return dto.createDTO(agentRequest);
	}
	
	public List<AgentRequestDTO> makeDTORequests(){
		ArrayList<AgentRequestDTO> list = new ArrayList<>();
		for (AgentRequest ar : agentRequestRepository.findAll()) {
			AgentRequestDTO dto = createDTO(ar);
			list.add(dto);
		}
		return list;
	}
	
	public void syncReposytory() {}

}
