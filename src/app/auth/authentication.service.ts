import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private eventAuthError =new BehaviorSubject<string>("");
  eventAuthError$ =this.eventAuthError.asObservable();
  newUser : any;


  constructor( public afAuth:AngularFireAuth, private db:AngularFirestore,
    private router : Router) { }

    getUserState(){
      return this.afAuth.authState;
    }



    async createUser(user){
      return new Promise( resolve => {
        this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(userCredential =>{
            this.newUser = user;
      
            userCredential.user.updateProfile({
              displayName : user.email + ' ' + user.lastName + ' ' + user.firstName
            });
      
            this.insertUserDate(userCredential).then(() =>{
              this.router.navigate(['/landingpage']);
            });
            resolve(user.email);
        })
            .catch(error =>{
              this.eventAuthError.next(error);
            })
      })
     }



     insertUserDate(userCredential : firebase.auth.UserCredential){
      return this.db.doc(`FoodieUsers/${userCredential.user.uid}`).set({
        email : this.newUser.email,
        firstname:this.newUser.firstName,
        lastname:this.newUser.lastName,
        password:this.newUser.password
    
      });
    }


    login(email : string, password : string){
  
      this.afAuth.signInWithEmailAndPassword(email,password).catch(error =>{
        this.eventAuthError.next(error);
      })
      .then(userCredential =>{
        if(userCredential){
          this.router.navigate(['/landingpage']);
        }
      })
    }



    logOut(){
      this.router.navigate(['/signin']);
      return this.afAuth.signOut();
      
      }
    

}