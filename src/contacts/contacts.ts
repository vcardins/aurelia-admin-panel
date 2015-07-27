import {Router} from "aurelia-router"

export class Contacts{
  public router: Router;

  configureRouter(config: any, router:Router){    
    config.map([{
      route: 'contacts-viewport',
      viewPorts: {
          left : {
            moduleId: './contacts-list', title:'Contact\'s List' //route: 'contacts-list',  name: 'contacts-list', 
          },
          right: {
            moduleId: './contacts-edit',  title:'Contact Details' //route: 'contacts-edit',  name: 'contacts-edit', 
          }
      }
    }]);        
    this.router = router;
  }
}
