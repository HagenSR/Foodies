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
  searchMore="";
  startSearch="";
  displaySearchbtn=true;
  showDetail=false;
  favDetail :any;
  constructor(private foodService : FoodService, private location : Location, private router : Router, private afAuth : AngularFireAuth,
    private activeRoute : ActivatedRoute) { }

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
           this.showSearch();
      
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
    this.showSearch();

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
  showSearch(){
    if(this.favoriteList.length >= 1){
      this.displaySearchbtn=true;
      this.searchMore= "Click Here to Add More Food To Your Favorites List";
    }else{
      this.displaySearchbtn=false;
      this.startSearch="Click Here To Add Your Favorite Foods";
    }
  }
  back(){
    this.showFavorites=true;
  }
 detail(item: any){
   this.showDetail=true;
  this.foodService.getById(item).subscribe(data =>{
    this.favDetail=data
  })
  
 }
 backToFavorites(){
   this.showDetail=false;
   
 }
}
