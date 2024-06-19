import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput } from 'react-native';
import arrowToLeft from '../../assets/images/arrowToLeft.png';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
// auth
import { useAuth } from '../../contexts/AuthContext.js';

export default function MyPlaceEdit() {
    const navigation = useNavigation();
    const route = useRoute();
    const selectedStore = route.params?.selectedStore;
    const arrowbuttonPress = () => {
        navigation.navigate('MyHome')
        // MyHome
        // console.log(selectedStore);
    };


//가게 이름을 입력하세요
    const [store, setStore] = React.useState('');
    const onChangeText = (inputText) => {
        setStore(inputText);
    };
//가게 연락처를 입력하세요
    const [phone, setPhone] = React.useState('');
    const onChangePhoneNumber  = (inputPhoneNumber) =>{
        setPhone(inputPhoneNumber);
    };
//주소를 입력010
    const [storeAddress, setStoreAddress] = React.useState('');
    const onChangeStoreAddress = (inputStoreAddress) =>{
        setStoreAddress(inputStoreAddress);
    };
    const goToHostBusinessRegisNumber=(title)=>{
        navigation.navigate('HostBusinessRegisNumber',{'title':title});
        
    }
    const MyStoreEdit = ()=> {
        navigation.navigate('MyHome');
    }
    // const checkRoadAddress= ()=> {
    //     console.log("가게 주소 입력하세요");
    // }
    function checkRoadAddress(text){
    
        const params = {}
        ApiUtil.get(`${ApiConfig.SERVER_URL}/store/search?keyword=${text}&provider=other`, params)
        .then((res)=>{
            // console.log(res)
            if (res === 1) {
                // Success toast
                Toast.show({
                type: 'success',
                text1: '성공했습니다!',
            });
            } else {
            // Error toast
            Toast.show({
                type: 'error',
                text1: '존재하지 않는 주소입니다.',
            });
            }
            })
            .catch((error)=>console.log(error))
    }
    const {getStoreInfo, getUserToken, isAdmin} = useAuth();
    useEffect(()=>{
        getStoreInfo().then((info)=>{
            console.log(info)
            setStoreInfo(info)
        })
    },[])
    return (
        <View style={styles.container}>
        
        <View style={styles.header}>
            <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
            <Image source={arrowToLeft} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>가게 정보 수정</Text>
            
        </View>
        <View style={styles.contentContainer}>

            <Text style={styles.InputTitle}>가게 이름</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='벨지움재즈카페'
                    value={store}
                    onChangeText={onChangeText}
                    style={styles.storeInputText}
                    mode='outlined'
                />
            </View>

            <Text style={styles.InputTitle}>가게 연락처</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='010-1234-5678'
                    value={phone}
                    onChangeText={onChangePhoneNumber}
                    keyboardType='phone-pad'
                    style={styles.storeInputText}
                    mode='outlined'
                />
            </View>


            <Text style={styles.InputTitle}>가게 주소</Text>

                <View style={styles.textInputContainer} >
                {/* onPress={() => navigation.navigate('EditStoreAddress')} */}
                <TouchableOpacity  style={styles.textInputContainer}>
                    <TextInput
                        placeholder='가게 주소를 입력해주세요.'
                        value={storeAddress}
                        onChangeText={onChangeStoreAddress}
                        style={styles.storeInputText2}
                        mode='outlined'
                    />
                    <Button  mode="contained" onPress={checkRoadAddress} style={styles.FindAddressButton2}>
                    <Text style={{fontSize:12, lineHeight:25.5}}>check</Text>
                    </Button>
                {/* <TextInput
                    placeholder='가게 주소를 입력해주세요.'
                    style={styles.storeAddressInputText}
                    mode='outlined'
                    editable={false}
                    value={selectedStore?.road_address_name}
                /> */}
                </TouchableOpacity>
                </View>
        <Button  mode="contained" onPress={MyStoreEdit} style={styles.FindAddressButton}>
        <Text style={styles.nextText}>수정 완료</Text>
        </Button>
        
        </View>
          {/* <TouchableOpacity onPress={()=>{console.log("회원탈퇴!!")}}>
            <Text style={styles.withdrawalText}>회원탈퇴</Text>
          </TouchableOpacity>    */}
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
        backgroundColor:'#fff'
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
        // backgroundColor:'red'
    },
    textInputContainer: {
        width: '100%',
        // height:41.24,
        // justifyContent: 'center',
        borderRadius: 10,
        borderBottomWidth: 0,
        // backgroundColor:'red',
        flexDirection: 'row',
        marginBottom:25
    },
    storeInputText :{
        width: '100%',
        backgroundColor: '#fff',
        borderRadius:10,
        paddingLeft:14,
        borderWidth: 1, // Border width
        borderColor: '#C5C5C7', // Border color
        elevation: 3, 
        color:'#B7B7B7'
    },
    storeInputText2 :{
        width: '80%',
        backgroundColor: '#fff',
        borderRadius:10,
        paddingLeft:14,
        borderWidth: 1, // Border width
        borderColor: '#C5C5C7', // Border color
        elevation: 3, 
        color:'#B7B7B7'
    },
    InputTitle :{
        color:'black',
        fontFamily:'NotoSansKR-Medium',
        fontSize:16,
    },
    storeAddressInputText :{
        backgroundColor:'#eee',
        borderRadius:10,
        paddingLeft:14,
        width:'100%',
        color:'#B7B7B7'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalInput: {
    marginBottom: 10,
    },
    FindAddressButton :{
        height:50,
        backgroundColor:'#B7B7B7',
        marginTop:40,
        borderRadius: 10,
    },
    FindAddressButton2 :{
        // height:50,
        backgroundColor:'#B7B7B7',
        // marginTop:40,
        borderRadius: 10,
        marginLeft:3,
        borderWidth: 1, // Border width
        borderColor: '#C5C5C7', // Border color
        elevation: 3, 

    },
    withdrawalText:{
        color:'#C5C5C7',
        fontFamily:'NotoSansKR-Medium',
        alignItems:'center',
        fontSize:12,
        marginBottom:45,
        textDecorationLine: 'underline'
    },
    nextText :{
      color:'#fff',
      fontFamily:'NotoSansKR-Medium',
      alignItems:'center',
      fontSize:15,
      lineHeight:25.5,
      borderRadius: 4,
  }
    });
