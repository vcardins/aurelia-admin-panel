import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Contact} from './contact';
import {ContactService} from './contactService';
import {ContactSelected, ContactUpdated, ContactViewed} from './messages';
import {areEqual} from '../common/utility';

export class ContactDetails {
  
  static inject = [EventAggregator, ContactService];
  
  public heading = 'Contact Details';
  public contact:Contact;
  private originalContact:Contact;
  private selectedId:string;
  
  constructor(public ea:EventAggregator, public api:ContactService){
    this.api = api;
    this.ea = ea;
    this.contact = new Contact();   
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
    return this.api.getById(params.id).then(contact => {
      this.contact = this.originalContact = new Contact(contact);
      config.navModel.setTitle(this.contact.firstName);
      this.ea.publish(new ContactViewed(this.contact));
    });
  }

  get canSave(){
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  save(){
    this.api.save(this.contact).then(contact => {
      this.contact = contact;
      //this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactUpdated(this.contact));
    });
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