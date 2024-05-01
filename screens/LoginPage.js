import { StyleSheet, Text, View,Image  } from 'react-native';
import icons from '../assets/images/logo.png';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import naverIcon from '../assets/images/naver-icon.png';
import appleIcon from '../assets/images/apple-icon.png';
import kakaoIcon from '../assets/images/ico_kakao_chat.png';
// sso login
import react, { useState, useEffect} from "react";




export default function LoginPage({navigation}) {
    const [userInfo, setUserInfo] = useState(null);

    return (
        <View style={styles.container}>
        <Text style={styles.text}>Let's</Text>
        <Text style={styles.lets}>레츠</Text>
        <Image source={icons} style={styles.image}/>

        <View style={styles.buttoncontainer}>
            <Button  mode="contained" onPress={()=>{}} style={styles.naverButton}>
                <Image source={naverIcon} style={styles.naverLogo}/>
                <Text style={styles.text1}>Google 로그인</Text>
            </Button>

            <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.kakaoButton}>
                <Image source={kakaoIcon} style={styles.naverLogo}/>
                <Text style={styles.text1}>인스타그램 로그인</Text>
            </Button>

            <Button  mode="contained" onPress={() => navigation.navigate('ChooseUser')} style={styles.AppleButton}>
                <Image source={appleIcon} style={styles.appleLogo}/>
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
        width: 320,
        height: 320,
        transform: [{ translateY: -20 }]
    },
    text1: {
        width: 120,
        color:"black",
        fontSize: 16,
        fontWeight:'500'
    },
    text: {
        color:'white',
        transform: [{ translateY: -30 }],
        fontSize:36,
        fontFamily: 'BalooDa2-ExtraBold',
        fontWeight: '400'
    },
    lets :{
        color:'white',
        transform: [{ translateY: -30 }],
        fontSize:16,
        fontFamily:'NotoSansKR-Medium'
    },
    buttoncontainer :{
        transform: [{ translateY: 20 }],

    },
    naverButton: {
        marginBottom: 20,
        width: 300,
        height: 42,
        backgroundColor: '#03C75A', // 버튼 배경색
        borderRadius: 10, // 아래쪽 모서리가 둥근 사각형
        // alignItems: 'flex-start', // 버튼 안의 내용을 왼쪽 정렬
        position:'relative',
        
        
    },
    naverLogo :{
        width: 30,
        height: 30,
        marginLeft: 10,
        position: 'absolute',
        left:0
    },
    kakaoButton : {
        backgroundColor:"#FEE500",
        marginBottom : 20,
        width: 300,
        height: 42,
        borderRadius: 7,
    },
    AppleButton :{
        backgroundColor:"#fff",
        marginBottom : 20,
        width: 300,
        height: 42,
        borderRadius: 7,
        color:"#000"
    },
    appleLogo :{
        width: 35,
        height: 35,
        marginLeft: 30,
    }

});
