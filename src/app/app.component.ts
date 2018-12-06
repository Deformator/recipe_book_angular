import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyA7qNMwyjBEK8AQXJru8B9CZn2Ue3cMUb8",
      authDomain: "recipe-book-angular-3085d.firebaseapp.com",
      databaseURL: "https://recipe-book-angular-3085d.firebaseio.com",
      projectId: "recipe-book-angular-3085d",
      storageBucket: "recipe-book-angular-3085d.appspot.com",
      messagingSenderId: "985128574386"
    })
  }

}
