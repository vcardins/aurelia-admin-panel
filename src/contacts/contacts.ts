import {Router} from "aurelia-router"

export class Contacts{
  public heading:string = 'Contacts';
  
  public router: Router;
  configureRouter(config: any, router:Router){
    config.map([
			{ route: ['', ':id'],  name: 'contact-details', moduleId: './contact-details', nav: false, title:'Contact\'s Details', auth:true, description:'' },	
    ]);
    this.router = router;   
  }
  
   activate():any { 
    
  }

}
