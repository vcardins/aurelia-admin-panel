import {autoinject} from 'aurelia-framework';
import authUtils from './authUtils';
import {Storage} from './storage';
import {Popup} from './popup';
import {IOAuthConfig, OAuth} from './OAuth';
import {IAuthConfig, BaseConfig}  from './baseConfig';
import {HttpClient} from 'aurelia-http-client';

interface IOAuth2Config extends IOAuthConfig{
    scope: any;
    scopeDelimiter: string;
    scopePrefix: string;            
    responseParams: any;
    requiredUrlParams: any;
    optionalUrlParams: any;
    defaultUrlParams: string[];
    responseType:string;
}
//@autoinject
export class OAuth2 extends OAuth{
	
    static inject = [HttpClient, Storage, Popup, BaseConfig];
    
    private defaults:IOAuth2Config;
    
	constructor(public http:HttpClient, public storage:Storage, public popup:Popup, private cfg:BaseConfig){
		super(http, storage, popup, cfg);               
        this.defaults = this.getDefaults(2);
    }

    open(options:any, userData:any):Promise<void> {
        
        //let args:IArguments = (this.defaults, options);
        //this.defaults = Object.assign(this.defaults, options);
        this.defaults = authUtils.extend({}, this.defaults, options);
        		        
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

    exchangeForToken(oauthData:any, userData:any):void {
        
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
      
    buildQueryString():string {
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
