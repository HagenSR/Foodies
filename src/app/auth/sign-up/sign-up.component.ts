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
  authError : any;
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
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

  }

get f() { return this.registerForm.controls; }


createUser(){
  

  this.auth.createUser(this.registerForm.value);

  this.foodService.addUserProfileInformation(this.registerForm.value["email"]);
}
}
