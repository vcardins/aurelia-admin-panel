import {Aurelia, LogManager} from "aurelia-framework"
import config from './authConfig';
import {ConsoleAppender} from 'aurelia-logging-console';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);

export function configure(aurelia: Aurelia) {
  
  let _theme:string = 'default';
  
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('toastr')    
    .plugin('./dist/auth/index', (baseConfig)=> {   //the name of plugin becomes 'paulvanbladel/aureliauth'
    	baseConfig.configure(config);      
    });  
      
  aurelia.start().then(a => a.setRoot('app', document.body));
}