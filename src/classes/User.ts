import {hashed} from '../helpers/hashed';

export class User {
  id: number;
  name: string;
  lastName: string;
  history: any;
  isAdmin: boolean;
	
  constructor(name: string, lastName: string){
    this.name = name;
    this.lastName = lastName;
    this.id = hashed(name);
    this.isAdmin = false;
    this.history = {};
  }
}



