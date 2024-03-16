public class CustomerServiceInvocable {

    @InvocableMethod(label='Send Email to Customer' description='Send Email to Customer' category='Account')
    public static Void setEmails(List<Request> lstRequests) {
        List<Network> lstNetwork = [SELECT Id, UrlPathPrefix FROM Network WHERE Name = 'Customer'];
        String base;
        
        for (Request objRequest : lstRequests) {
            
            if(lstNetwork != NULL && !lstNetwork.isEmpty()){
                base = Network.getLoginUrl(lstNetwork[0].Id);
                base = base.replace('/login', '');
                String sEncryptedId = RecordIDEncryption.encryptRecordID(objRequest.AccountId);
                String sBaseandAccountId = base + '?c__paid=' + sEncryptedId;
                String body = 'Hi Customer your Profile is created. Please access and update your details her... ' + sBaseandAccountId;
                EmailManager.sendMail(objRequest.emailId, 'Customer Details', body);
        	}
            
        }
        
        
        
    }
    
    public class Request {
        @InvocableVariable(label='Customer EmailId' description='Customer Email Id' required=true)
        public String emailId;
        @InvocableVariable(label='Customer AccountId' description='Customer Account Id' required=true)
        public Id AccountId;
    }
    
}