import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FoodService} from '../food.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-food-card-small',
  templateUrl: './food-card-small.component.html',
  styleUrls: ['./food-card-small.component.css'],
  providers: [AngularFireAuth, FoodService],
})

export class FoodCardSmallComponent implements OnInit {

  @Input() obj: any;

  constructor(private route: Router, private rte: ActivatedRoute, private fds : FoodService,  private afAuth : AngularFireAuth) { }

  View() {
    this.route.navigate(['moreInfo/' + this.obj.NDB_No]);
  }

  Add() {
    let tmp; 
    this.afAuth.currentUser.then(tmps => this.fds.addToUserFoods(this.obj.NDB_No, tmps.email));
  }

  ngOnInit(): void {
  }

}
