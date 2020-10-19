import React, {useEffect, useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext({})

const UserContextProvider = (props) => {

    //Google Auth
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    //Phone Auth
    const [code, setCode] = useState(null);
    const [confirm, setConfirm] = useState(null);


    const onAuthStateChanged = (user) => {
        console.log("AuthStateChanged")
        console.log(user);
        setUser(user);
        props.setUser(user);
        //Stack.Screen('Home')
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        //auth().setPersistence('local');
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [])

    const exportFunctions = {
        onGoogleButtonPress : async () => {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then( () => {
            return auth().signInWithCredential(googleCredential);

        },

        logoutGoogleHandler : () => {
            auth()
                .signOut()
                .then(() => console.log('User signed out!'));
        },

        loginHandler : (email, password) => {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then((cred) => {
                    console.log(cred)
                    alert('Logged in!')
                })
                .catch(error => {
                    alert(error.code + error.message)

                    alert(error);
                })
        },

        signUpHandler : (email, password) => {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((cred) => {
                    return firestore().collection("users").doc(cred.user._user.uid).set({
                        firstName: "",
                        lastName: "",
                        phoneNumber: "",
                    })
                    alert('User Created')
                    //Stack.Screen('Home')
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        alert('That email address is invalid!');
                    }

                    alert(error);
                })
        },

        signInWithPhoneNumber :  (phoneNumber) => {
            auth().signInWithPhoneNumber(phoneNumber).then(cred => {
                setConfirm(cred);
            })

        },

        confirmCode : (code) => {
            try {
                let cred = auth.PhoneAuthProvider.credential(confirm.verificationId , code);
                console.log(cred);
                auth().signInWithCredential(cred).then(resp => {
                     return firestore().collection("users").doc(resp.user._user.uid).set({
                         firstName: "",
                         lastName: "",
                         phoneNumber: resp.user._user.phoneNumber
                     })
                }).catch(err => {
                    console.log("Error logging in user");
                });
            } catch (error) {
                alert('Invalid code.');
            }
        },

        getUser: () => {
            return user;
        }
    }

    return (
        <UserContext.Provider value={exportFunctions}>
            {props.children}
        </UserContext.Provider>
    )

}

export default  UserContextProvider

