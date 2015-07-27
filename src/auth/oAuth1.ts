import {inject} from 'aurelia-framework';
import authUtils from './authUtils';
import {Storage} from './storage';
import {Popup} from './popup';
import {IOAuthConfig, OAuth} from './OAuth';
import {IAuthConfig, BaseConfig} from './baseConfig';
import {HttpClient} from 'aurelia-http-client';

interface IOAuth1Config extends IOAuthConfig{
  
}

//@inject(HttpClient, Storage, Popup, BaseConfig)
export class OAuth1 extends OAuth{

	static inject = [HttpClient, Storage, Popup, BaseConfig];
	
	defaults:IOAuth1Config;    
	
	constructor(public http:HttpClient, public storage:Storage, public popup:Popup, cfg:BaseConfig){
		super(http, storage, popup, cfg);	
		this.defaults = this.getDefaults();	
	}

	open(options:any, userData:any):Promise<void> {
		
		//this.defaults = Object.assign(this.defaults, options);
		this.defaults = authUtils.extend({}, this.defaults, options);
				
		let serverUrl:string = this.config.baseUrl 
			? authUtils.joinUrl(this.config.baseUrl, this.defaults.url) 
			: this.defaults.url;
		
		if (this.config.platform !== 'mobile') {
			this.popup = this.popup.open('', this.defaults.name,
				this.defaults.popupOptions, this.defaults.redirectUri);
		}
		let self = this;
		return this.http.post(serverUrl,{}).then(response => {
			if (self.config.platform === 'mobile') {
				self.popup = 
					self.popup.open(
						[self.defaults.authorizationEndpoint, 
						self.buildQueryString(response.content)].join('?'), 
						self.defaults.name, 
						self.defaults.popupOptions, 
						self.defaults.redirectUri);
			} 

			else {
				self.popup.popupWindow.location.href = 
					[self.defaults.authorizationEndpoint, self.buildQueryString(response.content)]
					.join('?');	
			}

			var popupListener 
				= self.config.platform === 'mobile' 
				? self.popup.eventListener(self.defaults.redirectUri) 
				: self.popup.pollPopup();
			
			
			return  popupListener.then((response)=> {
				return self.exchangeForToken(response, userData);
			});
		});
	};

	exchangeForToken(oauthData:any, userData:any):void {
		//let args:IArguments = ({}, userData, oauthData);
		let data = authUtils.extend({}, userData, oauthData);
		let exchangeForTokenUrl 
			= this.config.baseUrl ? authUtils.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
			return this.http.post(exchangeForTokenUrl, data)
				.withCredentials(this.config.withCredentials)
				.send()
				.then(response => {
					return response;
				})
				.catch(err => {
					console.log("error :" + err.content.message);
					throw err;
				});
	
	};

	buildQueryString (obj?:any) {
		let str = [];
	
		authUtils.forEach(obj, function(value, key) {
			str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		});
	
		return str.join('&');
	};

}