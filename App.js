import React, {useState, useEffect, Fragment} from 'react';
import {StyleSheet, View, SafeAreaView, TouchableHighlight, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import Login from './src/components/Login';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';


export default function App(props) {
  //Google Auth
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  //Phone Auth
  const [code, setCode] = useState(null);
  const [confirm, setConfirm] = useState(null);

  GoogleSignin.configure({
    webClientId: '19476736411-kdm0gguc6vkjrmgvcf4binhiqugsta4b.apps.googleusercontent.com',
  });

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  const onGoogleButtonPress  =  async ()  => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const logoutGoogleHandler = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
  }

  const loginHandler = (email, password) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          alert('Logged in!')
        })
        .catch(error => {
          alert(error.code + error.message)

          alert(error);
        })
  }

  const signUpHandler = (email, password) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
           alert('User Created')
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
  }

  const signInWithPhoneNumber = async (phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  const confirmCode = async (code) => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      alert('Invalid code.');
    }
  }


  return (
    <Fragment>
        <View style={styles.mainContainer}>

          <SafeAreaView>
            {!user ?
              <Login googleHandler={onGoogleButtonPress}  logoutGoogle={logoutGoogleHandler}
                     signUpHandler={signUpHandler} loginHandler={loginHandler}
                     phoneSingUpHandler={confirmCode} phoneNumberHandler={signInWithPhoneNumber}
              />
              :

                <TouchableHighlight style={styles.button}
                                     onPress={() => logoutGoogleHandler()}>
                  <View style={{flexDirection: 'row'}}>
                    <FontAwesomeIcon style={{marginRight: 10}} icon={['fab', 'google']} />
                    <Text>Log out</Text>
                  </View>
                </TouchableHighlight>}
          </SafeAreaView>
        </View>
    </Fragment>
)
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#264653',
    height: "100%",
  }

});
