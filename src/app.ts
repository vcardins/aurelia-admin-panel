import {autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthorizeStep} from './auth/AuthorizeStep';
import AppRouterConfig from './app.router.config';
import HttpClientConfig from './auth/app.httpClient.config';
import {AuthService} from './auth/AuthService';
import {EventAggregator} from 'aurelia-event-aggregator';

@autoinject
export class App {
  
  private router: Router;
  private appRouterConfig: AppRouterConfig;
  private httpClientConfig: HttpClientConfig;
  private auth:AuthService;
  private ea:EventAggregator;
  sidebarCls:string;  
  authCls:string;  
  activeRoute:string;  
  
  constructor(router: Router, appRouterConfig: AppRouterConfig, httpClientConfig:HttpClientConfig, 
              auth:AuthService, eventAggregator:EventAggregator){
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.httpClientConfig = httpClientConfig;   ;
    this.auth = auth;       
    this.ea = eventAggregator;
  }

  activate(){    
    this.httpClientConfig.configure();
    this.appRouterConfig.configure();
    
    this.sidebarCls =  this.isAuthenticated ? 'open' : ''; 
    this.authCls = this.isAuthenticated ? 'auth' : 'anon'; 
    
    this.ea.subscribe('router:navigation:complete', (payload) => { 
      let cfg = payload.instruction.config; 
      this.activeRoute = cfg;      
    })
  }
  
  get isAuthenticated():boolean{
  	return this.auth.isAuthenticated();
  } 
  
}