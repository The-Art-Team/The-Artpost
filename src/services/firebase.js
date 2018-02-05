import firebase from 'firebase';

// artpost401

var config = {
  apiKey: 'AIzaSyBU-cSBAHhmlFx8RAMj3EX5ZnI92GUBtGg',
  authDomain: 'the-artpost.firebaseapp.com',
  databaseURL: 'https://the-artpost.firebaseio.com',
  projectId: 'the-artpost',
  storageBucket: '',
  messagingSenderId: '869543427707'
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database(); //the real-time database
export const storage = firebase.storage(); //the firebase storage adjunct for images
export const auth = firebaseApp.auth(); //the firebase auth namespace