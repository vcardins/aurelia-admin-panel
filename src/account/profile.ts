import {AuthService} from '../auth/AuthService';
import {UserProfile} from './userProfile';
import {inject} from 'aurelia-framework';

@inject(AuthService)

export class Profile{
	
	auth:AuthService;
	profile:UserProfile;
	heading:string = 'Profile';
		
	constructor(auth:AuthService){
		this.auth = auth;
		this.profile = new UserProfile();
	};
	activate(){
		return this.auth.getMe()
		.then(data=>{
			this.profile = data;
		});
	}
	
	update(){
		return this.auth.updateMe(this.profile).then(response=>{
			console.log("success logged ", response);
		})
		.catch(err=>{
			console.log("Login failure", err);
		});
	};
	
	link(provider){
		return this.auth.authenticate(provider, true, null)
		/*.then((response)=>{
			console.log("auth response " + response);
			return this.auth.getMe();
		})*/
		.then(()=> this.auth.getMe())
		.then(data=>{
			this.profile = data;
		});;
	}
	unlink(provider){
		return this.auth.unlink(provider)
		/*.then((response)=>{
			console.log("auth response " + response);
			return this.auth.getMe();
		})*/
		.then(()=> this.auth.getMe())
		.then(data=>{
			this.profile = data;
		});;
	}
	email='';
	password='';
	
}
