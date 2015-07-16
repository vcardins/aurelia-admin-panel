import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {LinkModel, LinkService} from './linksService';
import {Sorter} from '../common/sorter';

@autoinject
export class Links{
	
  private service: LinkService;
  private sorter:Sorter;
  links:Array<LinkModel>;
  filteredModels:Array<LinkModel>;
 
  constructor(service:LinkService){
    this.service = service;
	  this.sorter = new Sorter();
  }

  activate(){    
  	return this.service.all().then((response) => {      
  		this.links = this.filteredModels = response;	
  	});
  }
  
  sort(prop) {
    this.sorter.sort(this.filteredModels, prop);
  }
}