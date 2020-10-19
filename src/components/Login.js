import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View, Modal, Animated} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import firestore from '@react-native-firebase/firestore';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faMobile } from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core';
import {UserContext} from '../contexts/UserContext';

library.add(fab, faCheckSquare, faCoffee)

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('')
    const [phone, setPhone] = useState('')
    const [showCodeView, setShowCodeView] = useState(false)

    const userContext = useContext(UserContext)

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const ref = firestore().collection('messages');


    const [data, setData] = useState('');

    const onChangeHandler = (text, inputField) => {
        // alert(text);
        if(inputField === "email")
            setEmail(text);
        else
            setPassword(text);
    }

    const disableButtons = () => {
        return !(email !== '' && email !== 'Enter Email' && password !== '' && password !== 'Enter Password')
    }

    const submitCodeHandler = () => {
        setShowCodeView(false);
        setShowModal(false);
        userContext.confirmCode(code)
    }

    // const fadeIn = () => {
    //     // Will change fadeAnim value to 1 in 5 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 1,
    //         duration: 500
    //     }).start();
    // };
    //
    // const fadeOut = () => {
    //     // Will change fadeAnim value to 0 in 5 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 0,
    //         duration: 5000
    //     }).start();
    // };



    useEffect(() => {
          return ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
              const {title, complete} = doc.data();
              setData(doc.data().test.toString());
            });
          });
        });


    return (
        <View style={styles.safeAreaView}>

            <Modal   animationType="slide"
                     transparent={true}
                     visible={showModal}
                     onRequestClose={() => {
                     }}>
                <View style={styles.centeredView}>
                    <View style={{...styles.modalView, display: !showCodeView ? "" : "none"}}>

                            <Text>
                                Enter Phone number
                            </Text>
                            <TextInput placeholder="Enter your phone number" keyboardType={'phone-pad'}
                                       onChangeText={(text) => setPhone(text)}
                                       value={phone}
                                       style={styles.modalTextInput} />
                            <TouchableHighlight disabled={phone === ''}
                                onPress={() => {setShowCodeView(true); userContext.signInWithPhoneNumber(phone)}}
                                style={{...styles.button, marginTop: 20}} >
                                <View>
                                    <Text>Confirm</Text>
                                </View>
                            </TouchableHighlight>
                    </View>


                    <View style={{...styles.modalView, display: showCodeView ? "" : "none"}}>
                            <Text>
                                Enter verification code
                            </Text>

                            <TextInput placeholder="Enter the verification code"
                                       onChangeText={(text) => setCode(text)}
                                       value={code}
                                       style={styles.modalTextInput} />


                            <TouchableHighlight onPress={() => submitCodeHandler()}
                                                style={{...styles.button, marginTop: 20}} >
                                <View>
                                    <Text>Confirm</Text>
                                </View>
                            </TouchableHighlight>
                     </View>
                </View>
            </Modal>

            <View style={{...styles.generalContainer, marginTop: "50%"}}>
                <Text style={styles.loginText}>Start Chatting!</Text>

                <TextInput placeholder="Enter Email" keyboardType={'email-address'}
                           onChangeText={(text) => onChangeHandler(text,'email')}
                           value={email}
                           style={styles.textInput} />

                <TextInput value={password}
                           placeholder="Enter Password"
                           secureTextEntry={true}
                           onChangeText={(text) => onChangeHandler(text, "password")}
                           style={{...styles.textInput, marginTop: "5%"}} />

            </View>

            <View style={styles.generalContainer}>


                <TouchableHighlight disabled={disableButtons()}
                                    onPress={() => userContext.loginHandler(email, password)}
                                    style={{...styles.button, marginTop: 20}} >
                    <View>
                        <Text>Log in</Text>
                    </View>
                </TouchableHighlight>

                <TouchableOpacity disabled={disableButtons()} style={styles.button}
                                    onPress={() => userContext.signUpHandler(email,password)}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Sign up</Text>
                    </View>
                </TouchableOpacity>

                <TouchableHighlight style={styles.button}
                                    onPress={() => userContext.onGoogleButtonPress()}>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesomeIcon style={{marginRight: 10}} icon={['fab', 'google']} />
                        <Text>Log in with Google</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}
                                    onPress={() => setShowModal(true)}>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesomeIcon style={{marginRight: 10}} icon={faMobile} />
                        <Text>Log in with Phone Number</Text>
                    </View>
                </TouchableHighlight>


            </View>




        </View>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#2A9D8F',
        height: "100%",
        flexDirection: "column",
    },
    loginText: {
        color: '#E9C46A',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: '5%'
    },
    generalContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput : {
        fontSize: 20,
        borderBottomColor: "#E9C46A",
        borderBottomWidth: 1,
        color: '#E9C46A',
        width: "80%"
    },
    button : {
        fontSize: 20,
        width: "80%",
        padding: 10,
        color: '#E9C46A',
        borderWidth: 1,
        borderColor: '#515756',
        borderRadius: 8,
        backgroundColor: "#E9C46A",
        marginBottom: 10,
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTextInput: {
        borderWidth: 1,
        borderRadius: 4,
        maxWidth: '40%',
        minWidth: '40%',
        marginTop: 10
    },
    fadingContainer: {
        backgroundColor: "powderblue"
    },

});

export default Login
