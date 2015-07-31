import {autoinject, bindable} from 'aurelia-framework';
import {ExampleContext} from './example-context';

@autoinject
export class Example {
  @bindable base;
  context:ExampleContext;
  model = null;
  view = null;
  result = false;

  constructor(context:ExampleContext) {
    this.context = context;
  }

  baseChanged(newValue) {
    this.context.base = newValue;
    this.context.example = this;
  }
}
