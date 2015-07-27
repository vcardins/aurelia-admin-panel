
import {Contact} from './contact';

export class ContactSelected {
  static inject = [Contact];
  constructor(private contact:Contact){
    this.contact = contact;
  }
}

export class ContactUpdated {
  static inject = [Contact];  
  constructor(private contact:Contact){
    this.contact = contact;
  }
}

export class ContactViewed {
  static inject = [Contact];
  constructor(private contact:Contact){
    this.contact = contact;
  }
}
