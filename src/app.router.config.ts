import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {AuthorizeStep} from './auth/AuthorizeStep';

@inject(Router)
export default class {

	private router: Router;

	constructor(router: Router){
		this.router = router;
	}
	
	configure(){
		let appRouterConfig:any = function(config:RouterConfiguration){
			config.title = 'Aurelia';
			config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
			config.map([
				{ route: ['','home'], 	   name: 'home',    	 moduleId: './home/home',       		  nav: false, title:'Home' },
				{ route: 'dashboard', 	   name: 'dashboard',    moduleId: './dashboard/dashboard',       nav: true, title:'Dashboard', auth:true },
				{ route: 'flickr',         name: 'flickr',       moduleId: './flickr/flickr',             nav: true, title:'Flickr', auth:true },
				{ route: 'child-router',   name: 'child-router', moduleId: './child-router/child-router', nav: true, title:'Child Router', auth:true },
				{ route: 'links',   	   name: 'links', 		 moduleId: './links/links', 			  nav: true, title:'Links', auth:true },
				{ route: 'signup',         name: 'signup', 		 moduleId: './account/signup',       	  nav: false, title:'Signup' },
				{ route: 'login',          name: 'login', 		 moduleId: './account/login',       	  nav: false, title:'Login' },
				{ route: 'logout',         name: 'logout', 		 moduleId: './account/logout',       	  nav: false, title:'Logout' },
				{ route: 'profile',        name: 'profile', 	 moduleId: './account/profile',           nav: false, title:'Profile' }
    		]);
		 };		
		this.router.configure(appRouterConfig);	
	}	
}