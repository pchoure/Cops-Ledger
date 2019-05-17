package com.blockchain.wallet;
 import java.security.PrivateKey;
import java.security.PublicKey;

import com.blockchain.bean.DataBean;
import com.blockchain.utility.StringUtil;



public class Transaction {
	

	public String transactionId; // this is also the hash of the transaction.
	public PublicKey sender; // author's address/public key.
	public DataBean value;
	public byte[] signature; 
	
		
		
	public DataBean getValue() {
		return value;
	}



	public void setValue(DataBean value) {
		this.value = value;
	}



	private static int sequence = 0; //A rough count of how many transactions have been generated 
	
	// Constructor: 
	public Transaction(PublicKey sender, com.blockchain.bean.DataBean value) {
		super();
		this.sender = sender;
		this.value = value;
	}


	
	public Transaction() {
		// TODO Auto-generated constructor stub
	}



	public boolean processTransaction() {
		
		if(verifySignature() == false) {
			System.out.println("#Transaction Signature failed to verify");
			return false;
		}
				
					
		
		
		return true;
	}
	
		
	
	public void generateSignature(PrivateKey privateKey) {
		String data = StringUtil.getStringFromKey(sender) + value.toString();
		signature = StringUtil.applyECDSASig(privateKey,data);		
	}
	
	public boolean verifySignature() {
		String data = StringUtil.getStringFromKey(sender) + value.toString()	;
		return StringUtil.verifyECDSASig(sender, data, signature);
	}
	
	
	
	private String calulateHash() {
		sequence++; //increase the sequence to avoid 2 identical transactions having the same hash
		return StringUtil.applySha256(
				StringUtil.getStringFromKey(sender) +value.toString() + sequence
				);
	}
}
