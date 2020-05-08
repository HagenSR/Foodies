import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { TrackComponent } from '../track/track.component';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-mostusedfoods',
  templateUrl: './mostusedfoods.component.html',
  styleUrls: ['./mostusedfoods.component.css']
})
export class MostusedfoodsComponent implements OnInit {

   mostusedfoods: any[] = [] ;
   foodlist: any[] = [];
   date: Date [] = [];
   startDate = new Date ('04-01-2020');
   endDate = new Date ('05-31-2020');
  el: string;
  item: any[] = [];
  duplicates: any[]= [];
  displaymostused: any[] = [] ;

  dist: any[] = [] ;
  isDetail= false;
  viewDetail :any;
  constructor(private foodService: FoodService, private location: Location, private afAuth: AngularFireAuth) { }


  ngOnInit(): void {
 
 this.showMostUsed();
 
  }
   
 getMostUsedFoods(){
   let userEmail: string;
   let dt: string;
  
   this.getDateRange(this.startDate, this.endDate);
   this.afAuth.authState.subscribe(data => {
    userEmail = data.email;
    this.date.forEach(el => {
      dt = (1 + el.getUTCMonth()).toString() + '-' + el.getDate().toString() + '-' + el.getFullYear();
      this.foodService.getUserFoods(userEmail, dt).then(data => { 
           
          this.foodlist = this.foodlist.concat(...data)
          console.log(this.foodlist)
          this.item =this.item.concat(this.foodlist);
          this.duplicates= this.find_duplicate_in_array(this.item);
          this.mostusedfoods = this.duplicates.filter(
            (thing, i, arr) => arr.findIndex(t => t === thing) === i
         
          );

          this.mostusedfoods.forEach(val =>{
            this.foodService.getById(val).subscribe(data =>{
              this.displaymostused.push(data);

            })
          })

          this.dist = this.displaymostused.filter(
            (thing, i, arr) => arr.findIndex(t => t.NDB_No === thing.NDB_No) === i
          );
          

  
         });

    })

     });
     return this.displaymostused;
       
 }

 getDateRange(startDate, endDate){
  let dt = new Date(startDate);
  while (dt <= endDate) {
      this.date.push(new Date(dt));
      dt.setDate (dt.getDate() + 1);
   }
  return this.date;

 }

showMostUsed()
{
 this.getMostUsedFoods();
  /* this.item =this.item.concat(this.foodlist);
  console.log(this.item + "this is item");
  this.duplicates= this.find_duplicate_in_array(this.item);
 */


}


find_duplicate_in_array(array1) {
  var object = {};
  var result = [];


for(var i=0; i<array1.length-1; i++){
  var count = 0;
  var isfound=false;
  for(var j=i+1; j<array1.length; j++){
    
      if(array1[i] === array1[j]){
          count+=1;
          if(count >= 3){
              result.push(array1[i])
          
          }
          
          
      }
  }

}

return result
}

detail(item: any)
{
  this.isDetail= true;
  this.foodService.getById(item).subscribe(data =>{
    this.viewDetail=data;
  });
  
}

back()
{
  this.isDetail = false;
}





}
