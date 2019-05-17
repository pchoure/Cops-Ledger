package com.blockchain.controller;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blockchain.bean.DataBean;
import com.blockchain.service.BlockchainService;

@RestController
public class BlockchainController {
	
	@Autowired
	BlockchainService blockchainService;
	Logger logger = Logger.getLogger("myLogger");

	@CrossOrigin(origins = { "http://localhost:8080", "http://localhost:4200" })             
	@RequestMapping("/blockchain/formData/{caseNumber}/{location}/{description}/{assignedOfficer}/{entryBy}/{category}")
	public void getFormData(@PathVariable("caseNumber") int caseNumber,@PathVariable("location") String location, @PathVariable("description") String description, @PathVariable("assignedOfficer") String assignedOfficer, @PathVariable("entryBy") String entryBy,@PathVariable("category") String category) 
	{
		logger.info("In getFormData Controller : ");
		blockchainService.getFormData(caseNumber, location, description, assignedOfficer, entryBy,category);
	}
	@CrossOrigin(origins = { "http://localhost:8080", "http://localhost:4200", "http://wwwin-webapps-dev.cisco.com" })             
	@RequestMapping("/blockchain/viewData/{fromDate}/{category}")
	public List<DataBean> getFilteredData(@PathVariable("fromDate") String fromDate, @PathVariable("category") String category) 
	{
		logger.info("In getFiltered Data Controller : ");
		 return blockchainService.getFilteredData(fromDate, category);
	}
}
