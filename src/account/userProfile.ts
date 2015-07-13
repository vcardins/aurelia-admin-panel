
export class UserProfile {
  
  public username = '';
  public firstName = '';
  public lastName = '';
  public email = '';
    
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }
  
}
