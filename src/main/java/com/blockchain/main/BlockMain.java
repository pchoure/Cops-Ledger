package com.blockchain.main;
import java.util.ArrayList;
import java.util.logging.Logger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.WebApplicationInitializer;
@SpringBootApplication(scanBasePackages = { "com.blockchain" })
@ComponentScan("com.blockchain")
@EnableAutoConfiguration(exclude = { MongoAutoConfiguration.class })
@EnableCaching
public class BlockMain extends SpringBootServletInitializer implements WebApplicationInitializer {
	
	public static ArrayList<Object> blockchain = new ArrayList<Object>();
	
	
	/*
	 * public static int difficulty = 0;
	 * 
	 * public static Wallet walletA; public static Wallet walletB; public static
	 * Transaction genesisTransaction;
	 */

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BlockMain.class);
	}
	
	public static void main(String[] args) {	
		//add our blocks to the blockchain ArrayList:
		
		Logger logger = Logger.getLogger("myLogger");
		SpringApplication.run(BlockMain.class, args);
		logger.info("Hello");
	}}
		
		/*
		 * Security.addProvider(new
		 * org.bouncycastle.jce.provider.BouncyCastleProvider()); //Setup Bouncey castle
		 * as a Security Provider
		 * 
		 * //Create wallets: walletA = new Wallet(); walletB = new Wallet(); Wallet
		 * coinbase = new Wallet();
		 * 
		 * //create genesis transaction, which sends 100 NoobCoin to walletA:
		 * genesisTransaction = new Transaction(walletA.publicKey,new
		 * com.blockchain.bean.DataBean (01,new
		 * Date(),"delhi","road accident","abc","xyz") );
		 * genesisTransaction.generateSignature(coinbase.privateKey); //manually sign
		 * the genesis transaction genesisTransaction.transactionId = "0"; //manually
		 * set the transaction id
		 * 
		 * System.out.println("Creating and Mining Genesis block... "); Block genesis =
		 * new Block("0"); genesis.addTransaction(genesisTransaction);
		 * addBlock(genesis);
		 * 
		 * 
		 * 
		 * 
		 * //2nd transaction Transaction transaction2 = new //Transaction
		 * transaction2=new Transaction(walletB.publicKey,new DataBean (02,new
		 * Date(),"delhi","car robbery","xyz","xyz") ); Transaction transaction2 = new
		 * Transaction(walletB.publicKey,new DataBean (02,new
		 * Date(),"delhi","car robbery","xyz","xyz") ); Block block1 = new
		 * Block(genesis.hash); transaction2.generateSignature(walletB.privateKey);
		 * block1.addTransaction(transaction2);
		 * 
		 * addBlock(block1);
		 * 
		 * //3rd transaction Transaction transaction3 = new
		 * Transaction(walletB.publicKey,new DataBean (03,new
		 * Date(),"delhi","----","abc","abc") ); Block block2 = new Block(block1.hash);
		 * transaction3.generateSignature(walletB.privateKey);
		 * block2.addTransaction(transaction3); addBlock(block2);
		 * 
		 * 
		 * 
		 * 
		 * isChainValid();
		 * 
		 */
	
	
/*
 * public static Boolean isChainValid() { Block currentBlock; Block
 * previousBlock; String hashTarget = new String(new
 * char[difficulty]).replace('\0', '0');
 * 
 * //loop through blockchain to check hashes: for(int i=1; i <
 * blockchain.size(); i++) {
 * 
 * currentBlock = blockchain.get(i); previousBlock = blockchain.get(i-1);
 * //compare registered hash and calculated hash:
 * if(!currentBlock.hash.equals(currentBlock.calculateHash()) ){
 * System.out.println("#Current Hashes not equal"); return false; } //compare
 * previous hash and registered previous hash
 * if(!previousBlock.hash.equals(currentBlock.previousHash) ) {
 * System.out.println("#Previous Hashes not equal"); return false; } //check if
 * hash is solved if(!currentBlock.hash.substring( 0,
 * difficulty).equals(hashTarget)) {
 * System.out.println("#This block hasn't been mined"); return false; }
 * 
 * 
 * } System.out.println("Blockchain is valid"); return true; }
 * 
 * public static void addBlock(Block newBlock) { newBlock.mineBlock(difficulty);
 * blockchain.add(newBlock); } }
 */

/*
 * public static void main(String[] args) {	
		//add our blocks to the blockchain ArrayList:
		Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider()); //Setup Bouncey castle as a Security Provider
		
		//walletA = new Wallet();
		//walletB = new Wallet();
		
		//System.out.println("Private and public keys:");
		//System.out.println(StringUtil.getStringFromKey(walletA.privateKey));
		//System.out.println(StringUtil.getStringFromKey(walletA.publicKey));
		
		createGenesis();
		
		//Transaction transaction = new Transaction(walletA.publicKey, walletB.publicKey, 5);
		//transaction.signature = transaction.generateSignature(walletA.privateKey);
		
		//System.out.println("Is signature verified:");
		//System.out.println(transaction.verifiySignature());
		
	}
 */

//System.out.println("Trying to Mine block 1... ");
//addBlock(new Block("Hi im the first block", "0"));