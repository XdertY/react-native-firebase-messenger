import React, {useContext} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {UserContext} from '../contexts/UserContext';

const HomeScreen = (props) => {
    const userContext = useContext(UserContext)

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
            </View>

    )
}

const styles = {
    mainContainer: {
        backgroundColor: '#264653',
        height: "100%",
    },
    button : {
        margin: "50%",
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
