import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/food.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  //profileInformationForm: FormGroup;
  authError : any;
  //profileInformation: any[] = [];
  submitted = false;
  constructor(private formBuilder: FormBuilder, private auth:AuthenticationService, private route : Router, private foodService: FoodService) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(data =>{
      this.authError = data;
    })

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      //weight: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      // height: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      // sex: ['', Validators.required],
  });


  }

  get f() { return this.registerForm.controls; }


  createUser(){
    console.log("creating user");
    this.auth.createUser(this.registerForm.value).then(x => {
      this.foodService.addUserProfileInformation(x.toString());
      console.log(x.toString() + " vs " + this.registerForm.value["email"])
      this.foodService.addUserProfileInformation(x.toString());
      // //this.profileInformation[0] = this.registerForm.get("sex");
      // this.profileInformation[0] = "female";
      // this.profileInformation[1] =  150
      // // this.profileInformation[2] = this.registerForm.get("height");
      // this.profileInformation[2] = 66;
      // this.profileInformation[3] = 0;
      // this.profileInformation[4] = 0;
      // this.profileInformation[5] = 0;

      // this.foodService.editUserProfileInformation(x.toString(), this.profileInformation);
    })

    

    // this.profileInformation[0] = this.registerForm.get("sex");
    // this.profileInformation[0] = "female";
    // this.profileInformation[1] = this.registerForm.get("weight");
    // // this.profileInformation[2] = this.registerForm.get("height");
    // this.profileInformation[2] = 66;
    // this.profileInformation[3] = 0;
    // this.profileInformation[4] = 0;
    // this.profileInformation[5] = 0;

    // this.foodService.editUserProfileInformation(this.registerForm.value["email"], this.profileInformation);
  }

//   async getUid() {
//     // let user = await this.auth.auth().currentUser;
//     // this.auth.authState.subscribe(data =>{
//     //   of((this.foodService.editUserProfileInformation(data.email, this.informationArray))).subscribe(garbage => this.update())
//     // })
//     let email = await user.uid;
// }
}
