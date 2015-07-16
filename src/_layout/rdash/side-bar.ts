import {bindable, autoinject} from 'aurelia-framework';

@autoinject
export class SideBar {
  
  heading:string;    
  parent:any;
  
  @bindable public router = null;
  
  constructor(){  	
    this.heading = 'Aurelia';    
  }
    
  bind( bindingContext ) {
      // bindingContext is your parent view-model
      this.parent = bindingContext;
  }
  
  toggleSidebar() {
    this.parent.sidebarCls = this.parent.sidebarCls == 'open' ? '' : 'open';
  }
}