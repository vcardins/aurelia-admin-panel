import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {AuthorizeStep} from './auth/AuthorizeStep';

//@autoinject
export default class {
	static inject = [Router];

	constructor(public router: Router){
		this.router = router;
	}
	
	configure(){		
		
		let self = this;
		let appRouterConfig:any = function(config:RouterConfiguration){
			config.title = 'Aurelia';
			config.options.pushState = true; // <-- this is all you need here
			config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
			config.map([
				{ route: ['','home'], 	   name: 'home',    	 moduleId: './home/home',       		  nav: false, title:'Home' },
				{ route: 'dashboard', 	   name: 'dashboard',    moduleId: './dashboard/dashboard',       nav: true, title:'Dashboard', auth:true, description:'Welcome to the Aurelia Navigation App' },
				{ route: 'flickr',         name: 'flickr',       moduleId: './flickr/flickr',             nav: true, title:'Flickr', auth:true, description:'' },
				{ route: 'maps',           name: 'maps',         moduleId: './maps/maps',                 nav: true, title:'Maps', auth:true, description:'Google Maps' },
				{ route: 'child-router',   name: 'child-router', moduleId: './child-router/child-router', nav: true, title:'Child Router', auth:true, description:'' },
				{ route: 'links',   	   name: 'links', 		 moduleId: './links/links', 			  nav: true, title:'Links', auth:true, description:'' },
				{ route: 'contacts',  	   name: 'contacts', 	 moduleId: './contacts/contacts', 	      nav: true, title:'Contacts', auth:true, description:'' },
				{ route: 'signup',         name: 'signup', 		 moduleId: './account/signup',       	  nav: false, title:'Signup', description:'' },
				{ route: 'login',          name: 'login', 		 moduleId: './account/login',       	  nav: false, title:'Login', description:'' },
				{ route: 'logout',         name: 'logout', 		 moduleId: './account/logout',       	  nav: false, title:'Logout', description:'' },
				{ route: 'profile',        name: 'profile', 	 moduleId: './account/profile',           nav: false, title:'Profile', description:'' }
    		]);
			config.mapUnknownRoutes(instruction => {
			   self.router.navigate('/login');
		    })
		 };		
		this.router.configure(appRouterConfig);			
	}	
}