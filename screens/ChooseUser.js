import { StyleSheet, Text, View,Image,TouchableOpacity  } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Button } from 'react-native-paper';
import arrowToLeft from '../assets/images/arrowToLeft.png';
import { useRoute } from '@react-navigation/native';
// auth
import { useAuth } from '../contexts/AuthContext.js';
import Toast from 'react-native-toast-message';

import ApiConfig from '../api/ApiConfig.js';
import ApiUtil from '../api/ApiUtil.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({navigation}) {
  const {saveStoreInfo} = useAuth()
  const [ loginInfo, setLoginInfo] = useState(null);
  const route = useRoute()
  const params = route.params

  const handleHostPress = () => {
    if(!!loginInfo && !!loginInfo.business_no){
      AsyncStorage.setItem('jwtToken', params.jwtToken).then(()=>navigation.navigate('PlaceList'))
      saveStoreInfo({
        store_name: loginInfo.store_name,
        store_address: loginInfo.store_address ?? loginInfo.store_road_address,
        store_road_address: loginInfo.store_road_address,
        store_category: loginInfo.store_category,
        store_number: loginInfo.store_number,
        business_no: loginInfo.business_no,
      })
      
      Toast.show(({
        type: 'success',
        text1: `호스트님 안녕하세요👋`,
        text2: `경기 일정을 확인하고 새 호스팅을 해보세요!`
      }))
    } else {
      navigation.navigate('HostPhoneNumber', {type: 'host'})
    }

  };

  const handleUserPress = () => {
    AsyncStorage.setItem('jwtToken', params.jwtToken).then(()=>navigation.navigate('HostPhoneNumber', {type: 'user'}))
  }

  const arrowbuttonPress = () => {
    navigation.goBack();
  };


  useFocusEffect(
    useCallback(()=>{
        ApiUtil.get(`${ApiConfig.SERVER_URL}/login/token`,{headers: {
          jwToken: params.jwtToken
        }}).then(res=>{
          console.log('login info:::', res)
          setLoginInfo(res)
        })
    }, [])
  )
    return (
        <View style={styles.container}>

        <View style={styles.header}>
            <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
            <Image source={arrowToLeft} style={styles.arrowIcon} />
            </TouchableOpacity>
            
        </View>
          <TouchableOpacity onPress={handleHostPress}  style={styles.hostContainer}>
              <Text style={styles.text}>호스트</Text>
              <Text style={styles.subtext}>가게에서 모임을 호스팅해요.</Text>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <TouchableOpacity onPress={handleUserPress} style={styles.userContainer}>
                <Text style={styles.text}>사용자</Text>
                <Text style={styles.subtext}>호스팅 된 모임에 참여해요.</Text>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative'
    },
    hostContainer: {
      height: '50%',
      justifyContent: 'flex-end',
      flex:1,
      textAlign:'left',
      paddingLeft: 60,
      paddingBottom:20

    },
    userContainer: {
      height: '50%',
      justifyContent: 'flex-start',
      flex:1,
      alignItems: 'flex-end', // 가로 오른쪽 정렬
      paddingRight: 60,
      paddingTop:20
    },
    text : {
      fontWeight: '500',
      fontSize: 34,
      fontFamily :'NotoSansKR-Black',
      color:'black',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
    },
    subtext :{
      color:'black',fontSize: 13,
      fontFamily :'NotoSansKR-Medium',
      fontWeight:'100',
      marginTop: -30,
    },
    line: {
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      marginVertical: 25, // 수평선의 상단과 하단 여백 조정,
      marginRight:60,
      marginLeft:60
    },
    arrowIcon: {
      width: 20,
      height: 20,
      marginTop:20,
  },
  touchable: {
    alignItems: 'center',
    position: 'absolute',
    top: '50%', left: 0,
    transform: [{translateY: 13.1}, {translateX: 20}],
    zIndex:10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    position: 'absolute',
    top : 0
  },
});
