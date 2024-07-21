//사업자등록 번호 입력하는 페이지
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput } from 'react-native';
import arrowToLeft from '../assets/images/arrowToLeft.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

// Toast
import Toast from 'react-native-toast-message';

// api
import ApiUtil from '../api/ApiUtil';
import ApiConfig from '../api/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HostBusinessRegisNumber() {
    const navigation = useNavigation();
    const route = useRoute()
    const params = route.params;
    const arrowbuttonPress = () => {
        navigation.goBack();
    };
    const [isDisable, setIsDisable] = useState(true);
    const [authSuccessNo, setAuthSuccessNo] = useState('');

    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('사업자번호 등록일을 입력해주세요.')
    const [show, setShow] = useState(false);

    const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

        console.log(currentDate)
        setShow(Platform.OS === 'ios'); // iOS의 경우, DatePicker를 계속 보여줍니다.
        setDate(currentDate)
        setFormattedDate(formatDate(currentDate, '/'))
    }

    const formatDate = (date, separator='') => {
        if(date === null) return ''

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}${separator}${month}${separator}${day}`;
    };

    const AuthenticateButton = async () => {
        console.log("인증 버튼 Pressed")
        checkNumber(number)
        // console.log(number)
    }
    async function checkNumber(number){
        const storageToken = await AsyncStorage.getItem('jwtToken')
        const start_dt = formatDate(date, '')
        ApiUtil.get(`${ApiConfig.SERVER_URL}/store/business_num?business_no=${number}&start_dt=${start_dt}`,{
            headers: {
                jwToken: storageToken
            }
        }).then((res)=>{
        const businessNo = res.result ?? ''
        const type = res.type ?? ''
        const detail = res.detail ?? ''
        console.log(res )

        // console.log(result)
        // console.log(type)
        // console.log(detail)

        if (detail == '400') {
            //다음 버튼 비활성화
            console.log("존재하지 않는 사업번호")
        }
        else if (type=="계속사업자") {
            //다음 버튼 활성화
            Toast.show(({
                type: 'success',
                text1: '인증 성공',
                text2: '사업자번호가 인증되었습니다.'
            }))
            setIsDisable(false)
            console.log(number)
            setAuthSuccessNo(number)
        }
        else {
            //다음 버튼 비활성화
            console.log("유효하지 않은 사업자번호")
        }


        }).catch((error)=>console.log(error.config))
        }






    //TextInput
    const [text, setText] = React.useState('');
    const onChangeText = (inputText) => {
        // setText(inputText);
        console.log(inputText);
        
    };

    //사업자등록번호
    const [number, setNumber] = React.useState('');
    const formatBusinessNumber = (value) => {
        const numbers = value.replace(/\D/g, '');

        // 4자리부터 6자리까지는 '000-0' 부터 '000-00'로 변환
        if (numbers.length <= 6) {
            return numbers.replace(/(\d{3})(\d{1,2})/, '$1-$2');
        }
        
        // 7자리부터는 '000-00-0'부터 '000-00-00000'로 변환
        return numbers.replace(/(\d{3})(\d{2})(\d{0,5})/, '$1-$2-$3');
    };
    const onChangeNumber = (inputNumber) => {
        const formattedNumber = formatBusinessNumber(inputNumber)
        setNumber(formattedNumber)
    };

    useEffect(()=>{
        if(!isDisable){
            setIsDisable(true)
        } else if(authSuccessNo !== '' && number === authSuccessNo){
            setIsDisable(false)
        }
    }, [number])

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
            <Image source={arrowToLeft} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>사업자등록번호 인증</Text>
        </View>
        
        <View style={styles.contentContainer}>
            {/* 클릭하면 다시 전 페이지로 가서 가게 이름 다시 찾기 */}
            <View style={styles.textInputContainer}>

                <TextInput
                value={params?.place_name ?? '레츠'}
                readOnly
                onChangeText={onChangeText}
                style={styles.storeAddressInputText}
                // mode='outlined'
                // mode="outlined" // TextInput을 읽기 전용 모드로 변경
                // editable={false} // TextInput을 비활성화
                
                />
               
                {
                    show && 
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                }
            </View>
            <TouchableOpacity onPress={()=>{setShow(true)}} style={{width: '100%'}}>
                <TextInput
                    editable={false}
                    value={formattedDate}
                    style={styles.regisNumberTextInput2}
                    mode='outlined'
                />
            </TouchableOpacity>

            {/* 스타일 수정, 다른 곳 클릭하면 키보드 다시 내려가기, 입력시 라벡 보이지 않게 */}
            <View style={styles.textInputContainer}>
            <TextInput
                placeholder="사업자번호 입력 예)123-45-67890"
                value={number}
                onChangeText={onChangeNumber}
                style={styles.regisNumberTextInput}
                keyboardType='numeric'
                maxLength={12}
                mode='outlined'
            // placeholder="사업자번호 입력 예)123-45-67890"
            // label=""
            />
            </View>
            
            {/* 사업자번호 형식 만족하면 활성화 */}
            <Button mode="contained" onPress={AuthenticateButton} style={styles.HostBusinessNumberButton}>
            인증
            </Button>

            {/* 인증 완료되면 활성화 */}
            <Button mode="contained" disabled={isDisable} onPress={() => navigation.navigate('TermsOfService', {
                business_no: parseInt(number.replaceAll('-', '')),
                ...params
            })} style={styles.HostBusinessNumberButton}>
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
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center'
    },
    textInputContainer: {
        width: '100%',
        // justifyContent: 'center',
        borderRadius: 10,
        borderBottomWidth: 0,
        // backgroundColor:'red',
        flexDirection: 'row'
    },
    storeInputText :{
        
        borderRadius:5,
        marginBottom:30,
        backgroundColor: '#ddd',
    },
    regisNumberTextInput: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius:10,
        paddingLeft:14,
        borderWidth: 1, // Border width
        borderColor: '#C5C5C7', // Border color
        elevation: 3, 
        color:'#B7B7B7',
        marginTop:22,
        marginBottom:47
    },
    regisNumberTextInput2: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius:10,
        paddingLeft:14,
        borderWidth: 1, // Border width
        borderColor: '#C5C5C7', // Border color
        elevation: 3, 
        color:'#B7B7B7',
        marginTop:47,
    },
    HostBusinessNumberButton: {
        width: '100%',
        borderRadius: 15,
        marginTop: 15,
        padding: 2,
        // backgroundColor:'#01162D',
        backgroundColor:'#B7B7B7',
    },
    storeAddressInputText :{
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius:10,
        paddingLeft:16
    },
});
