import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import {TrackComponent} from 'src/app/track/track.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  list : any[]=[];
  favoriteList : any[]=[];
  showFavorites=true;
  constructor(private foodService : FoodService, private location : Location, private router : Router, private afAuth : AngularFireAuth) { }

  ngOnInit(): void {
    this.getFavoriteFoodItems();
  }

  displaySearch(){
    this.showFavorites=false;
  }

  find(value : string){
    this.showFavorites=false;
    this.foodService.find(value).subscribe(elem => this.list = elem);
    console.log(this.list.length)
  }

  getFavoriteFoodItems(){
    console.log("start go here too");
    let userEmail : string;
    let numItem : string[];
    this.afAuth.authState.subscribe(data =>{
      userEmail= data.email;
      this.foodService.getUserFavoriteFoods(userEmail).then(data =>{
        numItem=data;
       numItem.forEach( item =>{
         this.foodService.getById(item.toString()).subscribe(data=>{
           this.favoriteList.push(data);
      
         })
       })
   });
  });

  }

  deleteFavorite(item : any){
  for(let i=0; i<this.favoriteList.length; i++){

    if(this.favoriteList[i] == item){
      this.favoriteList.splice(i,1);
      console.log(this.favoriteList[i]);
      console.log(item);
    }

  }
    
  }
  deleteFavoriteItem(item : any){
    let userEmail : string;
    let numItem : string[];
    this.afAuth.authState.subscribe(data =>{
      userEmail= data.email;
      this.foodService.deleteFavFood(userEmail,item)
    })
    
  }
 
}
