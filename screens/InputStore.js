import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert,TextInput,Modal,Pressable } from 'react-native';
import arrowToLeft from '../assets/images/arrowToLeft.png';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';


const ModalComponent = () => {
    return (
    
    <Modal>HI</Modal>
    // <Modal isVisible={isModalVisible}>
    //     {/* Modal 내부 내용 (주소 선택 UI 등) */}
    //     <Text>Modal 내용</Text>
    //     <Button title="닫기" onPress={() => setIsModalVisible(false)} />
    // </Modal>
    );
};

export default function InputStore() {
    const navigation = useNavigation();

    const arrowbuttonPress = () => {
        navigation.navigate('ChooseUser');
        console.log("arrowbuttonPressed");
    };


//가게 이름을 입력하세요
    const [store, setStore] = React.useState('');
    const onChangeText = (inputText) => {
        setStore(inputText);
    };
//가게 연락처를 입력하세요
    const [phone, setPhone] = React.useState('');
    const onChangePhone = (inputPhoneNumber) =>{
        setPhone(inputPhoneNumber);
    };
//주소를 입력
const [modalVisible, setModalVisible] = useState(false);
    const [storeAddress, setStoreAddress] = useState('');
    return (
        <View style={styles.container}>
        
        <View style={styles.header}>
            <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
            <Image source={arrowToLeft} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>우리 가게 입력</Text>
            
        </View>
        <View style={styles.contentContainer}>

            <Text style={styles.InputTitle}>이름</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='가게 이름을 입력해주세요.'
                    value={store}
                    onChangeText={onChangeText}
                    style={styles.storeInputText}
                    mode='outlined'
                />
            </View>

            <Text style={styles.InputTitle}>연락처</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='가게 연락처를 입력해주세요.'
                    value={phone}
                    onChangePhone={onChangePhone}
                    style={styles.storeInputText}
                    mode='outlined'
                />
            </View>


            <Text style={styles.InputTitle}>주소</Text>

            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='가게 주소를 입력해주세요.'
                    style={styles.storeAddressInputText}
                    mode='outlined'
                    editable={false}
                    value={storeAddress}
                />
                </View>
            </TouchableOpacity>

            {/* {isModalVisible && <ModalComponent() />} */}
            {/* {ModalComponent()} */}
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
        <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
        </View>
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
    InputTitle :{
        color:'black',
        fontFamily:'NotoSansKR-Medium',
        fontSize:16,
    },
    storeAddressInputText :{
        backgroundColor:'#eee',
        borderRadius:10,
        paddingLeft:14,
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
    });
