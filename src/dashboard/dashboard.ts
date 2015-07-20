import {computedFrom} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import * as toastr from 'toastr';
import * as moment from 'moment';

export class User {
  public firstName = 'John';
  public lastName = 'Doe';

  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  @computedFrom('firstName', 'lastName')
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }
}

export class Dashboard{
  public heading = 'Welcome to the Aurelia Navigation App!';

  @bindable
  public user = new User();

  public previousValue = this.user.fullName;

  submit(){
    this.previousValue = this.user.fullName;
    toastr.info(`Welcome, ${this.user.fullName}!`, 'Welcome');	
  }

  canDeactivate() {
    if (this.user.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  public toView(value){
    return value && value.toUpperCase();
  }
}
