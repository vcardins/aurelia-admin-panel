import {HttpClient, RequestBuilder} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {IAuthConfig, BaseConfig}  from './baseConfig';
import {Authentication} from './authentication';
import {Storage} from './storage';

@inject(HttpClient,Authentication,Storage, BaseConfig)
export default class  {
	
	private http:HttpClient;
	private auth:Authentication;
	private storage:Storage;
	private config:IAuthConfig;
	
	constructor(http:HttpClient, auth:Authentication, storage:Storage, config:BaseConfig){
		this.http = http;
		this.auth = auth;
		this.storage = storage;
		this.config = config.current;
	}

	configure(){
		RequestBuilder.addHelper('authTokenHandling', ()=>{
			return (client, processor, message)=>{
				if (this.auth.isAuthenticated() && this.config.httpInterceptor) {
					var tokenName = this.config.tokenPrefix 
					? this.config.tokenPrefix + '_' + this.config.tokenName : this.config.tokenName;
					var token = this.storage.get(tokenName);

					if (this.config.authHeader && this.config.authToken) {
						token = this.config.authToken + ' ' + token;
					}

					message.headers.add(this.config.authHeader, token);
				}
			}
		});

		this.http.configure(x => {
			x.authTokenHandling();
		});	
	}
}