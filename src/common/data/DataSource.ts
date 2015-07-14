import {IDataService, DataService} from './DataService';
import {inject} from 'aurelia-framework';

export class DataSource {
  repoNames:Array<string>;
  service:DataService;
  
  constructor(service:DataService) {    
    this.repoNames = ['account/Account'];
    this.service = service;
    //this.defineLazyLoadedRepos();
  } 
  /*
   // Add ES5 property to datacontext for each named repo
  private defineLazyLoadedRepos() {
      this.repoNames.forEach(function(name) {
          Object.defineProperty(this, name, {
              configurable: true, // will redefine this property once
              get: function() {
                  // The 1st time the repo is request via this property,
                  // we ask the repositories for it (which will inject it).
                  var repo = this.getRepo(name);
                  // Rewrite this property to always return this repo;
                  // no longer redefinable
                  Object.defineProperty(this, name, {
                      value: repo,
                      configurable: false,
                      enumerable: true
                  });
                  return repo;
              }
          });
      });
  }
  
  // Get named Repository Ctor (by injection), new it, and initialize it
  private getRepo(repoName) {
      var fullRepoName = repoName + 'Service';
      debugger;
      var injector = Injector.resolveAndCreate(fullRepoName);

      var injector = new Injector();
      var Repo = injector.get(fullRepoName);
  
      return new Repo();
  }
  	*/
}
