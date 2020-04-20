import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FoodService} from '../food.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css'],
  providers: [FoodService],
})
export class FoodCardComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private service: FoodService, private location : Location) { }

  obj: any;

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('NDB_No');
    console.log('this' + id)
    this.obj = this.service.getById(id);
  }

  Back() {
    this.location.back();
  }

  Add(){
    let id = this.route.snapshot.paramMap.get('NDB_No');
    

  }

}
