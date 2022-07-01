import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

const app = firebase.initializeApp({
  apiKey: "xxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxx"
})

export default app;