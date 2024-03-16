public without sharing class CustomerService {

    @Auraenabled
    public static void updateCustomerProfile(String sMaskedAccountId, String sShirtSize, String sShoeSize, String sPhoneNumber, String sEmail){
        
        try{
            String sAccountRecordId = RecordIDEncryption.decryptRecordID(sMaskedAccountId);
            System.debug('sAccountRecordId: ' + sAccountRecordId);
            Account objAccount = new Account(Id = sAccountRecordId, Phone = sPhoneNumber, Shirt_Size__c = sShirtSize, Shoe_Size__c= sShoeSize, Profile_Completed__c = true);
            //update objAccount;
            Database.SaveResult objsr = Database.update(objAccount, false);
            if(objsr.isSuccess()){
                PersonAccountCallout.makePostCallout(sEmail, Decimal.valueOf(sShoeSize), sShirtSize, sAccountRecordId);
            }
            
                }catch(exception e){
                    throw new AuraHandledException(e.getMessage());
                }
        
        
    }
    
    @Auraenabled(cacheable=true)
    public static Account getCustomerProfile(String sMaskedAccountId){
        
        try{
    		
            String sAccountRecordId = RecordIDEncryption.decryptRecordID(sMaskedAccountId);
	            
            Account objAccount = [SELECT Id, Name, Email__c, Phone, Shirt_Size__c, Shoe_Size__c FROM Account WHERE Id =: sAccountRecordId LIMIT 1];
            return objAccount;
        }catch(exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
        
    }
    
    
}