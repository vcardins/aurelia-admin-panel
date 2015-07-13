import {Aurelia} from "aurelia-framework"
import config from './authConfig';

export function configure(aurelia: Aurelia) {
  
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('toastr')    
    .plugin('./dist/auth/index', (baseConfig)=> {   //the name of plugin becomes 'paulvanbladel/aureliauth'
    	baseConfig.configure(config);      
    });  
      
  aurelia.start().then(a => a.setRoot());
}