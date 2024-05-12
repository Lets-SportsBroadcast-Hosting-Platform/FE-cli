import { StyleSheet, Text, View, Image,TouchableOpacity, Dimensions } from "react-native";
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

function HostPlaceDetail(){
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
        <View style={[layouts.container, styles.mb20]}>
            <View style={[styles.w100, {height: 267}, styles.mb80]}>
                <View style={[layouts.imageContainer, styles.w100, self.banner, styles.banner]}>
                    <Image source={TempGopChang} style={[styles.w100]}/>
                </View>
                <View style={[self.bannerTitle, {left: clientWidth / 2, top: 214, transform: [{translateX: -167.5}]}]}>
                    <Text style={[styles.commonFont, {fontSize: 25}]}>{event_title}</Text>
                    <Text> </Text>
                </View>

            </View>
            <View style={[styles.p10, layouts.horizontal]}>
                <Text style={[styles.commonFont]}>벨지움 재즈 카페</Text>
                <Text style={[styles.commonFont]}>02-123-4567</Text>
            </View>
        </View>
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

    
})

export default HostPlaceDetail;