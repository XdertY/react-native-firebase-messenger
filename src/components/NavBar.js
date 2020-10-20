import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import  HomeScreen  from "./HomeScreen"
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-ionicons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faComments, faPhone } from '@fortawesome/free-solid-svg-icons'
import Chats from './Chats';

// library.add(fab, faCheckSquare, faCoffee)


const NavBar = (props) => {
    const Tab = createBottomTabNavigator();

    return (
        
        <NavigationContainer>
            <Tab.Navigator
                     screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => { 
                            if(route.name === "Home")
                                return <FontAwesomeIcon icon={faHome} color={color} size={size}/>
                            return <FontAwesomeIcon icon={faComments} color={color} size={size}/>
                        },
                      })}
                    tabBarOptions={{
                        activeTintColor: '#E9C46A',
                        inactiveTintColor: 'gray',
                        style: {
                            backgroundColor: '#264653',
                        }
                    }}
            >
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Chats" component={Chats}/>
            </Tab.Navigator>
        </NavigationContainer>
    
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        marginTop: "50%",
        backgroundColor: '#264653',
        height: "100%",
        flexDirection: "column",
    },
    mainContainer: {
        backgroundColor: '#264653',
        height: "100%",
    },
    button : {
        fontSize: 20,
        width: "80%",
        padding: 10,
        color: 'white',
        borderWidth: 1,
        borderColor: '#515756',
        borderRadius: 8,
        backgroundColor: "#E9C46A",
        marginBottom: 10,
        alignItems: 'center'
    },
    mainContainer: {
        backgroundColor: "white"
    },
})

export default NavBar;