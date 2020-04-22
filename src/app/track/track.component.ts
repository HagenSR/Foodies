import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { element } from 'protractor';
import { analytics } from 'firebase';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
  providers: [AngularFireAuth, FoodService],
})

export class TrackComponent implements OnInit {

  water: number = 0;
  cal: number = 0;
  protein: number = 0;
  lipids: number = 0;
  carbs: number = 0;
  fiber: number = 0;
  sugar: number = 0;
  calcium: number = 0;
  sodium: number = 0;
  sat: number = 0;
  mono: number = 0;
  poly: number = 0;
  chol: number = 0;

  ids: number[];
  list: any[] = [];
  dte: string;

  constructor(private fds: FoodService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    let date: Date = new Date();
    this.dte = (1 + date.getUTCMonth()).toString() + '-' + date.getDate().toString() + '-' + date.getFullYear();
    this.afAuth.authState.subscribe(elem => this.fds.getUserFoods(elem.email, this.dte).then(elem => {
      console.log(elem)
      this.ids = elem;
      this.ids.forEach(element => {
        this.fds.getById(element.toString()).subscribe(jsn =>{
          this.water = Number(jsn.Water) + this.water
          this.cal = Number(jsn.Cal) + this.cal
          this.protein = Number(jsn.Protein) + this.protein
          this.lipids = Number(jsn.Lipid) + this.lipids
          this.carbs = Number(jsn.Carbs) + this.carbs
          this.fiber = Number(jsn.Fiber) + this.fiber
          this.sugar = Number(jsn.Sugar) + this.sugar
          this.calcium = Number(jsn.CalciumMG) + this.calcium
          this.sodium = Number(jsn.SodiumMG) + this.sodium
          this.sat = Number(jsn.SatFat) + this.sat
          this.mono = Number(jsn.MonoFat) + this.mono
          this.poly = Number(jsn.PolyFat) + this.poly
          this.chol = Number(jsn.CholestrlMG) + this.chol
          this.list.push(jsn);
          console.log(jsn)
        }
       
        )
      }
      )
    }
    )
    )
    }
}

