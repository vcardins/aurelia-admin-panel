
export class State {
  abbreviation:string = null;
  name:string = null;  
}
                
export class Contact {
	id:string = null;  
  firstName:string = null;
  lastName:string = null;
  gender:string = null;
  address:string = null;
  city:string = null;
  state:State = new State();  
  email:string = null;
  phoneNumber:string = null;
  
  constructor(model?:Contact) {
    if (model) { Object.assign(this, model);  }
  }
  
  get fullName(){
    return (this.firstName) ? (`${this.firstName}` + (this.lastName ? ' ' + this.lastName : '')) : undefined;
  }
}
