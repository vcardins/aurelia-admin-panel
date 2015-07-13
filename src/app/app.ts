import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

import {Router} from "aurelia-router"

export class App {
  public router: Router;

  configureRouter(config: any, router: Router){
    config.title = 'Aurelia';
    config.map([
      { route: ['','dashboard'], name: 'dashboard',    moduleId: './dashboard/dashboard',       nav: true, title:'Dashboard' },
      { route: 'flickr',         name: 'flickr',       moduleId: './flickr/flickr',             nav: true, title:'Flickr' },
      { route: 'child-router',   name: 'child-router', moduleId: './child-router/child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
