import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
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
  show: boolean;

  constructor(private fds: FoodService, private afAuth: AngularFireAuth, private renderer: Renderer2) { }

  @ViewChild('dateBox') input;

  ngOnInit(): void {
    let date: Date = new Date()
    this.dte = (1 + date.getUTCMonth()).toString() + '-' + date.getDate().toString() + '-' + date.getFullYear()
    this.getFoodInfo(this.dte)
  }

  ngAfterViewInit() {
    this.renderer.setProperty(this.input.nativeElement, 'value', this.dte.toString());
  }

  Update() {
    this.dte = this.input.nativeElement.value;
    this.getFoodInfo(this.dte)
  }

  setToZero() {
    this.water = 0;
    this.cal  = 0;
    this.protein = 0;
    this.lipids = 0;
    this.carbs = 0;
    this.fiber = 0;
    this.sugar = 0;
    this.calcium = 0;
    this.sodium  = 0;
    this.sat = 0;
    this.mono = 0;
    this.poly  = 0;
    this.chol = 0;
    this.list = [];
  }

  round(){
    this.water = Math.round(this.water);
    this.cal  = Math.round(this.cal);
    this.protein = Math.round(this.protein);
    this.lipids = Math.round(this.lipids);
    this.carbs = Math.round(this.carbs);
    this.fiber = Math.round(this.fiber);
    this.sugar = Math.round(this.sugar);
    this.calcium = Math.round(this.calcium);
    this.sodium  = Math.round(this.sodium);
    this.sat = Math.round(this.sat);
    this.mono = Math.round(this.mono);
    this.poly  = Math.round(this.poly);
    this.chol = Math.round(this.chol);
  }

  getFoodInfo(dte: string){
    this.setToZero()
    this.afAuth.authState.subscribe(elem => this.fds.getUserFoods(elem.email, dte).then(elem => {
      this.ids = elem;
      this.ids.forEach(element => {
        this.fds.getById(element.toString()).subscribe(jsn => {
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
          this.show = true;
        }

        )
      }
      )
      this.round()
    }
    )
    )
    if(this.list.length == 0){
      this.show = false;
      console.log('no food eaten today!')
    }

  }
}

