import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from 'react';

// const backImage = require('../assets/backbg.png');
import backImage from '../assets/watercolor.png';

export default function Signup({navigation}) {
   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onHandleSignup = () => {
        if (email !== "" && password !== ""){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user, "SignUp successful");
            })
            .catch((err) => {
                const errorMessage = err.message;
                console.log(errorMessage);
            });
        }
    }
    return(
       <View className="flex-1 bg-white">
        <Image source={backImage} className="w-full h-80 absolute top-0 resize"/>
        <View style={styles.whiteSheet}/>
          <SafeAreaView style={styles.form}>
            <Text className="pt-10 pb-5 font-bold text-3xl text-green-500 self-center">Sign Up</Text>
            <TextInput  style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                autoCapitalize="none"/>
            <TextInput  style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                textContentType="password"
                autoCorrect={false}
                autoCapitalize='none' />
            <TouchableOpacity className="bg-green-600 h-14 justify-center items-center mt-10 rounded-xl" onPress={onHandleSignup}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Sign Up</Text>
                </TouchableOpacity>  
            <View className="mt-5 items-center self-center flex-row">
            <Text className="text-gray font-semibold text-sm ">Already have an account? </Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                <Text className=" text-green-600 font-semibold text-sm ">Log In</Text>
                </TouchableOpacity>  
                </View>   
          </SafeAreaView>
       </View>
    )
}  

const styles = StyleSheet.create({
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: "orange",
      alignSelf: "center",
      paddingBottom: 20,
      paddingTop: 15,
    },
    input: {
      backgroundColor: "#F6F7FB",
      height: 58,
      marginBottom: 20,
      fontSize: 16,
      borderRadius: 10,
      padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
      width: '100%',
      height: '75%',
      position: "absolute",
      bottom: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 60,
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 30,
      marginTop: 20,
    },
    button: {
      backgroundColor: '#f57c00',
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
  });