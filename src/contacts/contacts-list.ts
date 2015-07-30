import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Contact} from './contact';
import {ContactService} from './contactService';
import {ContactSelected, ContactUpdated, ContactViewed} from './messages';

export class ContactsList {
  static inject = [EventAggregator, ContactService];
  
  public heading = 'Contact List';
  public contacts:Array<Contact> = [];
  private selectedId:string;
  
  constructor(public ea:EventAggregator, public api:ContactService){
    this.api = api;
    this.ea = ea;

    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.filter(x => x.id == id)[0];
      Object.assign(found, msg.contact);
    });
  }
  
  created(){
    this.api.all().then(contacts => {
      this.contacts = contacts;
    });
  }

  select(contact:Contact){
    this.selectedId = contact.id;
    this.ea.publish(new ContactSelected(contact));
    return true;
  }
  
}