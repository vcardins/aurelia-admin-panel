import {ExampleContext} from './converters/example-context'

export function configure(aurelia) {
  let d = '/dist/_resources/converters/';
  aurelia.container.registerInstance(
    ExampleContext,
    new ExampleContext('./dist/converters'));
    aurelia.globalizeResources(d+'date-format', d+'number-format', d+'markdown', d+'source', d+'example', d+'column', d+'file');  
}
