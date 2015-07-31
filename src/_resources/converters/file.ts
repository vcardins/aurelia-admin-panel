import {bindable, autoinject} from 'aurelia-framework';
import {ExampleContext} from './example-context';

let extensionLanguageMap = {
  js: 'javascript',
  html: 'markup'
};

function getLanguage(filename) {
  let extension = (/\.(\w+)$/).exec(filename)[1].toLowerCase();
  return extensionLanguageMap[extension];
}

@autoinject
export class File {
  @bindable src;
  @bindable view;
  @bindable model;
  example;
  base;
  githubBase;
  info = null;

  constructor(context:ExampleContext) {
    this.example = context.example;
    this.base = context.base;
    this.githubBase = context.githubBase;
  }

  bind() {
    let src = this.src, example = this.example;

    this.info = {
      name: src,
      moduleId: this.base + '/' + src.substr(0, src.indexOf('.')),
      language: getLanguage(src),
      url: '/dist/' + this.base + '/' + src,
      repoUrl: this.githubBase + '/dist/' + this.base + '/' + src
    };

    if (this.view === 'true')
      example.view = this.info;

    if (this.model === 'true')
      example.model = this.info;

    example.result = example.view && example.model;
  }
}
