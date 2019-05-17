package com.blockchain.repository;
import java.security.Security;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.stereotype.Repository;

import com.blockchain.bean.Block;
import com.blockchain.bean.DataBean;
import com.blockchain.main.BlockMain;
import com.blockchain.wallet.Transaction;
import com.blockchain.wallet.Wallet;

@Repository
public class RegisterFormRepository {

	Logger myLogger = Logger.getLogger("myLogger");
public static int difficulty = 0;
	
	public static Wallet walletA;
	public static Wallet walletB;
	public static Transaction genesisTransaction;

	public void getFormData(int caseNumber, String location, String description, String assignedOfficer, String entryBy,String category) {
		myLogger.info("In getFormData repository : ");
		DataBean databean = new DataBean();
		Date date=new Date();
	 SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");  
	  String strDate= formatter.format(date);  
//		System.out.println("dateis "+strDate);
		databean.setCaseNumber(caseNumber);
		databean.setReportedDate(strDate);
		
		databean.setLocation(location);
		databean.setDescription(description);
		databean.setAssignedOfficer(assignedOfficer);
		databean.setEntryBy(entryBy);
		databean.setCategory(category);
		 System.out.println(databean.toString());
		setFormData(databean);
		//BlockMain.blockchain.add(databean);
	}

	public List<DataBean> getFilteredData(String fromDate, String category) {
		DataBean db=new DataBean();
	    List<DataBean> newList = new ArrayList<DataBean>();
	    System.out.println("date and category"+fromDate+category);
		
	    for (int i = 0; i < BlockMain.blockchain.size(); i++)  
	    {
	    	  ArrayList<Transaction> transactions1 = new ArrayList<Transaction>();
	    	  
	    	  transactions1= ((Block) BlockMain.blockchain.get(i)).getTransactions();
	    	  
	    	  for(int j=0;j<transactions1.size();j++)
	    	  {
	    		  Transaction t=new Transaction();
	    		  t=transactions1.get(j);
	    		   db=t.getValue();
	    		  System.out.println(db.toString()+" ");
	    		  
	    		  newList.add(db);
	    		  
	    	  }
	    	           
	    	  } 
	    return newList;
	}
	    
	    /*
		 * DataBean databean = new DataBean(); Date fromDate1 = new Date(); //fromDate1
		 * = fromDate; //Date reportedDate = new Date();
		 * 
		 * while (!BlockMain.blockchain.isEmpty()) {
		 * 
		 * 
		 * //reportedDate = databean.getReportedDate(); }
		 */
	

	
	public void setFormData(DataBean d)
	{

		Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider()); //Setup Bouncey castle as a Security Provider
		
		//Create wallets:
		walletA = new Wallet();
		walletB = new Wallet();		
		
	
		Wallet coinbase = new Wallet();
		
		if(BlockMain.blockchain.size()==0)
		{
			//create genesis transaction, which sends 100 NoobCoin to walletA: 
			
			if(d.getEntryBy().equals("abc"))
			{
				genesisTransaction = new Transaction(walletA.publicKey,d);
				genesisTransaction.generateSignature(coinbase.privateKey);	 //manually sign the genesis transaction	
				genesisTransaction.transactionId = "0"; //manually set the transaction id
				
				System.out.println("Creating and Mining Genesis block... ");
				Block genesis = new Block("0");
				genesis.addTransaction(genesisTransaction);
				addBlock(genesis);
				
			}
			else
			{
				genesisTransaction = new Transaction(walletB.publicKey,d);
				genesisTransaction.generateSignature(coinbase.privateKey);	 //manually sign the genesis transaction	
				genesisTransaction.transactionId = "0"; //manually set the transaction id
				
				System.out.println("Creating and Mining Genesis block... ");
				Block genesis = new Block("0");
				genesis.addTransaction(genesisTransaction);
				addBlock(genesis);
				
			}
			
			
			
			
		}
		else
		{
			
			if(d.getEntryBy().equals("abc")) 
			{
				Transaction transaction2 = new Transaction(walletA.publicKey,d );
				 int size=BlockMain.blockchain.size();
				 System.out.println("size is "+size);
				// Block o= (Block) BlockMain.blockchain.get(BlockMain.blockchain.size()-1);
				 Block o= (Block) BlockMain.blockchain.get(size-1);
				Block block1 = new Block(o.hash);
				transaction2.generateSignature(walletA.privateKey);
				block1.addTransaction(transaction2);
				
				addBlock(block1);	
				
			}
			else
			{
				Transaction transaction2 = new Transaction(walletB.publicKey,d );
				 int size=BlockMain.blockchain.size();
				 Block o= (Block) BlockMain.blockchain.get(BlockMain.blockchain.size()-1);
				Block block1 = new Block(o.hash);
				transaction2.generateSignature(walletB.privateKey);
				block1.addTransaction(transaction2);
				
				addBlock(block1);	
			}
			
			
		
			
		}
				
		
		
				
		isChainValid();
		
		
		
	}
	
	
	



public static Boolean isChainValid() {
	Block currentBlock; 
	Block previousBlock;
	String hashTarget = new String(new char[difficulty]).replace('\0', '0');
			
	//loop through blockchain to check hashes:
	for(int i=1; i < BlockMain.blockchain.size(); i++) {
		
		currentBlock = (Block) BlockMain.blockchain.get(i);
		previousBlock = (Block) BlockMain.blockchain.get(i-1);
		//compare registered hash and calculated hash:
		if(!currentBlock.hash.equals(currentBlock.calculateHash()) ){
			System.out.println("#Current Hashes not equal");
			return false;
		}
		//compare previous hash and registered previous hash
		if(!previousBlock.hash.equals(currentBlock.previousHash) ) {
			System.out.println("#Previous Hashes not equal");
			return false;
		}
		//check if hash is solved
		if(!currentBlock.hash.substring( 0, difficulty).equals(hashTarget)) {
			System.out.println("#This block hasn't been mined");
			return false;
		}
		
					
	}
	System.out.println("Blockchain is valid");
	return true;
}

public static void addBlock(Block newBlock) {
	newBlock.mineBlock(difficulty);
	BlockMain.blockchain.add(newBlock);
}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
