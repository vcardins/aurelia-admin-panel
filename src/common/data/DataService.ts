//import {status, json} from '../common/utils/fetch'
import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {IAuthConfig, BaseConfig} from '../../auth/baseConfig';
import * as common from '../common';

export interface IDataService {
  plainRequest: (route:string, httpRequestType:string, data:Object, headers:Object) => Promise<any>;
  get: (route:string, data:Object, headers:Object) => Promise<any>;
  post: (route:string, data:Object, headers:Object) => Promise<any>;
  patch: (route:string, data:Object, headers:Object) => Promise<any>;
  put: (route:string, data:Object, headers:Object) => Promise<any>;
  destroy: (route:string, data:Object, headers:Object) => Promise<any>;
}

export interface IConfigRequest {
    url: string;
    method: string;
    headers: any;
    params: any;
    data: any;  
}

@autoinject
export class DataService implements IDataService {
 
  private config:IAuthConfig;
  private configRequest:IConfigRequest;
  private _defaultContentType:string = 'application/json';
  private _contentType:string;
  private _jwt:string;
  private _isPlainRequest:boolean = false;
  
  public isLocal:boolean;
  public apiPrefix:string = 'api/';
  public isRequesting:boolean = false;
   
  constructor(public http:HttpClient, private baseConfig:BaseConfig) {    
    this.config = baseConfig.current; 
    this.http = http;   
    // let authInfo = JSON.parse(localStorage.getItem('jwt'));    
    // this._jwt = authInfo ? authInfo.access_token : undefined;
  } 
  
  public authToken() {
    return this._jwt; 
  }
  
  public find(route:string, prop:string, value:any):Promise<any> {
    return this.get(route, 'GET').then(data => {
      return data.filter(item => {        
        return item[prop] == value; 
      })[0];
    });
  }
  
  public get(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    return this.request(route, 'GET', data, headers);
  }
 
  public post(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    return this.request(route, 'POST', data, headers);
  }
  
  public patch(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    return this.request(route, 'PATCH', data, headers);
  }
  
  public put(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    return this.request(route, 'PUT', data, headers);
  }
  
  public destroy(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {    
    return this.request(route, 'DELETE', data, headers);
  }
  
  public plainRequest(route:string, httpRequestType:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    this._isPlainRequest = true;
    //this._contentType = 'application/x-www-form-urlencoded'; 
    return this.request(route, httpRequestType, data, headers); 
  }

  private request(route:string, httpRequestType:string, data:Object = undefined, headers:Object = undefined):Promise<any> {      
      data = data || {};
      let req = this._getConfigRequest(route, httpRequestType, data, headers);    
      let p:Promise<any>;
      switch(httpRequestType) {
        case 'GET' : p = this.http.get(req.url); break;//, data
        case 'POST' : p = this.http.post(req.url, data); break;
        case 'PUT' : p = this.http.put(req.url, data); break;
        case 'PATCH' : p = this.http.patch(req.url, data); break;
        case 'DELETE' : p = this.http.delete(req.url); break;
      }
      //.withHeader('foo', 'bar')
      return p.then(response => {
  			return response.content;
  		});  
  }

  private _getConfigRequest(route:string, httpRequestType:string, data:any, headers:any):IConfigRequest {
            
      var configRequest = {
          url: this.isLocal ? '/db/' + route + '.json' : this._urlCompile(route, data, true),
          method: httpRequestType,
          headers: headers || { 'Content-Type': this._contentType || this._defaultContentType },
          params: {},
          data:{}
      };
       
      if (typeof (data) === 'object' && data.constructor.name === 'FormData') {
          configRequest.headers = { 'Content-Type': undefined };
      }
      if (httpRequestType === 'GET' || httpRequestType === 'DELETE') {
          Object.assign(configRequest.params, configRequest.params, data);
      } else {
          if (configRequest.headers['Content-Type'] === this._defaultContentType) {
              configRequest.data = this._serialize(data, '');
          } else {
              configRequest.data = data;
          }
      }
      
      // if (this.authToken() && !this.isLocal) {
      //   configRequest.headers['Authorization'] = 'Bearer ' + this.authToken();
      // }

      return configRequest;
  }
  
  private _serialize(obj, prefix):string {
    var queryString = [];
    for (var p in obj) {
        var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
        queryString.push(typeof v === 'object' ?
            this._serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
    return queryString.join('&');
  }
  
  private _urlCompile(url, parameters, isReplace):string {
      if (!url) {
          return;
      } else if (Array.isArray(url)) {
          url = url[0];
      }
      for (var name in parameters) {
          if (url.indexOf(':' + name) > -1) {
              var value = parameters[name];
              if (!value) {
                  console.log('Router: No path replacement value for ' + name + '.', url, parameters);
              }
              url = url.replace(':' + name, value);
              if (isReplace) {
                  delete parameters[name];
              }
          }
      }      
      let result = this.config.baseUrl + this.apiPrefix + url; //(this._isPlainRequest ? this.apiUrl.replace('api/','') : this.apiUrl) + url;      
      this._isPlainRequest = false;
      return result;
    }
}
