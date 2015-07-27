import {autoinject} from 'aurelia-framework';
import {Authentication} from './authentication';
import {Redirect} from 'aurelia-router';
import {Router} from 'aurelia-router';

//@autoinject
export class AuthorizeStep {
  
  static inject = [Authentication];

  constructor(private auth:Authentication){    
    this.auth = auth;
  }
  
  run(routingContext, next) {
    if (routingContext.nextInstructions.some(i => i.config.auth)) {
      let isLoggedIn =  this.auth.isAuthenticated(); 
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }
    return next();
  }
  
}