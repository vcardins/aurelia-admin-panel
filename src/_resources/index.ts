import {ExampleContext} from './converters/example-context'

export function configure(aurelia) {
  //const path = "./converters/";
  const path = "../converters/";
  //const path = '/dist/_resources/converters/';

  aurelia.container.registerInstance(
    ExampleContext,
    new ExampleContext('./converters'));
    aurelia.globalizeResources(
      `${path}date-format`, 
      `${path}number-format`, 
      `${path}markdown`, 
      `${path}source`, 
      `${path}example`, 
      `${path}column`, 
      `${path}file`, 
      `${path}object-to-array`
    );  
}
