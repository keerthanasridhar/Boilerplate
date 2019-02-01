import {firebase,googleAuthProvider} from '../firebase/firebase';


export const login = (uid)=>({
    type: 'LOGIN',
    uid
});

export const startLogin = ()=>{

    return ()=>{
    // console.log('The button pop up function')

        //Sign in with a popup and login with google services
    return firebase.auth().signInWithPopup(googleAuthProvider)

    }
}

export const logout = ()=>({
    type: 'LOGOUT'
});

export const startLogOut = ()=>{
    return ()=>{
        return firebase.auth().signOut();
    }
}