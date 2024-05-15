import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import TempGopChang from '../assets/images/gopchang.jpeg';
// auth
import { useAuth } from '../contexts/AuthContext.js';

// api
import ApiUtil from '../api/ApiUtil';
import ApiConfig from '../api/ApiConfig';

// style
import {layouts, styles} from './style/styles.js'

//images
import marker from '../assets/images/free-icon-font-marker.png'
import megaphone from '../assets/images/free-icon-font-megaphone.png'
import users from '../assets/images/free-icon-font-users.png'
import camera from '../assets/images/free-icon-font-video-camera-alt.png'

function HostPlaceDetail(detail){
    // const navigation = useNavigation();
    const [clientWidth, setClientWidth] = useState(0)
    const [clientHeight, setClientHeight] = useState(0)

    const route = useRoute();
    const { 
        event_title, imageLink, event_place,
        event_date, event_day, event_time,
        count, total, id
    } = route.params
    
    useEffect(()=>{
        // 현재 창의 너비와 높이 가져오기
        const clientWidth = Dimensions.get('window').width;
        const clientHeight = Dimensions.get('window').height;

        setClientWidth(clientWidth)
        setClientHeight(clientHeight)
    })

    return (
        <ScrollView
            scrollEnabled={true}
            style={[layouts.container, styles.mb20]}
        >
            <View style={[styles.w100, {height: 267}, styles.mb80]}>
                <View style={[layouts.imageContainer, styles.w100, self.banner, styles.banner]}>
                    <Image source={TempGopChang} style={[styles.w100]}/>
                </View>
                <View style={[self.bannerTitle, {left: clientWidth / 2, top: 214, transform: [{translateX: -167.5}]}]}>
                    <Text style={[styles.commonFont,{fontSize: 25}]}>{event_title}</Text>
                    <Text> </Text>
                </View>

            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, layouts.horizontal, layouts.spaceBetween]}>
                <Text style={[self.textInfo, {color: '#000'}]}>벨지움 재즈 카페</Text>
                <Text style={[self.textInfo, {fontSize: 21}]}>02-123-4567</Text>
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb60, layouts.horizontal, layouts.spaceBetween]}>
                <Text style={[self.textInfo, {color: '#000'}]}>4.3(금) | 18:30</Text>
                <Text style={[self.textInfo]}>서초동</Text>
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20]}>
                <Text style={[self.textInfo, {color: '#000'}]}>젊은 커플 고객이 많은 감성 맥주집입니다. 사랑하는 사람과 함께 분위기 있는 스포츠 관람을 원하는 분들을 초청해요!</Text>
            </View>

            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20, layouts.horizontal]}>
                <Image source={users} />
                <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>모집인원 : 13 / 15</Text>
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20, layouts.horizontal]}>
                <Image source={megaphone} />
                <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>연령대 : 20~30세</Text>
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20, layouts.horizontal]}>
                <Image source={camera} />
                <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>160인치</Text>
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20, layouts.horizontal]}>
                <Image source={marker} />
                <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>서울시 반포대로 1길 11</Text>
            </View>
            <TouchableOpacity style={[styles.pl15, styles.pr15, styles.mb20]} onPress={()=>{}}>
                <Text style={[styles.p5, self.hostButton]}>신청하기</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const self = StyleSheet.create({
    banner: {
        height: 267,
        position: 'relative',
    },
    bannerTitle : {
        position: 'absolute',
        width: 335,
        height: 106,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
    },
    textInfo: {
        fontSize: 19,
        fontWeight: 600,
    },
    textDetailInfo: {
        fontSize: 17,
        color: '#000',
    },
    hostButton: {
        backgroundColor: '#01162D',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 20,
        paddingBottom: 12,
        paddingTop: 12,
        fontSize: 18
    }

    
})

export default HostPlaceDetail;