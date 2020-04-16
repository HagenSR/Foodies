import { Component, OnInit } from '@angular/core';
import {FoodService} from '../food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [FoodService]
})
export class SearchComponent implements OnInit {

  constructor(private fd : FoodService) { }

   list : any[];

  private value = '';
  update(value: string) {
     this.value = value; 
     console.log(value) }

  search(value : string){
    console.log(value)
    this.list = this.fd.find(value);
  }

  ngOnInit(): void {
    console.log("Here")
  }

}
