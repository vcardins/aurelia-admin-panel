import {inject} from 'aurelia-framework';
import authUtils from './authUtils';
import {Storage} from './storage';
import {Popup} from './popup';
import {IOAuthConfig, OAuth} from './OAuth';
import {IAuthConfig, BaseConfig} from './baseConfig';
import {HttpClient} from 'aurelia-http-client';

interface IOAuth1Config extends IOAuthConfig{
  
}

@inject(HttpClient, Storage, Popup, BaseConfig )
export class OAuth1 extends OAuth{
	
	defaults:IOAuth1Config;    
	
	constructor(http:HttpClient, storage:Storage, popup:Popup, config:BaseConfig){
		super(http, storage, popup, config);
		this.defaults = {
			clientId:null,
			url: null,
			name: null,
			popupOptions: null,
			redirectUri: null,
			authorizationEndpoint: null
		};
	}

	open(options:any, userData:any) {
		
		//let args:IArguments = (this.defaults, options);
		authUtils.extend(this.defaults, options);
				
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

	exchangeForToken(oauthData:any, userData:any) {
		//let args:IArguments = ({}, userData, oauthData);
		let data = authUtils.extend({}, userData, oauthData);
		let exchangeForTokenUrl 
			= this.config.baseUrl ? authUtils.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
			return this.http.createRequest(exchangeForTokenUrl)
			.asPost()
			.withCredentials(this.config.withCredentials)
			.withContent(data)
			.send()
			.then(response => {
				return response;
			})
			.catch(err => {
				console.log("error :" + err.content.message);
				throw err;
			});
	
	};

	buildQueryString (obj) {
		let str = [];
	
		authUtils.forEach(obj, function(value, key) {
			str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		});
	
		return str.join('&');
	};

}