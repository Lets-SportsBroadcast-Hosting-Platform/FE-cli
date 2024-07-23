import React,{useCallback, useEffect } from 'react'; 
import { StyleSheet, Text, View,Image  } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import icons from '../assets/images/logo.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiUtil from '../api/ApiUtil';
import ApiConfig from '../api/ApiConfig';

// auth
import { useAuth } from '../contexts/AuthContext.js';

// Toast
import Toast from 'react-native-toast-message';

export default function Home({navigation}) {
    const { saveLogin, getUserInfo, getStoreInfo, saveStoreInfo } = useAuth();
    useFocusEffect(
        useCallback(() => {
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
                    console.log('/login/token', tokenLoginResult)

                    if(!!tokenLoginResult.business_no){
                        saveStoreInfo({
                            store_name: tokenLoginResult.store_name,
                            store_address: tokenLoginResult.store_address ?? tokenLoginResult.store_road_address,
                            store_road_address: tokenLoginResult.store_road_address,
                            store_category: tokenLoginResult.store_category,
                            store_number: tokenLoginResult.store_number,
                            business_no: tokenLoginResult.business_no,
                        })

                        navigation.navigate('PlaceList')
                        Toast.show(({
                            type: 'success',
                            text1: `${userInfo?.name ?? ''} 호스트님 안녕하세요👋`,
                            text2: `경기 일정을 확인하고 새 호스팅을 해보세요!`
                        }))
                    } else if(!!tokenLoginResult.area) {
                        navigation.navigate('PlaceList')
                        Toast.show(({
                            type: 'success',
                            text1: `${userInfo?.name ?? ''} 사용자님 안녕하세요👋`,
                            text2: `경기 일정을 확인하고 새 호스팅을 해보세요!`
                        }))
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
        }, [])
    );

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
