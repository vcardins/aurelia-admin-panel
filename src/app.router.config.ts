import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {AuthorizeStep} from './auth/AuthorizeStep';

@autoinject
export default class {
	
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
				{ route: 'dashboard', 	   name: 'dashboard',    moduleId: './dashboard/dashboard',       nav: true, title:'Dashboard', auth:true, icon:'dashboard', description:'Welcome to the Aurelia Navigation App' },
				{ route: 'flickr',         name: 'flickr',       moduleId: './flickr/flickr',             nav: true, title:'Flickr', auth:true, icon:'photo', description:'' },
				{ route: 'maps',           name: 'maps',         moduleId: './maps/maps',                 nav: true, title:'Maps', auth:true, icon:'map-o', description:'Google Maps' },
				{ route: 'child-router',   name: 'child-router', moduleId: './child-router/child-router', nav: true, title:'Child Router', auth:true, icon:'cubes', description:'' },
				{ route: 'links',   	   name: 'links', 		 moduleId: './links/links', 			  nav: true, title:'Links', auth:true, icon:'chain', description:'' },
				{ route: 'contacts',  	   name: 'contacts', 	 moduleId: './contacts/contacts', 	      nav: true, title:'Contacts', auth:true, icon:'users', description:'' },
				{ route: 'converters',     name: 'converters', 	 moduleId: './converters/converters', 	  nav: true, title:'Converters', auth:true, icon:'users', description:'' },
				{ route: 'users',          name: 'users',        moduleId: './users/users',        		  nav: true, title:'Github Users', auth:true, icon:'users', description:''  },				
				{ route: 'signup',         name: 'signup', 		 moduleId: './account/signup',       	  nav: false, title:'Signup', icon:'', description:'pencil-square' },
				{ route: 'login',          name: 'login', 		 moduleId: './account/login',       	  nav: false, title:'Login', icon:'', description:'' },
				{ route: 'logout',         name: 'logout', 		 moduleId: './account/logout',       	  nav: false, title:'Logout', icon:'', description:'' },
				{ route: 'profile',        name: 'profile', 	 moduleId: './account/profile',           nav: true, title:'Profile', icon:'user', description:'' }
    		]);
			config.mapUnknownRoutes(instruction => {
			   self.router.navigate('/login');
		    })
		 };		
		this.router.configure(appRouterConfig);			
	}	
}