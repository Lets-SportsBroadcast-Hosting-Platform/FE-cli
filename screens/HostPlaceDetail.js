import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
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
    const navigation = useNavigation();
    const route = useRoute();
    const { 
        event_title, imageLink, event_place,
        event_date, event_day, event_time,
        count, total, id
    } = route.params

    return (
        <View style={layouts.container}>
            <View style={[layouts.imageContainer, styles.w100, self.banner, styles.banner]}>
                <Image source={TempGopChang} style={[styles.w100]}/>
            </View>
                <View>
                    <Text style={[styles.commonFont]}>{event_title}</Text>
                </View>
        </View>
    )
}

const self = StyleSheet.create({
    banner: {
        height: 267,
    }
})

export default HostPlaceDetail;