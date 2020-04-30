
import { OnInit } from '@angular/core';
import sdf from '../../data.json';
import { AngularFirestore } from '@angular/fire/firestore';
<<<<<<< HEAD
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
=======
import { firestore } from 'firebase';
import * as firebase from 'firebase';
import { Observable, of} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
>>>>>>> ddeb40aa254c6ff388b1a194af2e79267effdfa6


export class FoodService implements OnInit {

  //LIST: any = sdf;
  public LIST: any = sdf;
  dte: string;
 
 

  constructor(private db: AngularFirestore, private afAuth : AngularFireAuth, private http:HttpClient) {
  
  }
  ngOnInit(): void {

  }



  find(desc: string): Observable<any[]> {
    let rtn: any[] = [];
    this.LIST.forEach(element => {
      var x = JSON.parse(JSON.stringify(element));
      if ((x.Shrt_Desc.includes(desc.toUpperCase()))) {
        rtn.push(x);
      }
    });
    return of(rtn);
  }


  getById(id: string): Observable<any> {
    let rtn: any;
    this.LIST.forEach(element => {
      var x = JSON.parse(JSON.stringify(element));
      if (x.NDB_No == id) {
        rtn = x;
      }
    });
    return of(rtn)
  }

  addToUserFoods(id: number, Email: string) {
    let date: Date = new Date();
    let dte = (1 + date.getUTCMonth()).toString() + '-' + date.getDate().toString() + '-' + date.getFullYear();
    var docref = this.db.doc('/FoodsEaten/' + Email + '/date/' + dte);
    docref.get().subscribe(doc => {
      if (!doc.exists) {
        docref.set({
          'FoodIDs': [id]
        })
      }
      else {
        docref.update({ FoodIDs: firebase.firestore.FieldValue.arrayUnion(id) })
      }
    })

  }

<<<<<<< HEAD
  getUserFoods(Email: string, dte: string): Promise<number[]> {
=======


addUserFavoriteFood(Email: string, FoodID: string){
  let date: Date = new Date();
  let dte = (1 + date.getUTCMonth()).toString() + '-' + date.getDate().toString() + '-' + date.getFullYear();
  var docref = this.db.doc('/FavoriteFoods/' + Email);

docref.get().subscribe(doc => {
    if (!doc.exists) {
      docref.set({
        'FavFoods': [FoodID]
      })
    } else {
      docref.update({ FavFoods: firebase.firestore.FieldValue.arrayUnion(FoodID) })
    }
 
  })

 
 
}

  getUserFoods(Email: string) : Promise<number[]> {
>>>>>>> ddeb40aa254c6ff388b1a194af2e79267effdfa6
    let emptyArray: number[];
    var docref = this.db.doc('/FoodsEaten/' + Email + '/date/' + dte);
    return new Promise(resolve =>
      docref.get().subscribe((doc) => {
        if (doc.exists) {
          emptyArray = doc.data().FoodIDs
          resolve(emptyArray)
        } else {
          console.log("No such document!");
        }
      }
      )
    )
  }

  getUserFoods2(Email: string, dte: string): Promise<number[]> {
    let emptyArray: any;
    var docref = this.db.doc('/FoodsEatenAlt/' + Email + '/' + dte);
    return new Promise(resolve =>
      docref.get().subscribe((doc) => {
        if (doc.exists) {
          emptyArray = doc.data()
          resolve(emptyArray)
        } else {
          console.log("No such document!");
        }
      }
      )
    )
  }

  addUserFav(Email: string, FoodID : number){
    var docref = this.db.doc('/FavoriteFoods/' + Email);
    docref.get().subscribe(doc => {
      if (!doc.exists) {
        docref.set({
          'FavFoods': [FoodID]
        })
      }
      else {
        docref.update({ FavFoods: firebase.firestore.FieldValue.arrayUnion(FoodID) })
      }
    })

  }

  getFavoriteFoods(Email: string): Promise<number[]> {
    let emptyArray: number[];
    var docref = this.db.doc('/FavoriteFoods/' + Email);
    return new Promise(resolve =>
      docref.get().subscribe((doc) => {
        if (doc.exists) {
          emptyArray = doc.data().FavFoods
          resolve(emptyArray)
        } else {
          console.log("No such document!");
        }
      }
      )
    )
  }

  getUserFavoriteFoods(Email : string):Promise<string[]>{
    let docref = this.db.doc('/FavoriteFoods/' + Email);
    let favItem : string[];
    return new Promise(resolve => docref.get().subscribe((doc) =>{
      if(doc.exists){
        favItem=doc.data().FavFoods

        console.log("Here")
        resolve(favItem)
        console.log(favItem);
      }else{
        console.log("No Such Document");
      }
    }))
    

  }

  deleteFavFood(Email : string, food: string){
    // var doc = this.db.doc('/FavoriteFoods/' + Email);
    // let favItem : string[];
    let docref=this.db.collection(`${Email}`).doc(`${food}`).delete().then(doc =>{
      console.log(doc)
    })
    console.log(docref);
    
  
  // doc.update({['FavFoods' + food]: firebase.firestore.FieldValue.delete()});
   

  }


  /* 
  finds a JSON food object based on its name, using REGEX
  */

  //  async find({desc}) : Promise<Ifood>{
  //     var db = connection;
  //     db.on('error', console.error.bind(console, 'connection error:'));
  //     db.once('open', function () {
  //         var model = _model("abbrev", FoodSchema, "abbrev");
  //         model.find({ Shrt_Desc: { $regex: input.toUpperCase(), $options: 'i' } },function(err,docs){
  //             if (err) {
  //                 console.log(err);
  //             } else {
  //                return docs;
  //             }
  //         }).limit(25);
  //     });
  // }

}
