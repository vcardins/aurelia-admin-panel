import {inject} from 'aurelia-framework';
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
}

@inject(HttpClient, Storage, Popup, BaseConfig)
export class OAuth {
	
	public http:HttpClient;
	public popup:Popup;
	public storage:Storage;
	public config:IAuthConfig;
	public defaults:IOAuthConfig;
	
	constructor(http:HttpClient, storage:Storage, popup:Popup,  config:BaseConfig){
		this.storage = storage;
		this.config = config.current;
		this.popup = popup;
		this.http = http;		
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
	
}