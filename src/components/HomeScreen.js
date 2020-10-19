import React, {useContext, useState, useEffect} from 'react';
import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {UserContext} from '../contexts/UserContext';
import * as firebase from '@react-native-firebase/app'

const HomeScreen = (props) => {
    const userContext = useContext(UserContext)

    const [newPhone, setNewPhone] = useState("");

    // style={styles.button}
    return (

            <View style={styles.mainContainer}>
            <Text>aiosdioahdoasdh</Text>
            <TouchableHighlight style={styles.button}
                                onPress={() => userContext.logoutGoogleHandler()}>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesomeIcon style={{marginRight: 10}} icon={['fab', 'google']} />
                    <Text>Log out</Text>
                </View>
            </TouchableHighlight>


                <TextInput placeholder="Enter your phone number" keyboardType={'phone-pad'}
                           onChangeText={(text) => setNewPhone(text)}
                           value={newPhone} />



            </View>

    )
}

const styles = {
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
    }
}

export default HomeScreen;
