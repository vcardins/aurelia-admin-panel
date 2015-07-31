System.config({
  "defaultJSExtensions": true,
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "es7.decorators",
      "es7.classProperties",
      "runtime"
    ]
  },
  "paths": {
    "*": "dist/*.js",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  }
});

System.config({
  "map": {
    "aurelia-animator-css": "github:aurelia/animator-css@0.13.0",
    "aurelia-binding": "github:aurelia/binding@0.8.4",
    "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.14.1",
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.1",
    "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.6.2",
    "aurelia-framework": "github:aurelia/framework@0.13.4",
    "aurelia-history": "github:aurelia/history@0.6.1",
    "aurelia-history-browser": "github:aurelia/history-browser@0.6.2",
    "aurelia-http-client": "github:aurelia/http-client@0.10.2",
    "aurelia-loader": "github:aurelia/loader@0.8.3",
    "aurelia-loader-default": "github:aurelia/loader-default@0.9.1",
    "aurelia-logging": "github:aurelia/logging@0.6.2",
    "aurelia-metadata": "github:aurelia/metadata@0.7.1",
    "aurelia-path": "github:aurelia/path@0.8.1",
    "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.6.1",
    "aurelia-router": "github:aurelia/router@0.10.3",
    "aurelia-task-queue": "github:aurelia/task-queue@0.6.1",
    "aurelia-templating": "github:aurelia/templating@0.13.15",
    "aurelia-templating-binding": "github:aurelia/templating-binding@0.13.2",
    "aurelia-templating-resources": "github:aurelia/templating-resources@0.13.3",
    "aurelia-templating-router": "github:aurelia/templating-router@0.14.1",
    "auth/index": "src/auth/index",
    "authFilter": "auth/authFilter",
    "babel": "npm:babel-core@5.8.19",
    "babel-runtime": "npm:babel-runtime@5.8.19",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "charlespockert/aurelia-bs-grid": "github:charlespockert/aurelia-bs-grid@0.0.2",
    "commonmark": "npm:commonmark@0.21.0",
    "core-js": "npm:core-js@0.9.18",
    "css": "github:systemjs/plugin-css@0.1.13",
    "font-awesome": "npm:font-awesome@4.4.0",
    "google-maps-api": "npm:google-maps-api@1.0.2",
    "jquery": "github:components/jquery@2.1.4",
    "moment": "github:moment/moment@2.10.6",
    "nprogress": "github:rstacruz/nprogress@0.2.0",
    "numeral": "npm:numeral@1.5.3",
    "smajl/bootstrap": "github:smajl/bootstrap@master",
    "toastr": "github:CodeSeven/toastr@2.1.1",
    "github:aurelia/animator-css@0.13.0": {
      "aurelia-templating": "github:aurelia/templating@0.13.15"
    },
    "github:aurelia/binding@0.8.4": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.1",
      "aurelia-metadata": "github:aurelia/metadata@0.7.1",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/bootstrapper@0.14.1": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.6.2",
      "aurelia-framework": "github:aurelia/framework@0.13.4",
      "aurelia-history": "github:aurelia/history@0.6.1",
      "aurelia-history-browser": "github:aurelia/history-browser@0.6.2",
      "aurelia-loader-default": "github:aurelia/loader-default@0.9.1",
      "aurelia-logging-console": "github:aurelia/logging-console@0.6.1",
      "aurelia-router": "github:aurelia/router@0.10.3",
      "aurelia-templating": "github:aurelia/templating@0.13.15",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.13.2",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.13.3",
      "aurelia-templating-router": "github:aurelia/templating-router@0.14.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.9.1": {
      "aurelia-logging": "github:aurelia/logging@0.6.2",
      "aurelia-metadata": "github:aurelia/metadata@0.7.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/event-aggregator@0.6.2": {
      "aurelia-logging": "github:aurelia/logging@0.6.2"
    },
    "github:aurelia/framework@0.13.4": {
      "aurelia-binding": "github:aurelia/binding@0.8.4",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.1",
      "aurelia-loader": "github:aurelia/loader@0.8.3",
      "aurelia-logging": "github:aurelia/logging@0.6.2",
      "aurelia-metadata": "github:aurelia/metadata@0.7.1",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.1",
      "aurelia-templating": "github:aurelia/templating@0.13.15",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/history-browser@0.6.2": {
      "aurelia-history": "github:aurelia/history@0.6.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/http-client@0.10.2": {
      "aurelia-path": "github:aurelia/path@0.8.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/loader-default@0.9.1": {
      "aurelia-loader": "github:aurelia/loader@0.8.3",
      "aurelia-metadata": "github:aurelia/metadata@0.7.1"
    },
    "github:aurelia/loader@0.8.3": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-metadata": "github:aurelia/metadata@0.7.1",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "core-js": "npm:core-js@0.9.18",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.6.3"
    },
    "github:aurelia/metadata@0.7.1": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/route-recognizer@0.6.1": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/router@0.10.3": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.6.2",
      "aurelia-history": "github:aurelia/history@0.6.1",
      "aurelia-logging": "github:aurelia/logging@0.6.2",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.6.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating-binding@0.13.2": {
      "aurelia-binding": "github:aurelia/binding@0.8.4",
      "aurelia-logging": "github:aurelia/logging@0.6.2",
      "aurelia-templating": "github:aurelia/templating@0.13.15"
    },
    "github:aurelia/templating-resources@0.13.3": {
      "aurelia-binding": "github:aurelia/binding@0.8.4",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.1",
      "aurelia-logging": "github:aurelia/logging@0.6.2",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.1",
      "aurelia-templating": "github:aurelia/templating@0.13.15",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating-router@0.14.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.1",
      "aurelia-metadata": "github:aurelia/metadata@0.7.1",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-router": "github:aurelia/router@0.10.3",
      "aurelia-templating": "github:aurelia/templating@0.13.15"
    },
    "github:aurelia/templating@0.13.15": {
      "aurelia-binding": "github:aurelia/binding@0.8.4",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.1",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.8.3",
      "aurelia-logging": "github:aurelia/logging@0.6.2",
      "aurelia-metadata": "github:aurelia/metadata@0.7.1",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:charlespockert/aurelia-bs-grid@0.0.2": {
      "bootstrap": "github:twbs/bootstrap@3.3.5",
      "gooy/aurelia-compiler": "github:gooy/aurelia-compiler@0.0.5"
    },
    "github:gooy/aurelia-compiler@0.0.5": {
      "aurelia-loader": "github:aurelia/loader@0.8.3",
      "aurelia-loader-default": "github:aurelia/loader-default@0.9.1",
      "aurelia-templating": "github:aurelia/templating@0.13.15"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.3.1"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-punycode@0.1.0": {
      "punycode": "npm:punycode@1.3.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:rstacruz/nprogress@0.2.0": {
      "css": "github:systemjs/plugin-css@0.1.13"
    },
    "github:smajl/bootstrap@master": {
      "css": "github:systemjs/plugin-css@0.1.13",
      "jquery": "github:components/jquery@2.1.4"
    },
    "github:twbs/bootstrap@3.3.5": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:asap@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:babel-runtime@5.8.19": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:buffer@3.3.1": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:commonmark@0.21.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "entities": "npm:entities@1.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "mdurl": "npm:mdurl@1.0.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "punycode": "github:jspm/nodelibs-punycode@0.1.0",
      "string.prototype.repeat": "npm:string.prototype.repeat@0.2.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:entities@1.1.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.13"
    },
    "npm:google-maps-api@1.0.2": {
      "latlng": "npm:latlng@1.0.0",
      "promise": "npm:promise@6.1.0",
      "scriptjs": "npm:scriptjs@2.5.7"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:numeral@1.5.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:promise@6.1.0": {
      "asap": "npm:asap@1.0.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:scriptjs@2.5.7": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

