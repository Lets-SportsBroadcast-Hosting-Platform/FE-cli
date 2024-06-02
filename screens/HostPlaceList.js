import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList } from 'react-native';
import arrowToLeft from '../assets/images/location.png';
import arrowRight from '../assets/images/arrow-right.png';
import TempGopChang from '../assets/images/gopchang.jpeg';
import UserImage from '../assets/images/user.png'
import { useEffect, useState } from 'react';
import ApiConfig from '../api/ApiConfig';
import ApiUtil from '../api/ApiUtil';

export default function HostPlaceList({navigation}) {
    const onClickLocationChange = () => {
        Alert.alert(
          '내 위치',
          '현재 위치로 새로고침하시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '확인',
              onPress: () => {
                // 확인 버튼을 눌렀을 때 실행할 작업을 여기에 추가하세요
                console.log('확인 버튼이 눌렸습니다.');
              },
            },
          ],
          { cancelable: false }
        );
    }

    const onClickItem = (item)=>{
        navigation.navigate('HostPlaceDetail', {...item})
    }

    const onClickHostBtn = ()=>{
        navigation.navigate('ChoosingGame')
    }

    const [hostPlaceList, setHostPlaceList] = useState([]);
    useEffect(()=>{
        ApiUtil.get(`${ApiConfig.SERVER_URL}/mainpage/party`).then((res)=>{
            const placeList = res.map(place=>{
                // "hosting_id": 3,
                // "hosting_name": "test",
                // "business_no": 4294967295,
                // "introduce": "test",
                // "current_personnel": 10,
                // "max_personnel": 15,
                // "age_group_min": 20,
                // "age_group_max": 30,
                // "hosting_date": "2024-05-29T14:30:00"
                const dayArray = ['월', '화', '수', '목', '금', '토', '일']
                const hostingDateInfo = new Date(place.hosting_date)
                const hostMonth = hostingDateInfo.getMonth() + 1
                const hostDate = hostingDateInfo.getDate()
                const hostDay = hostingDateInfo.getDay()
                const hostHHMI = `${hostingDateInfo.getHours()}:${hostingDateInfo.getMinutes()}`
                const hostDayNm = dayArray[hostDay]

                // const hosting_id = place.hosting_id
                // const hosting_name = place.hosting_name
                // const bussiness_no = place.bussiness_no
                // const introduce = place.introduce
                // const current_personnel = place.
                
                return {
                id: place.hosting_id,
                // imageLink: {uri: `${ApiConfig.IMAGE_SERVER_URL}/${place.bussiness_no}/0`},
                // imageLink: { uri: `https://s3.ap-northeast-2.amazonaws.com/letsapp.store/3288801996/1`},
                imageLink: { uri: `https://s3.ap-northeast-2.amazonaws.com/letsapp.store/1234/0`},
                
                event_title: place.hosting_name,
                event_place: '서초동',
                event_date: `${hostMonth}.${hostDate}`,
                event_day: hostDayNm,
                event_time: hostHHMI,
                total: place.max_personnel,
                count: place.current_personnel,
                introduce: place.introduce,
                age_group_max: place.age_group_max,
                age_group_min: place.age_group_min,
                max_personnel: place.max_personnel,
            }})

            setHostPlaceList(placeList)  
        })
    }, [])

    const ListItem = ({ 
        event_title, imageLink, event_place,
        event_date, event_day, event_time,
        count, total, id, introduce,
        age_group_max, age_group_min, max_personnel
        }) => (
        <TouchableOpacity onPress={()=>onClickItem({ 
            event_title, imageLink, event_place,
            event_date, event_day, event_time,
            count, total, id, introduce,
            age_group_max, age_group_min, max_personnel
            })} style={styles.placeItem}>
            <View style={styles.imageContainer}>
                <Image source={imageLink} style={styles.placeImage}/>
            </View>
            <Text style={styles.placeTitle}>{event_title}</Text>

            <View style={styles.placeDetail}>
                <Text>{event_place} | {event_date}({event_day}) | {event_time}</Text>

                <View style={{flexDirection: 'row'}}>

                    <Text>
                        {count} / {total}
                        
                    </Text>
                    <Image style={styles.userImage} source={UserImage}></Image>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <ListItem
            id={item.id}
            style={styles.itemScrollContainer}
            event_title={item.event_title}
            event_place={item.event_place}
            event_date={item.event_date}
            event_day={item.event_day}
            event_time={item.event_time}
            imageLink={item.imageLink}
            count={item.count}
            total={item.total}
            introduce={item.introduce}
            age_group_max={item.age_group_max}
            age_group_min={item.age_group_min}
            max_personnel={item.max_personnel}
        />
    );
      
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClickLocationChange} style={styles.touchable}>
                    <Text style={styles.headerText}>
                        서초동
                    </Text>
                    <Image source={arrowToLeft} style={styles.arrowIcon} />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={onClickHostBtn} style={styles.touchableRight}>
                    <Text style={styles.hostingText}>
                        호스팅하기
                    </Text>
                    <Image source={arrowRight} style={styles.arrowRightIcon} />
                </TouchableOpacity>
                
            </View>

            <FlatList
                data={hostPlaceList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                scrollIndicatorInsets={{ right: 1 }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
       container: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'space-around',
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 10,
        width: '100%',
        position: 'relative',
        marginBottom: 55
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color:'black',
        fontFamily:'BlackHanSans-Regular',
        fontWeight:'200'
    },
    hostingText: {
        fontWeight: '100',
        fontSize: 20,
        color: 'black',
    },

    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: '50%', left: 0,
        transform: [{translateY: 13.1}, {translateX: 20}]
    },
    touchableRight: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: '50%', right: 10,
        transform: [{translateY: 15}]
    },
    arrowIcon: {
        marginLeft: 10,
        width: 23.5,
        height: 23.5,
        // 이미지와 텍스트 사이의 간격 조정
    },
    
    

    arrowRightIcon: {
        marginLeft: 10,
        width: 20,
        height: 20,
    },

    placeItem: {
        height: 247,
        width: 335,
        borderBlockColor: 'black',
        borderWidth: 2,
        marginBottom: 50,
    },

    placeTitle: {
        marginTop: 12,
        marginLeft: 10,
        fontSize: 17,
        color:'black',
        fontFamily:'BlackHanSans-Regular',
        fontWeight: '100'
    },

    placeDetail: {
        padding: 10,
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    itemScrollContainer: {
        
    },

    imageContainer: {
        height: 162,
        width: 335,
    },

    placeImage: {
        flex: 1,
        resizeMode: ''
    },

    userImage: {
        marginLeft: 5,
        position: 'relative',
        top: 2.5,
    }
    
});
