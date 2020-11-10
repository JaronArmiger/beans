import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBB6DlQ00huIdK63Mip6UbTswYJcF0YrUc",
  authDomain: "beans-fe9bf.firebaseapp.com",
  databaseURL: "https://beans-fe9bf.firebaseio.com",
  projectId: "beans-fe9bf",
  storageBucket: "beans-fe9bf.appspot.com",
  messagingSenderId: "753344608337",
  appId: "1:753344608337:web:5a0fee0d58b0a9745ae070"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();