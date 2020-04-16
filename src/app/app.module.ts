import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { FoodService } from './food.service';
import { SearchComponent } from './search/search.component';
=======
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AuthenticationService } from './auth/authentication.service';
import { AuthGuard } from './auth/auth.guard';
import { SearchComponent } from './search/search.component';
import { FoodCardComponent } from './food-card/food-card.component';




const appRoutes: Routes = [
  { path: 'landingpage', component: LandingpageComponent},
  { path: 'profile', component: ProfileComponent },
  {path : 'signin', component:SignInComponent },
  {path : 'signup', component:SignUpComponent}
 
];

>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< Updated upstream
    SearchComponent
=======
    LandingpageComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    SearchComponent,
    FoodCardComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [FoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
