import {inject} from 'aurelia-framework';
import {AuthService} from '../auth/AuthService';

@inject(AuthService)
export class Login{

	heading:string = 'Login';	
	email:string='';
	password:string='';
	auth:AuthService;
		
	constructor(auth:AuthService){
		this.auth = auth;
	};

	login():void{
		return this.auth.login(this.email, this.password).then(response=>{
					console.log("success logged " + response);
				})
				.catch(err=>{
					console.log("Login failure", err.response);
				});
	};
	
	authenticate(name:string):void {
		return this.auth.authenticate(name, false, null).then((response)=>{
					console.log("auth response " + response);
				});
	}
}
