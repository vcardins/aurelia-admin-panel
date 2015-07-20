import {Router} from "aurelia-router"

export class Contacts{
  public router: Router;

  configureRouter(config: any, router:Router){    
    config.map([{
      route: 'contacts-viewport',
      viewPorts: {
          left: {
            route: 'contacts-list',  name: 'contacts-list', moduleId: './contacts-list', title:'Contact\'s List'
          },
          right: {
            route: 'contacts-edit',  name: 'contacts-edit', moduleId: './contacts-edit',  title:'Contact Details'
          }
      }
    }]);        
    this.router = router;
  }
}
