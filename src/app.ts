import {autoinject, inject, ObserverLocator} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthorizeStep} from './auth/AuthorizeStep';
import AppRouterConfig from './app.router.config';
import HttpClientConfig from './auth/app.httpClient.config';
import {AuthService} from './auth/AuthService';
import * as toastr from 'toastr';

@autoinject
export class App {    
  //static inject = [Router, AppRouterConfig, HttpClientConfig, AuthService, EventAggregator,ObserverLocator];  
  public sidebarCls:string;  
  authCls:string;  
  activeRoute:string;  
  obsLoc:any;
  constructor(
        public router: Router,
        private appRouterConfig: AppRouterConfig,
        private httpClientConfig: HttpClientConfig,
        private auth: AuthService,
        private ea: EventAggregator,
        public observerLocator: ObserverLocator
    ) {   
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.httpClientConfig = httpClientConfig;   ;
    this.auth = auth;       
    this.ea = ea;
    this.obsLoc = observerLocator;
    
    this.sidebarCls =  this.isAuthenticated ? 'open' : ''; 
    this.authCls = this.isAuthenticated ? 'auth' : 'anon';     
    toastr.options = {
      closeButton: true,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut"
    };
  }

  activate(){        
    this.httpClientConfig.configure();
    this.appRouterConfig.configure();
    
    this.ea.subscribe('router:navigation:complete', (payload) => { 
      let cfg = payload.instruction.config; 
      this.activeRoute = cfg;      
    })    
    this.obsLoc = this.observerLocator.getObserver(this, 'sidebarCls');
    this.obsLoc.subscribe(this.observeSidebarState);             
  }
  
  observeSidebarState() {
    console.log(arguments);
  }
  
  public attached() {
    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.onWindowResize, false);
    this.onWindowResize();
  }
  
  public dettached() {    
    this.obsLoc.unsubscribe();
    window.removeEventListener('resize', this.onWindowResize, false);
  }
  
  onWindowResize() {
    this.sidebarCls = (window.innerWidth <= 600) ? '' : 'open'; //&& this.sidebarCls == 'open'
  }
  
  get isAuthenticated():boolean{
  	return this.auth.isAuthenticated();
  } 
  
}