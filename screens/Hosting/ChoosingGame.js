import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList } from 'react-native';
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

    useEffect(()=>{
        ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports`, {
            params: {
                upperCategoryId: 'kfootball',
                categoryId : 'kleague',
                count: 10,
            }
        }).then(res=>{
            console.log(res)
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
                {/* <Text style={styles.headerText}>사업자등록번호 인증</Text> */}
            </View>
            {/* <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                scrollIndicatorInsets={{ right: 1 }}
            /> */}
            
            

        </View>
    );
}

const self = StyleSheet.create({
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
    
});
