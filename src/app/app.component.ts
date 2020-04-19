import { Component } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  welcomeImage='assets/welcomeImage.jpg';
  user : firebase.User;

  title = 'Foodies App';

  constructor(private auth : AuthenticationService, private route : Router) { }

  ngOnInit(): void {
    this.auth.getUserState().subscribe( data =>{
      this.user=data;
    })
  }

  signIn(){
    this.route.navigate(['signin']);
  }
  SearchLn(){
    this.route.navigate(['srch']);
  }
  signOut(){
    this.auth.logOut();
    this.route.navigate(['signin']);
  }
  signUp(){
    this.route.navigate(['signup']);
  }
}
