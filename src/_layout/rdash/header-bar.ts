import {bindable} from 'aurelia-framework';

export class HeaderBar {
  
  parent:any;  
  pageHeading:string;
  
  constructor(){   
    // subscribe to the "bar" property's changes:
  }
  
  bind( bindingContext ) {
      // bindingContext is your parent view-model
      this.parent = bindingContext;
  }
  
}