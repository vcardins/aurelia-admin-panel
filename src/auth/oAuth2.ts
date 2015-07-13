import {inject} from 'aurelia-framework';
import authUtils from './authUtils';
import {Storage} from './storage';
import {Popup} from './popup';
import {IOAuthConfig, OAuth} from './OAuth';
import {IAuthConfig, BaseConfig}  from './baseConfig';
import {HttpClient} from 'aurelia-http-client';

interface IOAuth2Config  extends IOAuthConfig{
    clientId:string;
    url: string;
    name: string;
    state: any;
    scope: any;
    scopeDelimiter: string;
    scopePrefix: string;
    redirectUri: string;
    popupOptions: any,
    authorizationEndpoint: string;
    responseParams: any;
    requiredUrlParams: any;
    optionalUrlParams: any;
    defaultUrlParams: string[];
    responseType:string;
}

@inject(HttpClient, Storage, Popup, BaseConfig)
export class OAuth2 extends OAuth{
	
    defaults:IOAuth2Config;
    
	constructor(http:HttpClient, storage:Storage, popup:Popup,  config:BaseConfig){
		super(http, storage, popup, config);
        this.defaults = {
            clientId:null,
            url: null,
            name: null,
            state: null,
            scope: null,
            scopePrefix:null,
            scopeDelimiter: null,
            redirectUri: null,
            popupOptions: null,
            authorizationEndpoint: null,
            responseParams: null,
            requiredUrlParams: null,
            optionalUrlParams: null,
            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
            responseType: 'code'
        };
    }

    open(options:any, userData:any) {
        
        //let args:IArguments = (this.defaults, options);
		authUtils.extend(this.defaults, options);        
        let stateName = this.defaults.name + '_state';

        if (authUtils.isFunction(this.defaults.state)) {
            this.storage.set(stateName, this.defaults.state());
        } else if (authUtils.isString(this.defaults.state)) {
            this.storage.set(stateName, this.defaults.state);
        }

        let url = this.defaults.authorizationEndpoint + '?' + this.buildQueryString();

        let openPopup;
            if (this.config.platform === 'mobile') {
              openPopup = this.popup.open(url, this.defaults.name, this.defaults.popupOptions, this.defaults.redirectUri).eventListener(this.defaults.redirectUri);
            } else {
              openPopup = this.popup.open(url, this.defaults.name, this.defaults.popupOptions, this.defaults.redirectUri).pollPopup();
            }

        let self = this;
        return openPopup
            .then((oauthData) => {
                if (self.defaults.responseType === 'token') {
                    return oauthData;
                }
                if (oauthData.state && oauthData.state !== self.storage.get(stateName)) {
                    return Promise.reject('OAuth 2.0 state parameter mismatch.');
                }
                return self.exchangeForToken(oauthData, userData);
            });
    };

    exchangeForToken(oauthData:any, userData:any) {
        let data = authUtils.extend({}, userData, {
            code: oauthData.code,
            clientId: this.defaults.clientId,
            redirectUri: this.defaults.redirectUri
        });

        if (oauthData.state) {
            data.state = oauthData.state;
        }

        authUtils.forEach(this.defaults.responseParams, function(param) {
            data[param] = oauthData[param];
        });

        let exchangeForTokenUrl = this.config.baseUrl ? authUtils.joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
      
            return this.http.createRequest(exchangeForTokenUrl)
                .asPost()
                .withContent(data)
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
      
    buildQueryString() {
        let keyValuePairs = [];
        let urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];
        authUtils.forEach(urlParams, (params) => {

            authUtils.forEach(this.defaults[params], (paramName) => {
                let camelizedName = authUtils.camelCase(paramName);
                let paramValue = authUtils.isFunction(this.defaults[paramName]) ? this.defaults[paramName]() : this.defaults[camelizedName];

                if (paramName === 'state') {
                    let stateName = this.defaults.name + '_state';
                    paramValue = encodeURIComponent(this.storage.get(stateName));
                }

                if (paramName === 'scope' && Array.isArray(paramValue)) {
                    paramValue = paramValue.join(this.defaults.scopeDelimiter);

                    if (this.defaults.scopePrefix) {
                        paramValue = [this.defaults.scopePrefix, paramValue].join(this.defaults.scopeDelimiter);
                    }
                }

                keyValuePairs.push([paramName, paramValue]);
            });
        });

        return keyValuePairs.map(function(pair) {
            return pair.join('=');
        }).join('&');
    };

}
