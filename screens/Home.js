import React,{useEffect } from 'react'; 
import { StyleSheet, Text, View,Image  } from 'react-native';
import icons from '../assets/images/logo.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiUtil from '../api/ApiUtil';
import ApiConfig from '../api/ApiConfig';

export default function Home({navigation}) {
    useEffect(() => {
        async function login(){

            console.log('login...')
            const storageToken = await AsyncStorage.getItem('jwtToken')
            console.log(storageToken)
            let tokenLoginResult = null
            try{
                tokenLoginResult = await ApiUtil.get(`${ApiConfig.SERVER_URL}/login/token`,{headers: {
                    jwToken: storageToken
                }})
    
                if(tokenLoginResult === 'Success'){
                    console.log('login success')
                    navigation.navigate('ChooseUser')
                }
    
            }catch(e){
                console.log(e)
                // console.log('move sso login page')
                const timer = setTimeout(() => {
                    navigation.navigate('LoginPage')
                }, 3000);
            
                return () => clearTimeout(timer);
            }
        }

        login();
    }, []);

    return (
        <View style={styles.container}>
        {/* <Text style={{ color: 'white' }}>Open up App.js to start working on your app!</Text> */}
            <Image source={icons} style={styles.image}/>
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
        width: 300,
        height: 300,
    },

});
