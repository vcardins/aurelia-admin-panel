import {autoinject, bindable} from 'aurelia-framework';
import {ExampleContext} from './example-context';

@autoinject
export class Example {
  @bindable base:any = null;
  context:ExampleContext;
  model:any = null;
  view:any = null;
  result = false;

  constructor(context:ExampleContext) {
    this.context = context;
  }

  baseChanged(newValue:any) {
    this.context.base = newValue;
    this.context.example = this;   
  }
}
