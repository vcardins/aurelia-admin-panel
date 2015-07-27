import {Aurelia, LogManager} from "aurelia-framework"
import config from './authConfig';
import {ConsoleAppender} from 'aurelia-logging-console';

export function configure(aurelia: Aurelia) {
  let _theme:string = 'rdash';
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('toastr')    
    .plugin('charlespockert/aurelia-bs-grid')
    .plugin('./dist/auth/index', (baseConfig)=> { 
    	baseConfig.configure(config);      
    });  
      
  aurelia.start().then(a => a.setRoot()); //'app', document.body
}