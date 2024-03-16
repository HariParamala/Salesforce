import { LightningElement, api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
export default class CreatePersonAccountLwc extends NavigationMixin(LightningElement) {

    objectApiName = 'Account';
    accountId;

    bSpinner = true;

    handleload(event){
        this.bSpinner = false;
    }

    handleSuccess(event) {
        this.accountId = event.detail.id;

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.accountId,
                actionName: 'view'
            }
        });
    }

}