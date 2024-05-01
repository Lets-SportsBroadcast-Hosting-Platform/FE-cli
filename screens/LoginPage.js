import {Pressable, ScrollView, StyleSheet, Text, View,Image  } from 'react-native';
import icons from '../assets/images/logo.png';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import react, { useState, useEffect} from "react";
// google sso login
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

//kakao sso login
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from "@react-native-seoul/kakao-login";



export default function LoginPage({navigation}) {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        GoogleSignin.configure({
          // webClientId: '클라이언트 웹 아이디',
        });
      }, []);
    
    const onPressGoogleBtn = async () => {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const {idToken} = await GoogleSignin.signIn();
        console.log('idToekn : ', idToken);
        if (idToken) {
            // setIdToken(idToken);
            console.log(idToken)
        }
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const res = await auth().signInWithCredential(googleCredential);
        console.log(res)
    };

    //kakao sso
    const [result, setResult] = useState("");
    const signInWithKakao = async ()=> {
        try {
          const token = await login();
          setResult(JSON.stringify(token));
          console.log(token)
        } catch (err) {
          console.error("login err", err);
        }
      };
    
      const signOutWithKakao = async ()=> {
        try {
          const message = await logout();
    
          setResult(message);
        } catch (err) {
          console.error("signOut error", err);
        }
      };
    
      const getProfile = async ()=>{
        try {
          const profile = await getKakaoProfile();
    
          setResult(JSON.stringify(profile));
        } catch (err) {
          console.error("signOut error", err);
        }
      };
    
      const getShippingAddresses = async ()=>{
        try {
          const shippingAddresses = await getKakaoShippingAddresses();
    
          setResult(JSON.stringify(shippingAddresses));
        } catch (err) {
          console.error("signOut error", err);
        }
      };
    
      const unlinkKakao = async ()=>{
        try {
          const message = await unlink();
    
          setResult(message);
        } catch (err) {
          console.error("signOut error", err);
        }
      };

    return (
        <View style={styles.container}>
        <Text style={styles.text}>Let's</Text>
        <Text style={styles.lets}>레츠</Text>
        <Image source={icons} style={styles.image}/>
        <View style={styles.buttoncontainer}>
            <Button icon={()=><Icon name="google" size={24} color={"white"}></Icon>} mode="contained" onPress={onPressGoogleBtn} style={styles.button}>
            <Text style={styles.text1}>Google 로그인</Text>
            </Button>
            <Button icon={()=><Icon name="instagram" size={24} color={"white"}></Icon>} mode="contained" onPress={() => console.log('Pressed')} style={styles.button}>
            <Text style={styles.text1}>인스타그램 로그인</Text>
            </Button>

            <Button
                style={styles.button}
                onPress={() => {
                signInWithKakao();
                }}
            >
                <Text style={styles.text1}>카카오 로그인</Text>
            </Button>

            <Button icon={()=><Icon name="apple" size={24} color={"white"}></Icon>} mode="contained" onPress={() => navigation.navigate('ChooseUser')} style={styles.button}>
            <Text style={styles.text1}>Apple 로그인</Text>
            </Button>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#01162D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 230,
        height: 230,
        transform: [{ translateY: -40 }]
    },
    text1: {
        width: 300,
    },
    text: {
        color:'white',
        transform: [{ translateY: -60 }],
        fontSize:27,
        fontWeight: '800'
    },
    lets :{
        color:'white',
        transform: [{ translateY: -60 }]
    },
    buttoncontainer :{
        transform: [{ translateY: 90 }],

    },
    button: {
        marginBottom : 20,
        width: 300,
        // backgroundColor:'white',
        // color:'black'
    }

});
