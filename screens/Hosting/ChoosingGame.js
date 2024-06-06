import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList, Button, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import arrowToLeft from '../../assets/images/arrowToLeft.png';
import React,{useState,useEffect } from 'react';
import ApiUtil from '../../api/ApiUtil';
import ApiConfig from '../../api/ApiConfig';
// import arrowRight from '../assets/images/arrow-right.png';


export default function HostPlaceList() {
    const navigation = useNavigation();
    const route = useRoute()
    const goBackPage = (item)=>{
        navigation.navigate('PlaceList')
    }

    const [selectedButton, setSelectedButton] = useState('KBO');
    

    const [upperCategoryId, setUpperCategoryId] = React.useState('kbaseball');
    const [categoryId ,setCategoryId ] = React.useState('kbo');
    const [count, setCount] = useState(1);

    function SportsSchedule(){
        // ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports?upperCategoryId=${upperCategoryId}&categoryId=${categoryId}&count=${count}`, {
        ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports`, {
        // ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports?upperCategoryId=kbaseball&categoryId=kbo&count=1`, {
            params: {
            upperCategoryId: upperCategoryId,
            categoryId: categoryId,
            count:count
        }
    })
    .then((res)=>{

        console.log(res)
    })
    .catch((error)=>console.log(error.config))
    }
    
    
    useEffect(()=>{
        ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports?upperCategoryId=${upperCategoryId}&categoryId=${categoryId}&count=${count}`).then(res=>{
            console.log(res)
            
        })
    }, [])

    
    return (
        <View style={self.container}>

            <View style={self.header}>
                <TouchableOpacity onPress={goBackPage} style={self.touchable}>
                <Image style={self.arrowIcon} source={arrowToLeft}  />
                </TouchableOpacity>
                <Text style={self.headerText}>4월</Text>
            </View>
            
            <View style={self.tabButtonContainer}>
                <TouchableOpacity
                    style={self.button}
                    onPress={() => {console.log("KBO")}}>
                    <Text style={self.buttonText}>KBO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={self.button}
                    onPress={() => navigation.navigate('Message')}>
                    <Text style={self.buttonText}>해외축구</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={self.button}
                    onPress={() => navigation.navigate('Contact')}>
                    <Text style={self.buttonText}>E-스포츠</Text>
                </TouchableOpacity>
            </View>
            

            <View style={self.dailySportsContainer}>
            <View style = {self.titleDate}>
                <Text>3일 (수)</Text>
                
            </View>
            </View>
            

        </View>
    );
}

const self = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
    arrowIcon: {
        width: 20,
        height: 20,
        // 이미지와 텍스트 사이의 간격 조정
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
    button: {
        backgroundColor: '#fff', // 버튼 배경색상 추가
        paddingVertical: 5,
        // paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        alignContent:'center',
        height:'8%',
    },
    buttonText: {
    color: '#C5C5C7', // 버튼 글자색상 추가
    fontSize: 18,
    fontWeight: '700',

    },
    tabButtonContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        // backgroundColor:'red',
        width:'100%',
        // height:'8%',
        padding:[0, 10],
        // height:100
    }
});
