import { Injectable } from '@angular/core';
declare var variableName:any;
import {find} from './server.js';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getFood(Name: String) {
    find(Name);
    

  }
}
