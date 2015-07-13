import {Router} from "aurelia-router"

export class ChildRouter{
  public router: Router;
  public heading = 'Child Router';

  configureRouter(config: any, router){
    config.map([
      { route: ['','dashboard'], name: 'dashboard',    moduleId: '../dashboard/dashboard', nav: true, title:'Dashboard' },
      { route: 'flickr',         name: 'flickr',       moduleId: '../flickr/flickr',       nav: true, title:'Flickr' },
      { route: 'child-router',   name: 'child-router', moduleId: './child-router',         nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
