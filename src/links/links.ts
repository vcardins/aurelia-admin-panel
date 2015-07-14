import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {LinkModel, ILinkService, LinkService} from './linksService';

@inject(LinkService)
export class Links{
	
  private service: ILinkService;
  links:Array<LinkModel>;
  filteredModels:Array<LinkModel>;
  public heading = 'Links';
 
  constructor(service:LinkService){
    this.service = service;
	//this.sorter = new Sorter();
  }

  activate(){    
  	return this.service.all().then((response) => {      
  		this.links = this.filteredModels = response;	
  	});
  }
  
  // sort(prop) {
    // this.sorter.sort(this.filteredModels, prop);
  // }
}