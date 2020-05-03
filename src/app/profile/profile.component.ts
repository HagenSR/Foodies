import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FoodService } from '../food.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AngularFireAuth, FoodService],
})
export class ProfileComponent implements OnInit {

  @Input() informationArray: any[] = [];
  //informationArray=[10,12];

  sex: string = "male";
  weight: number;
  height: number;
  exercise: number;
  smoke: number;
  drink: number;
  bmi: number;
  bmiResults: string = "AHHHHH";
  
  
  profileForm = this.fb.group({
    weightForm: [this.weight],
    heightForm: [this.height],
    smokeForm: [this.smoke],
    exerciseForm: [this.exercise],
    drinkForm: [this.drink],
  });
  

  constructor(private fb: FormBuilder, private foodService: FoodService, private afAuth : AngularFireAuth) { }

  ngOnInit(): void {
    //this.informationArray=[10,12];
    let userEmail : string;
    this.afAuth.authState.subscribe(data =>{
      this.foodService.getUserProfileInformation(data.email).then(data =>{
        this.informationArray = data;
        this.update();
      })
    })

    

    //this.informationArray = this.afAuth.currentUser.then(tmps => this.foodService.getUserProfileInformation(tmps.email));
    //this.informationArray = this.foodService.getUserProfileInformation()
    
  }

  ngOnChanges(): void {
    console.log("Something changed!")
  }

  update() {


    

        //This is in the Async code because... async shenanigans
        //Note: informationArray = [sex, weight, height, smoke, exercise, drink]
        this.sex = this.informationArray[0];
        this.weight = this.informationArray[1];
        this.height = this.informationArray[2];
        this.bmi = Math.round( (703 * this.weight / Math.pow(this.height,2)) * 10 ) / 10 //Shenanigans because round functions rounds to integer

        this.smoke = this.informationArray[3];
        this.exercise = this.informationArray[4];
        this.drink = this.informationArray[5];

        if (this.bmi < 18.5) {
          this.bmiResults = "underweight"
        }
        else if(this.bmi < 25) {
          this.bmiResults = "normal weight"
        }
        else if(this.bmi < 30){
          this.bmiResults = "overweight"
        }
        else if(this.bmi >= 30){
          this.bmiResults = "obese"
        }

        this.profileForm = this.fb.group({
          weightForm: [this.weight],
          heightForm: [this.height],
          smokeForm: [this.smoke],
          exerciseForm: [this.exercise],
          drinkForm: [this.drink],
        });
  }
  

  onSubmit() {

    this.informationArray[1] = this.profileForm.value["weightForm"];
    this.informationArray[2] = this.profileForm.value["heightForm"];
    this.informationArray[3] = this.profileForm.value["smokeForm"];
    this.informationArray[4] = this.profileForm.value["exerciseForm"];
    this.informationArray[5] = this.profileForm.value["drinkForm"];

    this.afAuth.authState.subscribe(data =>{
      of((this.foodService.editUserProfileInformation(data.email, this.informationArray))).subscribe(garbage => this.update())
    })
    

  }

}
