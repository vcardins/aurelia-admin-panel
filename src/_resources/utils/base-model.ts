/**
 * Created by moshensky on 5/25/15.
 */
 import {Validation} from 'aurelia-validation';
 
export class BaseModel {
  isInEditMode:boolean;
  validation:Validation;
  _previousValues:Object;
    
  constructor() {
    this.isInEditMode = false;
    this.validation = undefined;
    this._previousValues = {};
  }

  setEditMode(edit:boolean) {
    this.isInEditMode = edit;

    if (edit) {
      this._previousValues = this.getOwnProperties();
    } else {
      this._previousValues = {};
    }
  }

  revertChanges() {
    if (this.isInEditMode) {
      Object.assign(this, this._previousValues)
      this.setEditMode(false);
    }
  }

  getOwnProperties() {
    let result = new BaseModel();
    for (let prop in this) {
      if (this.hasOwnProperty(prop)) {
        result[prop] = this[prop];
      }
    }

    delete result.isInEditMode;
    delete result.validation;
    delete result._previousValues;

    return result;
  }
}