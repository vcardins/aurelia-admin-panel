import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {AuthService} from './auth/AuthService';
//import {AuthFilterValueConverter} from './auth/authFilter';

@inject(AuthService)
export class NavBar {
  
  _isAuthenticated:boolean=false;  
  private auth:AuthService;
  
  @bindable public router = null;
  
  constructor(auth:AuthService){
  	this.auth = auth;    
  }
  
  get isAuthenticated(){
  	return this.auth.isAuthenticated();
  }
  
}