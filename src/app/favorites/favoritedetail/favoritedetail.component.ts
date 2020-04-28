import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/food.service';
import {Location} from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-favoritedetail',
  templateUrl: './favoritedetail.component.html',
  styleUrls: ['./favoritedetail.component.css'],
  providers: [FoodService],
})
export class FavoritedetailComponent implements OnInit {

 favFood : any;
  constructor(private activeRoute : ActivatedRoute, private location : Location, private route : Router,
    private foodService : FoodService,private afAuth : AngularFireAuth) { }

  ngOnInit(): void {
  this.getItem();
  }

  getItem(){
    let id = this.activeRoute.snapshot.paramMap.get('NDB_No');
   this.foodService.getById(id).subscribe( (data:any) =>{
      this.favFood = data
    });
  }

  addToFav(food :  any){
    this.afAuth.currentUser.then(tmps => this.foodService.addUserFavoriteFood(tmps.email,food));
    this.location.back();
  }
  back(){
    this.location.back();
  }
}
