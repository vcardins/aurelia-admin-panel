import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthorizeStep} from './auth/AuthorizeStep';
import AppRouterConfig from './app.router.config';
import HttpClientConfig from './auth/app.httpClient.config';

@inject(Router, AppRouterConfig, HttpClientConfig)
export class App {
  private router: Router;
  private appRouterConfig: AppRouterConfig;
  private httpClientConfig: HttpClientConfig;
    
  constructor(router: Router, appRouterConfig: AppRouterConfig, httpClientConfig:HttpClientConfig){
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.httpClientConfig = httpClientConfig;   
  }

  activate(){    
    this.httpClientConfig.configure();
    this.appRouterConfig.configure();
  }
  
}