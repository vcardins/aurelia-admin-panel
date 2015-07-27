
import {HttpClient} from 'aurelia-http-client';
import {autoinject} from 'aurelia-framework';
import {DataService} from '../common/data/DataService'
import {BaseConfig} from '../auth/baseConfig';
import {Contact} from './contact';

//@autoinject
export class ContactService extends DataService  {  
  
  static inject = [HttpClient, BaseConfig];
  
  url:string = 'Contacts';
  constructor(httpClient:HttpClient, baseConfig:BaseConfig) {        
    super(httpClient, baseConfig);         
    this.isLocal = true;
  }

  public all() {
    return this.get(this.url);
  }
  
  public getById(id:string) {
    return this.find(this.url, 'id', id);
  }
  
  public save(model:Contact) {
    return this.put(this.url+'/'+model.id, model); 
  }      
  
}
