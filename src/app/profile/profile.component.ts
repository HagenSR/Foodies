import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  weight = 145 //default values till profile created from sign in.
  height = 66
  bmi = Math.round( (703 * this.weight / Math.pow(this.height,2)) * 10 ) / 10 //Shenanigans because round functions rounds to integer

  constructor() { }

  ngOnInit(): void {
  }

}
