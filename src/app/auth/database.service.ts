import { Injectable, OnDestroy } from '@angular/core';
import { Firestore, FieldValue, collection, doc, getDocs, query, setDoc, updateDoc, where, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnDestroy {

  constructor() {  }

  citiesRef = collection(db, "favorites");

  async newUser(user: any){
    await setDoc(doc(db, "favorites", user), {
      movieIDs: []
    });
  }
  favIDs: Array<Number> = [];
  async getIDs(){
    // Create a query against the collection.
    const user: any = localStorage.getItem("userName")
    const docRef = doc(db, "favorites", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        for(let i = 0; i<docSnap.data()["movieIDs"].length; i++){
        // console.log("Length: " + docSnap.data()["movieIDs"][1])
        this.favIDs.push(docSnap.data()["movieIDs"][i])
      }
    } else {
      this.favIDs = []
    }

  }
  queryID(){
    this.favIDs = [];
    this.getIDs();
    return this.favIDs;
  }

  async addMovie(movieID: any){
    const user: any = localStorage.getItem("userName")
    const userDoc = doc(db, "favorites", user);

    // Atomically add a new region to the "regions" array field.
    await updateDoc(userDoc, {
        movieIDs: arrayUnion(movieID)
    });
  }
  ngOnDestroy(): void {
    this. favIDs = [];
  }
  // async removeMovie()
}
