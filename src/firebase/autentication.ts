import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "@firebase/auth";
import { f } from "./firebase";
import { useEffect, useState } from "react";

const SingUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(getAuth(f),email, password)
    .then(UserCredentials => {
        const user = UserCredentials.user;
        console.log(user?.email);
    })
    .catch(err => {alert(err.message);});
}

const SingIn = (email: string, password: string) => {
    signInWithEmailAndPassword(getAuth(f), email, password)
    .then(UserCredentials => {
        const user = UserCredentials.user;
        console.log(user.email);
    })
    .catch(err =>{alert(err.message)})
}
    

export {SingUp,SingIn}
