import {inject} from 'aurelia-framework';
import {AuthService} from '../auth/AuthService';

@inject(AuthService)
export class Signup{

	heading:string = 'Sign Up';
	email:string='';
	password:string='';
	displayName:string='';
	auth:AuthService;
		
	constructor(auth:AuthService){
		this.auth = auth;
	}

	signup(){
		return this.auth.signup(this.displayName, this.email, this.password)
		.then((response)=>{
			console.log("signed up");
		});
		
	}
}
