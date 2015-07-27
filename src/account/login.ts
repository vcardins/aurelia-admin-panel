import {inject} from 'aurelia-framework';
import {AuthService} from '../auth/AuthService';
import {IAuthConfig, BaseConfig} from '../auth/baseConfig';
import * as toastr from 'toastr';

@inject(AuthService, BaseConfig)
export class Login{

	heading:string = 'Login';	
	email:string='';
	password:string='';
	public providers:Array<any> = [];
  	public signupUrl:string;
  
	constructor(private auth:AuthService, private config:BaseConfig){
		this.auth = auth;
		if (config.current) {
			this.signupUrl = config.current.signupUrl;
			for (let key in config.current.providers) {
				let p = config.current.providers[key];
				this.providers.push({name:p.name, title:p.title});				
			}	      
	    }
	};

	login():void{
		return this.auth.login(this.email, this.password).then(response=>{
					console.log("Success logged ", response);
				})
				.catch(err=>{
					toastr.error(err.message, 'Login Failed');	
				});
	};
	
	public authenticate(name:string):Promise<void> {
		return this.auth.authenticate(name, false, null).then((response)=>{
					console.log("auth response " + response);
				});
	}
}
