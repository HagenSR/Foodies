import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule, Component } from '@angular/core';


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
import { MostusedfoodsComponent } from './mostusedfoods/mostusedfoods.component';

import { FoodCardSmallComponent } from './food-card-small/food-card-small.component';
import { TrackComponent } from './track/track.component';
import { FavoriteComponent } from './favorites/favorite/favorite.component';
import { FavoritedetailComponent } from './favorites/favoritedetail/favoritedetail.component';
import {HttpClientModule} from '@angular/common/http';



const appRoutes: Routes = [
  { path: 'landingpage', component: LandingpageComponent},
  { path: 'profile', component: ProfileComponent },
  { path : 'signin', component:SignInComponent },
  { path : 'signup', component:SignUpComponent },
  { path : 'moreInfo/:NDB_No',component: FoodCardComponent },
  { path: 'srch', component: SearchComponent },
  { path: 'track', component: TrackComponent },
  { path : 'favorite', component: FavoriteComponent },
  { path: 'favoritedetail/:NDB_No', component:FavoritedetailComponent },
  { path: 'mostusedfoods', component: MostusedfoodsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LandingpageComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    MostusedfoodsComponent,
    SearchComponent,
    FoodCardComponent,
    FoodCardSmallComponent,
    TrackComponent,
    FavoriteComponent,
    FavoritedetailComponent
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
    AngularFirestoreModule,
    HttpClientModule

  ],
  providers: [FoodService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
