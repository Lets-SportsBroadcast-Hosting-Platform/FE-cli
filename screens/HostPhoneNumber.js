//사업자등록 번호 입력하는 페이지
import React,{useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput } from 'react-native';
import arrowToLeft from '../assets/images/arrowToLeft.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Toast
import Toast from 'react-native-toast-message';

// api
import ApiUtil from '../api/ApiUtil';
import ApiConfig from '../api/ApiConfig';

export default function HostPhoneNumber() {
    // 타이머
    const [time, setTime] = useState(180); // 초기 시간을 3분(180초)으로 설정
    const timerRef = useRef(null); // 타이머 ID를 저장할 레퍼런스

    useEffect(() => {
        // 타이머가 0에 도달하면 타이머를 정리합니다.
        if (time === 0) {
          clearInterval(timerRef.current);
          if(setAuthStepId !== 0){
              setAuthStepId(0)
              setAuthNumber('')
          }
        }
      }, [time]);
    
    // 타이머 시작 및 초기화 함수
    const startTimer = () => {
        // 기존 타이머가 있으면 정리
        if (timerRef.current) {
        clearInterval(timerRef.current);
        }
        
        setTime(180); // 초기 시간으로 재설정
    
        // 1초마다 시간 감소
        timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
        }, 1000);
    };
    
    // 시간을 MM:SS 형식으로 포맷팅하는 함수
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const navigation = useNavigation();
    const route = useRoute()
    const params = route.params;
    const arrowbuttonPress = () => {
        navigation.goBack();
    };
    const [authId, setAuthId] = useState(null)
    const [isDisable, setIsDisable] = useState(true);
    const [authStepId, setAuthStepId] = useState(0);

    const getAuthNumber = ()=>{
        const numberWithOutDash = number.trim().replaceAll('-', '')
        ApiUtil.post(`${ApiConfig.SERVER_URL}/login/send-number?phone_number=${numberWithOutDash}`).then((res)=>{
            Toast.show(({
                type: 'success',
                text1: `인증번호를 보냈습니다.`,
            }))
            setAuthId(res.id)
            setAuthStepId(1)
            startTimer();
        })
    }

    const AuthenticateButton = async () => {
        const storageToken = await AsyncStorage.getItem('jwtToken')
        const numberWithOutDash = number.trim().replaceAll('-', '')
        
        ApiUtil.post(`${ApiConfig.SERVER_URL}/login/check-number?id=${authId}&certification_number=${authNumber}&phone_number=${number}`, {}, {
            headers: {
                jwToken: storageToken
            }
        }).then((res)=>{
            if(res === '인증완료'){
                setAuthStepId(2)
                Toast.show(({
                    type: 'success',
                    text1: `인증이 완료되었습니다.`,
                }))
                setIsDisable(false)
            } else {
                Toast.show(({
                    type: 'error',
                    text1: `인증번호를 다시 확인해주세요.`,
                }))
                setIsDisable(true)
            }
        })

    }

    const [number, setNumber] = React.useState('');
    const [authNumber, setAuthNumber] = React.useState('');
    const formatPhoneNumber = (value) => {
        const cleaned = ('' + value).replace(/\D/g, '');

        // 숫자가 없으면 빈 문자열 반환
        if (cleaned.length === 0) return '';
    
        // 부분별로 추출하여 포맷팅
        const match = cleaned.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);
        if (match) {
          const part1 = match[1] ? match[1] : '';
          const part2 = match[2] ? '-' + match[2] : '';
          const part3 = match[3] ? '-' + match[3] : '';
          return `${part1}${part2}${part3}`;
        }
        return value;
    }
    
    const onChangeNumber = (inputNumber) => {
        const formattedNumber = formatPhoneNumber(inputNumber)
        setNumber(formattedNumber)
    };

    const onChangeAuthNumber = (inputNumber) => {
        setAuthNumber(inputNumber)
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
                <Image source={arrowToLeft} style={styles.arrowIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>전화번호 인증</Text>
            </View>
            
            <View style={styles.contentContainer}>
            

                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="전화번호를 입력해주세요."
                        value={number}
                        onChangeText={onChangeNumber}
                        style={styles.regisNumberTextInput}
                        keyboardType='numeric'
                        maxLength={13}
                        mode='outlined'
                    // placeholder="사업자번호 입력 예)123-45-67890"
                    // label=""
                    />
                    <Button disabled={authStepId !== 0} mode="contained" onPress={getAuthNumber} style={[styles.sendPhoneBtn, {backgroundColor : authStepId === 0 ? '#01162D' : '#B7B7B7'}]}>
                    인증
                    </Button>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="인증번호를 입력해주세요."
                        value={authNumber}
                        onChangeText={onChangeAuthNumber}
                        style={styles.regisNumberTextInput}
                        keyboardType='numeric'
                        maxLength={5}
                        mode='outlined'
                    // placeholder="사업자번호 입력 예)123-45-67890"
                    // label=""
                    />
                    <Button disabled={authStepId !== 1} mode="contained" onPress={AuthenticateButton} style={[styles.sendPhoneBtn, {backgroundColor : authStepId === 1 ? '#01162D' : '#B7B7B7'}]}>
                    확인
                    </Button>
                </View>
                <View style={{justifyContent: 'center', marginTop: 25, marginBottom: 25}}>
                    
                    
                    {authStepId === 1 && <Text style={{color: 'blue'}}>인증 유효시간 [{formatTime(time)}]</Text>}
                    {authStepId === 2 && <Text>인증에 성공했습니다.</Text>}
                </View>

                {/* 인증 완료되면 활성화 */}
                <Button mode="contained" disabled={isDisable} onPress={() => {
                    if(params.type === 'host'){
                        navigation.navigate('HostAuthentication', {...params})
                    } else if(params.type === 'user'){
                        navigation.navigate('SelectUserLocation', {...params})
                    }
                }} style={styles.HostBusinessNumberButton}>
                다음
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        position: 'relative'
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
    contentContainer: {
        flex: 1,
        width: '100%',
        marginTop: 57,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    textInputContainer: {
        width: '100%',
        // justifyContent: 'center',
        borderRadius: 10,
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    regisNumberTextInput: {
        width: '70%',
        backgroundColor: '#fff',
        borderRadius:10,
        paddingLeft:14,
        borderWidth: 1, // Border width
        borderColor: '#C5C5C7', // Border color
        elevation: 3, 
        color:'#B7B7B7',
        marginTop:10,
        marginBottom:10
    },
    HostBusinessNumberButton: {
        width: '100%',
        borderRadius: 15,
        marginTop: 15,
        padding: 2,
        // backgroundColor:'#01162D',
        backgroundColor:'#B7B7B7',
    },

    sendPhoneBtn : {
        width: '20%',
        height: 50, lineHeight: 50,
        marginTop:10,
        marginBottom:10,
    }
});
