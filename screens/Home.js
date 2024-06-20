import React,{useEffect } from 'react'; 
import { StyleSheet, Text, View,Image  } from 'react-native';
import icons from '../assets/images/logo.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiUtil from '../api/ApiUtil';
import ApiConfig from '../api/ApiConfig';

// auth
import { useAuth } from '../contexts/AuthContext.js';

// Toast
import Toast from 'react-native-toast-message';

export default function Home({navigation}) {
    const { saveLogin, getUserInfo, getStoreInfo } = useAuth();

    useEffect(() => {
        async function login(){

            console.log('login...')
            const storageToken = await AsyncStorage.getItem('jwtToken')
            const userInfo = await getUserInfo()
            const storeInfo = await getStoreInfo()
            console.log(storageToken)
            let tokenLoginResult = null
            try{
                tokenLoginResult = await ApiUtil.get(`${ApiConfig.SERVER_URL}/login/token`,{headers: {
                    jwToken: storageToken
                }})
                // throw new Error()
                if(tokenLoginResult === 'Success' && !!userInfo){
                    if(!!storeInfo){ // 호스트인 경우
                        navigation.navigate('PlaceList')
                        console.log(userInfo)
                        Toast.show(({
                            type: 'success',
                            text1: `${userInfo?.name ?? ''} 호스트님 안녕하세요👋`,
                            text2: `경기 일정을 확인하고 새 호스팅을 해보세요!`
                        }))
                        
                    } else {
                        console.log('login success')
                        saveLogin(userInfo, storageToken)
                        navigation.navigate('ChooseUser')
                    }

                } else {
                    throw new Error()
                }
    
            }catch(e){
                // console.log(e)
                console.log('move sso login page')
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
