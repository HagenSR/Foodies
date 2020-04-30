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

  @Input() obj: any;

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.has('NDB_No')){
      let id = this.route.snapshot.paramMap.get('NDB_No');
      console.log('this' + id)
      this.service.getById(id).subscribe(temp => this.obj = temp);
      console.log('here' + this.obj.GmWt)
    }
  

  }

  Back() {
    this.location.back();
  }

<<<<<<< HEAD
=======
  Add(){
    let id = this.route.snapshot.paramMap.get('NDB_No');
    this.service.getById(id).subscribe( (data:any) =>{
      this.obj = data
    });
  
  }
>>>>>>> ddeb40aa254c6ff388b1a194af2e79267effdfa6

}
