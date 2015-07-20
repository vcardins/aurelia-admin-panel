import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Authentication} from './authentication';
import {IAuthConfig, BaseConfig} from './baseConfig';
import {OAuth} from './oAuth';
import {OAuth1} from './oAuth1';
import {OAuth2} from './oAuth2';
import authUtils from './authUtils';
import {status, json} from './fetch'

@autoinject//(HttpClient, Authentication, OAuth1, OAuth2, BaseConfig)
export class AuthService  {
	
	private config:IAuthConfig;
	private http:HttpClient;
	private auth:Authentication;
	private oAuth1:OAuth1;
	private oAuth2:OAuth2;
	
	constructor(http:HttpClient, auth:Authentication, oAuth1:OAuth1, oAuth2:OAuth2, config:BaseConfig){
		this.http = http;
		this.auth = auth;
		this.oAuth1 = oAuth1;
		this.oAuth2 = oAuth2;
		this.config = config.current;
	};
  
	getMe(){
		let profileUrl = this.auth.getProfileUrl();
		return this.http.get(profileUrl).then(response => {
			return response.content;
		}).catch(err => {
			throw JSON.parse(err.response);
		});
	};

	updateMe(content:any){
		let profileUrl = this.auth.getProfileUrl();
		return this.http.put(profileUrl, content).then(response => {
			return response;
		}).catch(err => {
			throw JSON.parse(err.response);
		});
	};

	isAuthenticated(){
		return this.auth.isAuthenticated();
	};

	signup(displayName, email, password){
		let signupUrl = this.auth.getSignupUrl();		
		let content;
		if (typeof arguments[0] === 'object') {
			content = arguments[0];
		} else {
			content = {'displayName': displayName,'email': email, 'password':password}
		}		
		return this.http.post(signupUrl, content).then(response => {
				if (this.config.loginOnSignup) {
					this.auth.setToken(response);
				} else if (this.config.signupRedirect) {
					window.location.href = this.config.signupRedirect;
				}
				return response;
			}).catch(err => {
				throw JSON.parse(err.response);
			});
	};

	login(email:string, password:string){

		let loginUrl = this.auth.getLoginUrl();
		return this.http.post(loginUrl, {'email': email, 'password':password}).then(response => {
			this.auth.setToken(response);
			return response;
		})
		.catch(err => {
			throw JSON.parse(err.response);
		});

	};

	logout(redirectUri:string){
		return new Promise((resolve, reject)=>{
			this.auth.logout(redirectUri).then(response=>{

			}).catch(err => {
				throw JSON.parse(err.response);
			});
		});
	};

	authenticate(name:string, redirect:any, userData:any) {
		let provider:OAuth; 		
		provider = (this.config.providers[name].type === '1.0') ? this.oAuth1 : this.oAuth2;
		
		return provider.open(this.config.providers[name], userData || {}).then((response) => {
			this.auth.setToken(response, redirect);
			return response;
		})
		.catch((error)=> {
			console.log("auth problem");
			throw error;
		});
	};
	
	unlink(provider:string) {
		let unlinkUrl =  this.config.baseUrl ? 
						 authUtils.joinUrl(this.config.baseUrl, this.config.unlinkUrl) : 
						 this.config.unlinkUrl;

		if (this.config.unlinkMethod === 'get') {
			return this.http.get(unlinkUrl + provider).then(response => {
                    return response;
                });
		}
		else if (this.config.unlinkMethod === 'post') {
			//TODO 
			return this.http.post(unlinkUrl, provider).then(response => {
	                    return response;
	                }).catch(err => {
						throw JSON.parse(err.response);
					});
		}
	};
}
