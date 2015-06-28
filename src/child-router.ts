import {Router} from "aurelia-router"

export class ChildRouter{
  public router: Router;
  public heading = 'Child Router';

  configureRouter(config: any, router){
    config.map([
      { route: ['','welcome'], name: 'welcome',      moduleId: './welcome',      nav: true, title:'Welcome' },
      { route: 'flickr',       name: 'flickr',       moduleId: './flickr',       nav: true, title:'Flickr' },
      { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
