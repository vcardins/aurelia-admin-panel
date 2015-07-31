import {HttpClient, RequestBuilder} from 'aurelia-http-client';
import {autoinject} from 'aurelia-framework';
import {IAuthConfig, BaseConfig}  from './baseConfig';
import {Authentication} from './authentication';
import {Storage} from './storage';

@autoinject
export default class  {
	
	public config:IAuthConfig;
	
	constructor(private http:HttpClient, private auth:Authentication, private storage:Storage, private cfg:BaseConfig){
		this.http = http;
		this.auth = auth;
		this.storage = storage;
		this.config = cfg.current;
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