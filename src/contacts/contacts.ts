import {Router} from "aurelia-router"

export class Contacts{
  public heading:string = 'Contacts';
  
  public router: Router;
  configureRouter(config: any, router:Router){
    config.map([
      { route: ['','contacts/:id'], name: 'contact-details', moduleId: './contact-details', nav: false, title:'Contact\'s Details', auth:true, description:'' }
      //{ route: ['','dashboard'], name: 'dashboard',    moduleId: '../dashboard/dashboard', nav: false, title:'Dashboard' },      
    ]);
    this.router = router;   
  }
  
  // public router: Router;

  // configureRouter(config: any, router:Router){    
  //   config.map([{
  //     route: 'contacts-viewport',
  //     viewPorts: {
  //         left : {
  //           moduleId: './contacts-list', title:'Contact\'s List' //route: 'contacts-list',  name: 'contacts-list', 
  //         },
  //         right: {
  //           moduleId: './contacts-edit',  title:'Contact Details' //route: 'contacts-edit',  name: 'contacts-edit', 
  //         }
  //     }
  //   }]);        
  //   this.router = router;
  // }
}
