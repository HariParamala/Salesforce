public class PersonAccountCallout {
    
    @future(callout=true)
    public static void makePostCallout( String sEmail, Decimal dShoeSize, String sTShirtSize, String sAccountId) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://integrations.commutatus.com/webhook/719ce78d-c2c5-47a8-986a-39d7e7a5652d');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        Map<String, Object> mapBody = new Map<String, Object>{'email' => sEmail, 'tshirtSize' => sTShirtSize, 'shoeSize' => dShoeSize};
        String sBody = JSON.serialize(mapBody); 
        System.debug('sBody: ' + sBody );
        //request.setBody('{"name":"mighty moose"}');
        request.setBody(sBody);
        HttpResponse response = http.send(request);
        // Parse the JSON response
        if(response.getStatusCode() != 200) {
            System.debug('The status code returned was not expected: ' +
                response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());
           	
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Account objAccount = new Account(Id = sAccountId, customer_id__c = String.valueof(results.get('customer_id'))
                                             );
            update objAccount;

        }
        
    }        

}