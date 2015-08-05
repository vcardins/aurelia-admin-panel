 
/**
 * Created by moshensky on 5/24/15.
 */
//import {ValidateCustomAttributeViewStrategy} from 'aurelia-validation';
// TODO: move to upper import, because it should be fixed in near commit


import {ValidateCustomAttributeViewStrategyBase} from 'aurelia-validation';

export class TableValidationViewStrategy extends ValidateCustomAttributeViewStrategyBase {
  
  helpBlockClass:string;
  
  constructor()
  {
    super();
    this.helpBlockClass = 'aurelia-validation-message';
  }

  searchFormGroup(currentElement, currentDepth) {
    if (currentDepth === 5) {
      return null;
    }
    if (currentElement.classList && currentElement.classList.contains('form-group')) {
      return currentElement;
    }
    return this.searchFormGroup(currentElement.parentNode, 1 + currentDepth);
  }

  appendMessageToElement(element, validationProperty) {
    var helpBlock = element.nextSibling;
    if (helpBlock) {
      if (!helpBlock.classList) {
        helpBlock = null;
      }
      else if (!helpBlock.classList.contains(this.helpBlockClass)) {
        helpBlock = null;
      }
    }

    if (!helpBlock) {
      helpBlock = document.createElement("p");
      helpBlock.classList.add('help-block');
      helpBlock.classList.add(this.helpBlockClass);

      if (element.nextSibling) {
        element.parentNode.insertBefore(helpBlock, element.nextSibling);
      }
      else {
        element.parentNode.appendChild(helpBlock);
      }
    }
    if (validationProperty) {
      helpBlock.textContent = validationProperty.message;
      if (validationProperty.isValid === true) {
        helpBlock.style.display = 'none';
      } else {
        helpBlock.style.display = 'block';
      }
    } else {
      helpBlock.style.display = 'none';
      helpBlock.textContent = '';
    }
  }

  appendUIVisuals(validationProperty, currentElement) {
    var formGroup = this.searchFormGroup(currentElement, 0);
    if (formGroup) {
      if (validationProperty && validationProperty.isDirty) {
        if (validationProperty.isValid) {
          formGroup.classList.remove('has-warning');
          formGroup.classList.add('has-success');
        }
        else {
          formGroup.classList.remove('has-success');
          formGroup.classList.add('has-warning');
        }
      }
      else {
        formGroup.classList.remove('has-warning');
        formGroup.classList.remove('has-success');
      }

      this.appendMessageToElement(currentElement, validationProperty);
    }
  }
  prepareElement(validationProperty, element){
    this.appendUIVisuals(null, element);
  }
  updateElement(validationProperty, element){
    this.appendUIVisuals(validationProperty, element);
  }
}