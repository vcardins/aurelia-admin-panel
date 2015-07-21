import {inject} from 'aurelia-framework';
import {Authentication} from './authentication';
import {Redirect} from 'aurelia-router';
import {Router} from 'aurelia-router';

@inject(Authentication)
export class AuthorizeStep {
  
  private auth:Authentication;
  
  constructor(auth:Authentication){    
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