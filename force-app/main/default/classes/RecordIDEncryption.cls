public class RecordIDEncryption { 
    // Encrypt Record ID 
    public static String encryptRecordID(String recordId) 
    { 
        //Blob exampleIv = Blob.valueOf('avcrsvacujabsvcu');
        Blob exampleIv = Blob.valueOf(System.Label.Private_Key);
        Blob encryptedData = Crypto.encrypt('AES128', exampleIv, exampleIv, Blob.valueOf(recordId)); 
        return EncodingUtil.base64Encode(encryptedData); 
    } 
    // Decrypt Record ID 
    public static String decryptRecordID(String encryptedRecordID){ 
        Blob exampleIv = Blob.valueOf(System.Label.Private_Key);
        Blob encryptedBlob = EncodingUtil.base64Decode(encryptedRecordID); 
        Blob decryptedData = Crypto.decrypt('AES128', exampleIv, exampleIv, encryptedBlob); 
        return decryptedData.toString(); 
    } 

}