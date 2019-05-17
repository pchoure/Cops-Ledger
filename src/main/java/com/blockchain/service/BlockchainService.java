package com.blockchain.service;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blockchain.bean.DataBean;
import com.blockchain.repository.RegisterFormRepository;

@Service
public class BlockchainService {

	@Autowired
	RegisterFormRepository registerFormRepository;
	Logger logger = Logger.getLogger("myLogger");
	
	public void getFormData(int caseNumber, String location, String description, String assignedOfficer,
			String entryBy,String category)
	{  logger.info("In getFormData Service : ");
		registerFormRepository.getFormData(caseNumber, location, description, assignedOfficer, entryBy,category);
		
	} 
	public List<DataBean> getFilteredData(String fromDate, String category)
	{
		 return registerFormRepository.getFilteredData(fromDate, category);
		
	}
}
