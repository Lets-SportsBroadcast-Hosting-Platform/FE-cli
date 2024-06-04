import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList, Button, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import arrowToLeft from '../../assets/images/arrowToLeft.png';
import { useEffect } from 'react';
import ApiUtil from '../../api/ApiUtil';
import ApiConfig from '../../api/ApiConfig';
// import arrowRight from '../assets/images/arrow-right.png';


export default function HostPlaceList() {
    const navigation = useNavigation();
    const route = useRoute()
    const goBackPage = (item)=>{
        navigation.navigate('PlaceList')
    }

    function SportsSchedule(){
        // ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports?upperCategoryId=${upperCategoryId}&categoryId=${categoryId}&count=${count}`, {
        ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports?upperCategoryId=kbaseball&categoryId=kbo&count=1`, {
        //     params: {
        //     upperCategoryId: kbaseball,
        //     categoryId: kbo,
        //     count:1
        // }
    })
    .then((res)=>{
        // const stores = res.stores ?? [];
        // console.log(stores);
        // console.log(stores[0]);
        // console.log(stores.length);//항상 5구나 아님 0
        // setStoreInfoList(stores)
        console.log(res)
    })
    .catch((error)=>console.log(error.config))
    }
    
    
    useEffect(()=>{
        ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports?upperCategoryId=kbaseball&categoryId=kbo&count=1`).then(res=>{
            // const party = JSON.parse(JSON.stringify(res))
            console.log(res)
            // const dayArray = ['월', '화', '수', '목', '금', '토', '일']
            // const hostingDateInfo = new Date(party.hosting_date)
            // const hostMonth = hostingDateInfo.getMonth() + 1
            // const hostDate = hostingDateInfo.getDate()
            // const hostDay = hostingDateInfo.getDay()
            // const hostHHMI = `${hostingDateInfo.getHours()}:${hostingDateInfo.getMinutes()}`
            // const hostDayNm = dayArray[hostDay]
            
            // party.imageLink = {uri: `${party.store_image_url}0`},
            // party.imageLink = {uri: `${party.store_image_url}0`},
            // console.log(party.imageLink)
            // party.hostDateNm = `${hostMonth}.${hostDate}`, hostHHMI, hostDayNm
            // party.hostHHMI = hostHHMI
            // party.hostDayNm = hostDayNm
            // setPartyInfo({
            //     ...party
            // })
        })
    }, [])

    // const ListItem = ({ 
    //     event_title, imageLink, event_place,
    //     event_date, event_day, event_time,
    //     count, total, id
    //     }) => (
    //     <TouchableOpacity onPress={()=>onClickItem({ 
    //         event_title, imageLink, event_place,
    //         event_date, event_day, event_time,
    //         count, total, id
    //         })} style={styles.placeItem}>
    //         <View style={styles.imageContainer}>
    //             <Image source={imageLink} style={styles.placeImage}/>
    //         </View>
    //         <Text style={styles.placeTitle}>{event_title}</Text>

    //         <View style={styles.placeDetail}>
    //             <Text>{event_place} | {event_date}({event_day}) | {event_time}</Text>

    //             <View style={{flexDirection: 'row'}}>

    //                 <Text>
    //                     {count} / {total}
                        
    //                 </Text>
    //                 <Image style={styles.userImage} source={UserImage}></Image>
    //             </View>
    //         </View>
    //     </TouchableOpacity>
    // );

    // const renderItem = ({ item }) => (
    //     <ListItem
    //         id={item.id}
    //         style={styles.itemScrollContainer}
    //         event_title={item.event_title}
    //         event_place={item.event_place}
    //         event_date={item.event_date}
    //         event_day={item.event_day}
    //         event_time={item.event_time}
    //         imageLink={item.imageLink}
    //         count={item.count}
    //         total={item.total}

    //     />
    // );

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
