import authUtils from './authUtils';

export interface IAuthProvider {
  url:string;
  authorizationEndpoint:string;
  redirectUri:string;
  scope:string[];
  scopePrefix:string;
  scopeDelimiter:string;
  requiredUrlParams:string[];
  optionalUrlParams:string[];
  display:string;
  type:string;
  clientId: string;
  popupOptions: any;
  //<number, number, { width: number; height: number }>; 
}

export interface IAuthConfig {
	httpInterceptor: boolean;
	loginOnSignup: boolean;
	baseUrl:string;
	loginRedirect:string;
	logoutRedirect:string;
	signupRedirect: string;
	loginUrl:string;
	signupUrl:string;
	profileUrl:string;
	loginRoute:string;
	signupRoute:string;
	tokenRoot: string;
	tokenName:string;
	tokenPrefix:string;
	unlinkUrl:string;
	unlinkMethod:string;
	authHeader:string;
	authToken:string;
	withCredentials: boolean;
	platform:string;
	storage:string;
	providers: any; //Object<string, IAuthProvider>;
}

export class BaseConfig{
  
  private _current:IAuthConfig;
  
  configure(incomingConfig:any){    
    authUtils.merge(this._current, incomingConfig);
    return this._current;
  };
  
  get current() : IAuthConfig{
    return this._current;
  };
  
  constructor(){
    this._current = {
      httpInterceptor: true,
      loginOnSignup: true,
      baseUrl: '/',
      loginRedirect: '/dashboard',
      logoutRedirect: '/',
      signupRedirect: '/login',
      loginUrl: '/auth/login',
      signupUrl: '/auth/signup',
      profileUrl: '/auth/me',
      loginRoute: '/login',
      signupRoute: '/signup',
      tokenRoot: '',
      tokenName: 'token',
      tokenPrefix: 'aurelia',
      unlinkUrl: '/auth/unlink/',
      unlinkMethod: 'get',
      authHeader: 'Authorization',
      authToken: 'Bearer',
      withCredentials: true,
      platform: 'browser',
      storage: 'localStorage',
      providers: {
        google: {
          name: 'google',
          title:'Google',
          url: '/auth/google',
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          scopeDelimiter: ' ',
          requiredUrlParams: ['scope'],
          optionalUrlParams: ['display'],
          display: 'popup',
          type: '2.0',
          /*clientId: '239531826023-ibk10mb9p7ull54j55a61og5lvnjrff6.apps.googleusercontent.com',*/
          popupOptions: { width: 452, height: 633 }
        },
        facebook: {
          name: 'facebook',
          title:'Facebook',
          url: '/auth/facebook',
          authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
          redirectUri: window.location.origin + '/' || window.location.protocol + '//' + window.location.host + '/',
          scope: ['email'],
          scopeDelimiter: ',',
          nonce: function() {
            return Math.random();
          },
          requiredUrlParams: ['nonce','display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 580, height: 400 }
        },
        linkedin: {
          name: 'linkedin',
          title:'Linkedin',
          url: '/auth/linkedin',
          authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          requiredUrlParams: ['state'],
          scope: ['r_emailaddress'],
          scopeDelimiter: ' ',
          state: 'STATE',
          type: '2.0',
          popupOptions: { width: 527, height: 582 }
        },
        github: {
          name: 'github',
          title:'GitHub',
          url: '/auth/github',
          authorizationEndpoint: 'https://github.com/login/oauth/authorize',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          optionalUrlParams: ['scope'],
          scope: ['user:email'],
          scopeDelimiter: ' ',
          type: '2.0',
          popupOptions: { width: 1020, height: 618 }
        },
        yahoo: {
          name: 'yahoo',
          title:'Yahoo',
          url: '/auth/yahoo',
          authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: [],
          scopeDelimiter: ',',
          type: '2.0',
          popupOptions: { width: 559, height: 519 }
        },
        twitter: {
          name: 'twitter',
          title:'Twitter',
          url: '/auth/twitter',
          authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
          type: '1.0',
          popupOptions: { width: 495, height: 645 }
        },
        live: {
          name: 'live',
          title:'Microsoft Live',
          url: '/auth/live',
          authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['wl.emails'],
          scopeDelimiter: ' ',
          requiredUrlParams: ['display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 500, height: 560 }
        }
      }
    };
  }
}