import {autoinject} from 'aurelia-framework';
import authUtils from './authUtils';
import {Storage} from './storage';
import {Popup} from './popup';
import {IAuthConfig, BaseConfig} from './baseConfig';
import {HttpClient} from 'aurelia-http-client';

export interface IOAuthConfig {
    clientId:string;
    url: string;
    name: string;
    redirectUri: string;
    popupOptions: any,
    authorizationEndpoint: string;
    state: any;
	// scope: string;
    // scopePrefix: string;
    // scopeDelimiter: string;
    // responseParams: string[];
    // requiredUrlParams: string[];
    // optionalUrlParams: string[];
    // defaultUrlParams: string[];
    // responseType: string[];
}

export interface IOAuth {
    open: (options:any, userData:any) => Promise<void>;
    exchangeForToken: (oauthData:any, userData:any) => void;
    buildQueryString: (obj?:any) => string;
}

@autoinject
export class OAuth implements IOAuth{
	
	public http:HttpClient;
	public popup:Popup;
	public storage:Storage;
	public config:IAuthConfig;
	
	constructor(http:HttpClient, storage:Storage, popup:Popup,  config:BaseConfig){
		this.storage = storage;
		this.config = config.current;
		this.popup = popup;
		this.http = http;		               
	}
    
    getDefaults(type:number = 1) {
         let defaults = {
			clientId:null,
			url: null,
			name: null,
			popupOptions: null,
			redirectUri: null,
			authorizationEndpoint: null,
			state:null			
		};
        if (type == 1) {
            return defaults;
        } else {
            return Object.assign(defaults, 
                {                
                    scope: null,
                    scopePrefix:null,
                    scopeDelimiter: null,
                    responseParams: null,
                    requiredUrlParams: null,
                    optionalUrlParams: null,
                    defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
                    responseType: 'code'
                }
            )
        }
    }
		
    serialize(obj, prefix):string {
        let queryString = [];
        for (let p in obj) {
            let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
            queryString.push(typeof v === 'object' ?
                this.serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
        return queryString.join('&');
    }
	
    open(options:any, userData:any):Promise<void> {
        throw new Error('This method is abstract');
    }
    
    exchangeForToken (oauthData:any, userData:any):void {
        throw new Error('This method is abstract');
    }
    
    buildQueryString(obj?:any):string {
        throw new Error('This method is abstract');
    }
    
}