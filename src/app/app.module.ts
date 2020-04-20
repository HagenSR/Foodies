import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodService } from './food.service';
import { SearchComponent } from './search/search.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import {FoodCardComponent} from './food-card/food-card.component';
import { AuthenticationService } from './auth/authentication.service';
import { AuthGuard } from './auth/auth.guard';
import { FoodCardSmallComponent } from './food-card-small/food-card-small.component';
import { TrackComponent } from './track/track.component';




const appRoutes: Routes = [
  { path: 'landingpage', component: LandingpageComponent},
  { path: 'profile', component: ProfileComponent },
  {path : 'signin', component:SignInComponent },
  {path : 'signup', component:SignUpComponent},
  {path : 'moreInfo/:NDB_No',component: FoodCardComponent},
  { path: 'srch', component: SearchComponent},
  {path: 'track', component: TrackComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LandingpageComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    SearchComponent,
    FoodCardComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    FoodCardSmallComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
       { enableTracing: false } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule

  ],
  providers: [FoodService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
