import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View,  FlatList} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {UserContext} from '../contexts/UserContext';
import { faUser, faEnvelope, faPhone, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-ionicons'
import * as firebase from '@react-native-firebase/app'


export default function HomeScreen (props) {
    const userContext = useContext(UserContext)

    const [selectedId, setSelectedId] = useState(null);
    const [newPhone, setNewPhone] = useState("");

    const data = [
        {
            id: "setUserName",
            title: "Set Username"
        },
        {
            id: "setEmail",
            title: "Set Email"
        },
        {
            id: "setPhone",
            title: "Set Phone Number"
        },

        
    ]


    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={style}>
             <View style={{flexDirection: 'row', justifyContent: "flex-start"}}>
             <FontAwesomeIcon style={{marginLeft:  10, marginRight: 10,flex: 1, color: '#E9C46A'}} icon={chooseIcon(item.id)} />
            <Text style={styles.flatListItemText}>{item.title}</Text>
            <FontAwesomeIcon style={{marginRight: 5,flex: 1, color: '#E9C46A'}} icon={faArrowRight} />
          </View>
        </TouchableOpacity>
    );

    const chooseIcon = (id) => {
        if(id === "setUserName")
            return faUser;
        else if(id === "setEmail")
            return faEnvelope;
        else if(id === "setPhone")
            return faPhone;
    }
    

    


    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#264653" : "#264653";
    
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            style={{...styles.flatListItem, backgroundColor}}
          />
        );
      };

    // style={styles.button}
    return (
        
   

    <View style={styles.safeAreaView}>
           <Text style={styles.titleText}>Home</Text>

        <View style={styles.mainContainer}>
           

           <FlatList style={styles.flatList}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
           />


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
    </View>
 

       

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "5%"
    },
    safeAreaView: {
        backgroundColor: '#2A9D8F',
        height: "100%",
        flexDirection: "column",
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
        marginTop: 20,
        alignItems: 'center'
    },
    titleText: {
        marginTop: "15%",
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: "#E9C46A",
    },
    flatList: {
        width: "90%",
    },
    flatListItem: {
        marginBottom: 2,
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderColor: "#515756",
        borderRadius: 3,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    flatListItemText: {
        flex: 1,
        color:"white",
        fontSize: 15,
    }
   
})