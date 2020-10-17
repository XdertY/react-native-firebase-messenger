import React, {useState, useEffect, Fragment} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TextInput,SafeAreaView} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(fab, faCheckSquare, faCoffee)

export default function App(props) {

  //FIREBASE Auth properties

  //FIREBASE Firestore data test property
  const [data, setData] = useState('');

  //Login Properties ->  to be moved to new component
  const [userName, setUserName] = useState('Enter Username');
  const [password, setPassword] = useState("Enter Password");
  const ref = firestore().collection('messages');
  // ...

  GoogleSignin.configure({
    webClientId: '19476736411-kdm0gguc6vkjrmgvcf4binhiqugsta4b.apps.googleusercontent.com',
  });


  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        setData(doc.data().test.toString());
      });
    });
  });

  const onChangeHandler = (e, inputField) => {
    if(inputField === "username")
      setUserName(e);
    else
      setPassword(e);
  }

  const removePlaceHolderHandler = (inputField) => {
    if(inputField === "username") {
      if (userName === "Enter Username")
        setUserName("");
    } else {
      if(password === "Enter Password")
          setPassword("")
    }

  }

  const onEndEditingHandler = (inputField) => {
    if(inputField === "username") {
      if (userName === "")
        setUserName("Enter Username");
    } else {
      if(password === "")
        setPassword("Enter Password")
    }

  }


  return (
    <Fragment>
        <View style={styles.mainContainer}>

          <SafeAreaView>
              <View style={styles.safeAreaView}>

                <View style={{...styles.generalContainer, marginTop: "50%"}}>
                        <Text style={styles.loginText}>Login</Text>

                      <TextInput value={userName}
                                 onFocus={() => removePlaceHolderHandler("username")}
                                 onChange={(e) => onChangeHandler(e, "username")}
                                 onEndEditing={() => onEndEditingHandler("username")}
                                 style={styles.textInput} />

                      <TextInput value={password}
                                 onFocus={() => removePlaceHolderHandler("password")}
                                 onChange={(e) => onChangeHandler(e, "password")} onEndEditing={() => onEndEditingHandler("password")}
                                 style={{...styles.textInput, marginTop: "5%"}} />
                </View>

                <View style={styles.generalContainer}>


                  <TouchableHighlight style={{...styles.button, marginTop: 20}} >
                    <View>
                      <Text>Log in</Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight style={styles.button} >
                    <View >
                      <FontAwesomeIcon icon={['fab', 'google']} />
                      <Text>Log in with Google</Text>
                    </View>
                  </TouchableHighlight>

                </View>

              </View>
          </SafeAreaView>
        </View>
    </Fragment>
)
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#515756',
    height: "100%",
  },
  safeAreaView: {
    backgroundColor: '#43ccb5',
    height: "100%",
    flexDirection: "column",
  },
  loginText: {
    // width: "100%",
    color: '#515756',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: '5%'
  },
  generalContainer: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRowView : {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: '50%'
  },
  rowsView : {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: 'center',
    margin: '3%'
  },
  textInput : {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    color: '#515756',
    width: "80%"
  },
  button : {
    width: "80%",
    padding: 10,
    color: '#515756',
    borderWidth: 1,
    borderColor: '#515756',
    borderRadius: 8,
    backgroundColor: "#91dcfa",
    marginBottom: 10,
    alignItems: 'center'
  },

});
