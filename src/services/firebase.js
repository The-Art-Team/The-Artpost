import firebase from 'firebase';

var config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database(); //the real-time database
export const storage = firebase.storage(); //the firebase storage adjunct for images
export const auth = firebaseApp.auth(); //the firebase auth namespace

export const providers = firebase.auth;
