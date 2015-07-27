import {autoinject} from 'aurelia-framework';
import {IAuthConfig, BaseConfig}  from './baseConfig';
import {Storage} from './storage';
import authUtils from './authUtils';

//@autoinject
export class Authentication{
  
  static inject = [Storage, BaseConfig];

  tokenName:string;
  config:IAuthConfig;
  
  constructor(public storage:Storage, public cfg:BaseConfig){
    this.storage = storage;
    this.config = cfg.current;
    this.tokenName = this.config.tokenPrefix ? `${this.config.tokenPrefix}_${this.config.tokenName}` : this.config.tokenName;                        
  }

  getLoginUrl():string {
    return  this.config.baseUrl ? authUtils.joinUrl(this.config.baseUrl, this.config.loginUrl) : this.config.loginUrl;
  };
  
  getSignupUrl():string {
    return  this.config.baseUrl ? authUtils.joinUrl(this.config.baseUrl, this.config.signupUrl) : this.config.signupUrl;
  };
  
  getProfileUrl():string {
    return  this.config.baseUrl ? authUtils.joinUrl(this.config.baseUrl, this.config.profileUrl) : this.config.profileUrl;
  };
  
  getToken():string {
    return this.storage.get(this.tokenName);
  };
  
  getPayload() {
    var token = this.storage.get(this.tokenName);
  
    if (token && token.split('.').length === 3) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(decodeURIComponent(encodeURI(window.atob(base64))));
    }
  };

  setToken(response:any, redirect:any = undefined) {
  
    var tokenName = this.tokenName;
    var accessToken = response && response.access_token;
    var token;
  
    if (accessToken) {
      if (authUtils.isObject(accessToken) && authUtils.isObject(accessToken.data)) {
        response = accessToken;
      } else if (authUtils.isString(accessToken)) {
        token = accessToken;
      }
    }
  
    if (!token && response) {
      token = this.config.tokenRoot && response.content[this.config.tokenRoot] 
              ? response.content[this.config.tokenRoot][this.config.tokenName] 
              : response.content[this.config.tokenName];
    }
  
    if (!token) {
      var tokenPath = this.config.tokenRoot 
      ? this.config.tokenRoot + '.' + this.config.tokenName 
      : this.config.tokenName;
      
      throw new Error('Expecting a token named "' + tokenPath + '" but instead got: ' + JSON.stringify(response.content));
    }
  
    
    this.storage.set(tokenName, token);
  
    if (this.config.loginRedirect && !redirect) {
      window.location.href = this.config.loginRedirect;
    } else if (redirect && authUtils.isString(redirect)) {
      window.location.href = encodeURI(redirect);
    }
  };

  removeToken():void{
    this.storage.remove(this.tokenName);
  }
  
  isAuthenticated():boolean {
    var token = this.storage.get(this.tokenName);  
    if (!token) { return false; }    
    if (token.split('.').length !== 3) { return true; }
    
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var exp = JSON.parse(window.atob(base64)).exp;
    if (exp) {
      return Math.round(new Date().getTime() / 1000) <= exp;
    }
    return true;   
     
  };

  logout(redirect:string) {
    var tokenName = this.tokenName;
    return new Promise((resolve,reject)=>{
      this.storage.remove(tokenName);
      //var this.config = this.this.config;
      if (this.config.logoutRedirect && !redirect) {
        window.location.href = this.config.logoutRedirect;
      }
      else if (authUtils.isString(redirect)) {
        //window.location.href =redirect;
        //this.router.navigate(redirect);
        window.location.href = redirect;    
      }
      resolve();
    });    
  };
}