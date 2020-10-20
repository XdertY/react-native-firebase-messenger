import React, {useState, Fragment, useContext} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import Login from './src/components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen'
import UserContextProvider, {UserContext} from './src/contexts/UserContext';
import NavBar from './src/components/NavBar';

export default function App(props) {

  // const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);


  GoogleSignin.configure({
    webClientId: '19476736411-kdm0gguc6vkjrmgvcf4binhiqugsta4b.apps.googleusercontent.com',
  });


  return (
    <Fragment>
        <UserContextProvider setUser={setUser}>
              {!user ?
                  <Login/>
                  :
              <NavBar/>
              }
        </UserContextProvider>
    </Fragment>
)




};
