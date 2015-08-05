import {ExampleContext} from './converters/example-context'

export function configure(aurelia) {
  const path = "converters/";
  const pathUtils = "utils/";
  
  aurelia.container.registerInstance(
    ExampleContext,
    new ExampleContext('.'));
    
    aurelia.globalizeResources(
      `${path}example`,
      `${path}date-format`, 
      `${path}number-format`, 
      `${path}markdown`, 
      `${path}source`,        
      `${path}column`, 
      `${path}file`, 
      `${path}object-to-array`,
      `${pathUtils}blur-image`
    );  

}
