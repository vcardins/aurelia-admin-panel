import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users{
  heading:string = 'Github Users';
  users:any[] = [];

  constructor(public http:HttpClient){
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });
    this.http = http;
  }

  activate(){
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => this.users = users);
  }
}