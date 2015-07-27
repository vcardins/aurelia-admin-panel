
class State {
  abbreviation:string;
  name:string;  
}
                
export class Contact {
	id:string = '';  
  firstName:string = '';
  lastName:string = '';
  gender:string = '';
  address:string = '';
  city:string = '';
  state:State = '';  
  email:string = '';
  phoneNumber:string = '';
  
  constructor(model?:Contact) {
    Object.assign(this, model || {});        
  }
  
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }
}
