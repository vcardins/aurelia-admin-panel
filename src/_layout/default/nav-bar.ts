import {bindable} from 'aurelia-framework';
import {autoinject} from 'aurelia-framework';
import {AuthService} from '../../auth/AuthService';

@autoinject
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