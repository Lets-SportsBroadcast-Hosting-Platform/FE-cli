// 이용약관동의
import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Linking, Switch} from 'react-native';
import arrowToLeft from '../assets/images/arrowToLeft.png';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Toggle from '../components/toggle.js';


export default function TermsOfService() {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false)
    
    const arrowbuttonPress = () => {
        navigation.navigate('ChooseUser');
        console.log("arrowbuttonPressed");
    };
    
    
    
    return (
    <View style={styles.container}>

        <View style={styles.header}>
            <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
            <Image source={arrowToLeft} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>이용약관 동의</Text>
        </View>

        <View style={styles.linkContainer}>
        {/* <OpenURLButton url={serviceUseURL}>Service Use URL</OpenURLButton> */}
        <Text style={{fontWeight: 'bold', width: '100%', color: 'black',textDecorationLine: 'underline', textAlign:'center' }}
            onPress={() => Linking.openURL('http://google.com')}>
            서비스 이용약관
        </Text>
        <Text style={{fontWeight: 'bold', width: '100%', color: 'black',textDecorationLine: 'underline', paddingTop:35, textAlign:'center'}}
            onPress={() => Linking.openURL('http://google.com')}>
            개인정보 처리 동의
        </Text>
        </View>

        <View style={styles.toogleContainer}>
            <Text style={{fontSize: 15, color: '#000', marginRight: 20,fontFamily:'BlackHanSans-Regular',fontWeight:'800'}}> 알림 </Text>
            
        </View>
        <Toggle
            isOn={isChecked}
            onToggle={(value)=>{}}
        ></Toggle>
        <Text style={styles.explainText}>호스팅이나 예약이 취소된 경우 알림 드립니다</Text>
        <Button mode="contained"  style={styles.typeButton}>
        동의
        </Button>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        // paddingVertical: 30,
        // paddingHorizontal: 10
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
        position: 'relative',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color:'black',
        fontFamily:'BlackHanSans-Regular',
        fontWeight:'200'
    },
    touchable: {
        alignItems: 'center',
        position: 'absolute',
        top: '50%', left: 0,
        transform: [{translateY: 13.1}, {translateX: 20}]
    },
    arrowIcon: {
        width: 20,
        height: 20,
        // 이미지와 텍스트 사이의 간격 조정
    },
    linkContainer :{
        width: '100%',
        marginTop:50,
        alignContent:'center',
    },
    toogleContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 100,
        alignItems: 'center',
        width: '100%',
    },
    explainText :{
        fontSize:15,
        color:'#666',
        lineHeight:17.54
    },
    typeButton: {
        width: '80%',
        height:41,
        borderRadius: 20,
        marginTop: 15,
        backgroundColor:'#01162D',
        fontFamily:'BlackHanSans-Regular',
        fontSize:15,
        marginTop:50
    },
});
