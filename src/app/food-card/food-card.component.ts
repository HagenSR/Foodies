import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent implements OnInit {

  @Input() obj: any;

  constructor() { }

  ngOnInit(): void {
  }

}
