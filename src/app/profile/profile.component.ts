import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  sex = "female"

  weight = 145 //default values till profile created from sign in.
  height = 66
  bmi = Math.round( (703 * this.weight / Math.pow(this.height,2)) * 10 ) / 10 //Shenanigans because round functions rounds to integer
  bmiResults = ""

  smoke = 0
  exercise = 3
  drink = 15

  constructor() { }

  ngOnInit(): void {
    if (this.bmi < 18.5) {
      this.bmiResults = "underweight"
    }
    else if(this.bmi < 25) {
      this.bmiResults = "normal weight"
    }
    else if(this.bmi < 30){
      this.bmiResults = "overweight"
    }
    else{
      this.bmiResults = "obese"
    }
  }

}
