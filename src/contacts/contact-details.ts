import {autoinject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Contact} from './contact';
import {ContactService} from './contactService';
import {ContactSelected, ContactUpdated, ContactViewed} from './messages';
import {areEqual} from '../common/utility';
import {Validation} from 'aurelia-validation';

@autoinject
export class ContactDetails {
   
  public heading = 'Contact Details';
  public contact:Contact;
  private originalContact:Contact;
  private selectedId:string;
  private validation:Validation;
  
  constructor(public ea:EventAggregator, public api:ContactService, private valid:Validation){
    this.api = api;
    this.ea = ea;
    this.contact = new Contact();   
    
    this.validation = valid.on(this)
        .ensure('contact.firstName').isNotEmpty().hasMinLength(3).hasMaxLength(10)
        .ensure('contact.lastName').isNotEmpty().hasMinLength(3).hasMaxLength(10)
        .ensure('contact.email').isNotEmpty().isEmail();    
    
    this.contact.validation = this.validation;    
  }

  activate(params:any, config:any):any { //params, config
    // this.ea.subscribe(ContactSelected, msg => {
    //   console.log(msg.contact);
    //   this.contact = this.originalContact = msg.contact;
    // });
    if (!params.id) { 
      this.contact = this.originalContact = new Contact(); 
      return true; 
    }
    this.contact.setEditMode(true);
    
    return this.api.getById(params.id).then(contact => {
      this.contact = this.originalContact = new Contact(contact);
      config.navModel.setTitle(this.contact.firstName);
      this.ea.publish(new ContactViewed(this.contact));
    });
  } 

  save(){
    this.contact.revertChanges();
    // this.api.save(this.contact).then(contact => {
    //   this.contact = contact;
    //   //this.originalContact = JSON.parse(JSON.stringify(contact));
    //   this.ea.publish(new ContactUpdated(this.contact));
    // });
  }

  canDeactivate(){
    if (!this.contact.id) {return true;}
    if(!areEqual(this.originalContact, this.contact)){
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');
      if(!result){
        this.ea.publish(new ContactViewed(this.contact));
      }
      return result;
    }
    return true;
  }
  
}