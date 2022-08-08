import {User} from './User';
import {hashed} from '../helpers/hashed';

export class Admin extends User {

  constructor(name: string, lastName: string){
    super(name, lastName);
    this.id = hashed(name);
    this.isAdmin = true;
    this.history = {};
  }
}