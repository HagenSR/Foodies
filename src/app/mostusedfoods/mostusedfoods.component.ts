import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { TrackComponent } from '../track/track.component';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'dns';

@Component({
  selector: 'app-mostusedfoods',
  templateUrl: './mostusedfoods.component.html',
  styleUrls: ['./mostusedfoods.component.css']
})
export class MostusedfoodsComponent {

  mostusedfoods: any[] = [];
  foodlist: any[] = [];
  el: string;
  item: any[] = [];
  duplicates: any[] = [];
  displaymostused: any[] = [];
  dist: any[] = [];
  isDetail = false;
  viewDetail: any;

  constructor(private foodService: FoodService, private location: Location, private afAuth: AngularFireAuth) { }


  ngAfterViewInit(): void {
    this.showMostUsed();
  }


  showMostUsed() {
    this.afAuth.currentUser.then(usr => {
      this.foodService.getMostUsedFoods(usr.email).then(rst => {
        this.dist = this.find_duplicate_in_array(rst)
        this.dist.forEach(item => {
          this.foodService.getById(item).subscribe(res => this.mostusedfoods.push(res))
        })
      }
      )
    })
  }

  find_duplicate_in_array(array1) {
    var object = {};
    var result = [];

    for (var i = 0; i < array1.length - 1; i++) {
      var count = 0;
      var isfound = false;
      for (var j = i + 1; j < array1.length; j++) {

        if (array1[i] === array1[j]) {
          count += 1;
          if (count >= 3) {
            result.push(array1[i])

          }
        }
      }
    }
    return result
  }

  detail(item: any) {
    this.isDetail = true;
    this.foodService.getById(item).subscribe(data => {
      this.viewDetail = data;
    });

  }

  back() {
    this.isDetail = false;
  }

}
