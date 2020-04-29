import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  authError: any;
  submitted = false;


  constructor(private auth: AuthenticationService , private formBuilder: FormBuilder,
              private router: Router ) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(data => {
    this.authError = data;
  });
    this.loginForm = this.formBuilder.group({
    email : ['', Validators.required],
    password: ['', Validators.required]
});

}
get f() { return this.loginForm.controls; }


signIn() {
  this.auth.login(this.f.email.value, this.f.password.value);
}
}
