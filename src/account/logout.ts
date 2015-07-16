import {AuthService} from '../auth/AuthService';
import {inject} from 'aurelia-framework';

@inject(AuthService)

export class Logout{
	
	auth:AuthService;
	
	constructor(auth:AuthService){
		this.auth = auth;
	};
	
	 activate(){
		this.auth.logout("/login").then(response=>{
			console.log("ok logged out on  logout.js");
		})
		.catch(err=>{
			console.log("error logged out  logout.js");

		});
	}
}
