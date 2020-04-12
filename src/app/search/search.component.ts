import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  values = "";

  constructor(private fs : FoodService) { }

  ngOnInit(): void {
  }

  getFood(){
    this.fs.getFood(this.values)

  }

  onKey(event: any) { // without type info
    this.values = event.target.value ;
  }

}
