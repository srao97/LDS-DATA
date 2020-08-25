import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {createRecord} from 'lightning/uiRecordApi';
import {reduceErrors} from 'c/ldsUtils';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class LdsCreateRecord extends LightningElement {
    accountId;
    name = '';

    nameChangeHandler(event){
        this.accountId = undefined;
        this.name =event.target.value;
    }
    createHandler(){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = {apiName:ACCOUNT_OBJECT.objectApiName, fields};
        createRecord(recordInput).then((account)=>{
            this.accountId = account.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Successs',
                    message: 'Account Created',
                    variant: 'success'
                })
            );
        })
        .catch((error)=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: reduceErrors(error).join(','),
                    variant: 'error'
                })
            );
        });

    }
}   