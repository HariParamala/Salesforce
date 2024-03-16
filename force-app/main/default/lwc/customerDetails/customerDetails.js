import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getCustomerProfile from "@salesforce/apex/CustomerService.getCustomerProfile";
import updateCustomerProfile from "@salesforce/apex/CustomerService.updateCustomerProfile";
/* import ShoeSize from '@salesforce/schema/Account.Shoe_Size__c';
import ShirtSize from '@salesforce/schema/Account.Shirt_Size__c';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';*/
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class CustomerDetails extends LightningElement {

    currentPageReference = null; 
    urlStateParameters = null;
    maskedRecordid;

    @track accountdetails;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.urlStateParameters = currentPageReference.state;
          this.setParametersBasedOnUrl();
          
       }
    }
    setParametersBasedOnUrl() {
       this.maskedRecordid = this.urlStateParameters.c__paid; 
	}

    @track draftAccountdetails;

    @wire(getCustomerProfile, {sMaskedAccountId: "$maskedRecordid"})
    wiredCustomerProfile(result) {

        const {data, error} = result;
        if(error){
            console.log('Error: ' + JSON.stringify(error));
        }else if(data){
            console.log('data: ' + JSON.stringify(data));
            this.accountdetails = data;
            this.draftAccountdetails = data;
        }
    
    }


    lstShoeSizeOptions = [

        { label: '6', value: '6' },
        { label: '6.5', value: '6.5' },
        { label: '7', value: '7' },
        { label: '7.5', value: '7.5' },
        { label: '8', value: '8' },
        { label: '8.5', value: '8.5' },
        { label: '9', value: '9' },
        { label: '9.5', value: '9.5' },
        { label: '10', value: '10' },
        { label: '10.5', value: '10.5' },
        { label: '11', value: '11' },
        { label: '11.5', value: '11.5' },
        { label: '12', value: '12' },
        { label: '12.5', value: '12.5' },
        { label: '13', value: '13' },
        { label: '13.5', value: '13.5' },
        { label: '14', value: '14' },
        { label: '14.5', value: '14.5' },
        { label: '15', value: '15' },
        { label: '15.5', value: '15.5' },
        { label: '16', value: '16' },

    ];
    lstTshirtSizeOptions = [
        { label: 'XS', value: 'XS' },
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
        { label: 'XXL', value: 'XXL' },
    ];

    handlePhoneChange(event){
        this.accountdetails = {...this.accountdetails, Phone:event.detail.value} ;
    }

    handleTshirtSize(event){
        this.accountdetails = {...this.accountdetails, Shirt_Size__c:event.detail.value} ;
    }

    handleShoeSize(event){
        this.accountdetails = {...this.accountdetails, Shoe_Size__c:event.detail.value} ;
    }

    handleSave(event){
        this.bSpinner = true;
        console.log('calling handlesave');
        updateCustomerProfile({sMaskedAccountId : this.maskedRecordid,
            sShirtSize: this.accountdetails.Shirt_Size__c, 
            sShoeSize: this.accountdetails.Shoe_Size__c,
            sPhoneNumber: this.accountdetails.Phone,
            sEmail: this.accountdetails.Email__c
        })
        .then(result => {
            console.log('success..')
            this.showNotification('Success', 'Successfully updated profile', 'success');
            this.bDisableEditDetails = true;
            this.bSpinner = false;
            this.bCustomerDetailsUpdated = true;
            this.draftAccountdetails = {...this.accountdetails};
        })
        .catch(error => {
            this.showNotification('Falied', 'error occurred while saving', 'error');
            this.bDisableEditDetails = true;
            this.bSpinner = false;
        })
    }

/*     @wire(getObjectInfo, { objectApiName: 'Account' })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: ShoeSize })
    wiredShoeSizeMethod({ data, error }) {
        if (data) {
            console.log('data: ' + JSON.stringify(data));
            this.lstShoeSizeOptions = data.values.map(item => {
                return { label: item.label, value: item.value }
            })

        }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    }

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: ShirtSize })
    wiredTShirtSizeMethod({ data, error }) {
        if (data) {
            console.log('data: ' + JSON.stringify(data));
            this.lstTshirtSizeOptions = data.values.map(item => {
                return { label: item.label, value: item.value }
            })

        }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    } */

    bDisableEditDetails = true;

    handleEdit(event) {
        this.bDisableEditDetails = false;
        this.bCustomerDetailsUpdated = false;
    }

    showNotification(title, message, variant) {
    const evt = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: 'pester'
    });
    this.dispatchEvent(evt);
    }

    bCustomerDetailsUpdated = false;

    handleCancel(event){
        this.bDisableEditDetails = true;
        this.accountdetails = {...this.draftAccountdetails};
    }

}