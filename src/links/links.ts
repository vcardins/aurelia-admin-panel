//https://github.com/charlespockert/aurelia-bs-grid
import {bindable} from 'aurelia-framework';
import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {LinkModel, LinkService} from './linksService';
import {Sorter} from '../common/sorter';

//@autoinject
export class Links{
	
  static inject = [LinkService];

  private sorter:Sorter;
  links:Array<LinkModel>;
  count:number;
  filteredModels:Array<LinkModel>;
 
  constructor(public service:LinkService){
    this.service = service;
	  this.sorter = new Sorter();
  }

  activate(){
  	return this.service.all().then((response) => {   
  		this.links = this.filteredModels = response;	
      this.count = this.links.length;
  	});
  }
  
  sort(prop) {
    this.sorter.sort(this.filteredModels, prop);
  }
  
  loadData(gridArgs) {
    return new Promise((resolve, reject) => resolve({
        data: this.links,
        count: this.count
      }));
  }  
  
}