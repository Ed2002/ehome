import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "@firebase/auth";
import { f } from "./firebase";
import { useEffect, useState } from "react";


var User:any = null;

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

const SetUser = (UserValue: any) => {
    User = UserValue;
}

const Logout = () => {
    signOut(getAuth(f)).then(()=>{
        User = null;
        console.log("Sair");
    });
}

export {SingUp,SingIn,SetUser,User,Logout}
