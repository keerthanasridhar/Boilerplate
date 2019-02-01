import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAgQTQL7YZ_Wz1qDaABOJltIWAtGv_hDXc",
    authDomain:"expensify-7c93e.firebaseapp.com",
    databaseURL: "https://expensify-7c93e.firebaseio.com",
    projectId: "expensify-7c93e",
    storageBucket:"expensify-7c93e.appspot.com",
    messagingSenderId: 1034400714451
};

firebase.initializeApp(config);
const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//export firebase
export { firebase,googleAuthProvider,database  as default }









