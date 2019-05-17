package com.blockchain.bean;

public class DataBean 
{
	int caseNumber;
	String reportedDate;
	String location;
	String description;
	String assignedOfficer;
	String entryBy;
	String category;
	public DataBean()
	{
		
	}
	public DataBean(int caseNumber, String reportedDate, String location, String description, String assignedOfficer,
			String entryBy, String category) {
		super();
		this.caseNumber = caseNumber;
		this.reportedDate = reportedDate;
		this.location = location;
		this.description = description;
		this.assignedOfficer = assignedOfficer;
		this.entryBy = entryBy;
		this.category = category;
	}
	public int getCaseNumber() {
		return caseNumber;
	}
	public void setCaseNumber(int caseNumber) {
		this.caseNumber = caseNumber;
	}
	public String getReportedDate() {
		return reportedDate;
	}
	public void setReportedDate(String reportedDate) {
		this.reportedDate = reportedDate;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAssignedOfficer() {
		return assignedOfficer;
	}
	public void setAssignedOfficer(String assignedOfficer) {
		this.assignedOfficer = assignedOfficer;
	}
	public String getEntryBy() {
		return entryBy;
	}
	public void setEntryBy(String entryBy) {
		this.entryBy = entryBy;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	
	@Override
	public String toString() {
		return "DataBean [caseNumber=" + caseNumber + ", reportedDate=" + reportedDate + ", location=" + location
				+ ", description=" + description + ", assignedOfficer=" + assignedOfficer + ", entryBy=" + entryBy
				+ ", category=" + category + "]";
	}
}
