import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

//@autoinject
export class Flickr{
  
  static inject = [HttpClient];
  
  public images = [];
  public url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=mountain&tagmode=any&format=json';

  constructor(public http: HttpClient){
    this.http = http;
  }

  activate(){
    return this.http.jsonp(this.url).then(response => {
      this.images = response.content.items;
    });
  }
}
