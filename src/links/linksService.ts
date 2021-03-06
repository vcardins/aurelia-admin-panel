
import {DataService} from '../common/data/DataService'
import {HttpClient} from 'aurelia-http-client';
import {BaseConfig} from '../auth/baseConfig';
import {autoinject} from 'aurelia-framework';
import {Aurelia} from 'aurelia-framework';

export class LinkModel {
  id:number;
  title:string;
  url:string;
  source:string;
  category:string;
}

export interface ILinkService {
  all: () => Promise<any>;
  getById: (id:number) => Promise<any>;
  save: (model:LinkModel) => Promise<boolean>;  
}
// implements ILinkService

@autoinject
export class LinkService extends DataService  {  

  url:string = 'links';
  constructor(httpClient:HttpClient, baseConfig:BaseConfig) {        
    super(httpClient, baseConfig);         
    //, aurelia:Aurelia
    //var cfg = aurelia.container.get(BaseConfig);	
    this.isLocal = true;
  }

  public all() {
    return this.get(this.url);
  }
  
  public getById(id:number) {
    return this.get(this.url+'/'+id);
  }
  
  public save(model:LinkModel) {
    return this.put(this.url+'/'+model.id, model); 
  }      
  
}
