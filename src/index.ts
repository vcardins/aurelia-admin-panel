import {Aurelia, LogManager} from "aurelia-framework"
import config from './authConfig';
import {ConsoleAppender} from 'aurelia-logging-console';
import {ValidateCustomAttributeViewStrategy} from 'aurelia-validation';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.info);

export function configure(aurelia: Aurelia) {
  
  let _theme:string = 'rdash';
  aurelia.use
    .standardConfiguration()
    //.developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('toastr')    
    //.plugin('charlespockert/aurelia-bs-grid')
    .plugin('aurelia-validation', (config) => { 
      config.useViewStrategy(ValidateCustomAttributeViewStrategy.TWBootstrapAppendToInput)
    })
    .feature('_resources')
    .feature('auth', (baseConfig)=> { 
    	let cfg = baseConfig.configure(config);
      window.appConfig = cfg;   
    });  
      
  aurelia.start().then(a => a.setRoot()); //'app', document.body
}