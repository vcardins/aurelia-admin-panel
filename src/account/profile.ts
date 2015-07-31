import {AuthService} from '../auth/AuthService';
import {UserProfile} from './userProfile';
import {autoinject} from 'aurelia-framework';
import * as toastr from 'toastr';

@autoinject
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
			toastr.success('Profile successfully updated');
		})
		.catch(err=>{
			toastr.error(err.message);
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
