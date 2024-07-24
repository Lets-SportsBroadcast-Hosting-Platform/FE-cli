import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList } from 'react-native';
import arrowToLeft from '../assets/images/location.png';
import arrowRight from '../assets/images/arrow-right.png';
import MyHomePng from '../assets/images/myhome.png';
import UserImage from '../assets/images/user.png'
import { useCallback, useEffect, useState } from 'react';
import ApiConfig from '../api/ApiConfig';
import ApiUtil from '../api/ApiUtil';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function HostPlaceList({navigation}) {
    const route = useRoute()
    const params = route.params
    const {getUserInfo} = useAuth();
    const onClickLocationChange = () => {
        Alert.alert(
          '내 위치',
          '위치를 바꾸시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '확인',
              onPress: () => {
                // 확인 버튼을 눌렀을 때 실행할 작업을 여기에 추가하세요
                navigation.navigate('SelectUserLocation', { action: 'relocate'})
              },
            },
          ],
          { cancelable: false }
        );
    }

    const goMyHome = ()=>{
        navigation.navigate('MyHome')
    }

    const onClickItem = (item)=>{
        navigation.navigate('HostPlaceDetail', {...item, isNew: false})
    }

    const onClickHostBtn = ()=>{
        navigation.navigate('ChoosingGame')
    }

    const [isUser, setIsUser] = useState(false)
    const [location, setLocation] = useState('')
    const [hostPlaceList, setHostPlaceList] = useState([]);
    useFocusEffect(
        useCallback(()=>{
            getUserInfo().then(userInfo=>{
                console.log('placeList userInfo', userInfo)
                setLocation(userInfo.area)
                if(userInfo.type === 'user' || params.type === 'user') {
                    setIsUser(true)
                } else {
                    setIsUser(false)
                }
            })
            
            ApiUtil.get(`${ApiConfig.SERVER_URL}/mainpage/party`).then((res)=>{
                const placeList = res.map(place=>{
                    const dayArray = ['월', '화', '수', '목', '금', '토', '일']
                    const hostingDateInfo = new Date(place.hosting_date)
                    const hostMonth = hostingDateInfo.getMonth() + 1
                    const hostDate = hostingDateInfo.getDate()
                    const hostDay = hostingDateInfo.getDay()
                    const hostHHMI = `${hostingDateInfo.getHours()}:${hostingDateInfo.getMinutes()}`
                    const hostDayNm = dayArray[hostDay]
                    return {
                        ...place,
                        dayArray,
                        hostingDateInfo,
                        hostMonth,
                        hostDate: `${hostMonth}.${hostDate}`,
                        hostDay,
                        hostHHMI,
                        hostDayNm,
                        imageLink: {uri: `${ApiConfig.IMAGE_SERVER_URL}/${place.business_no}/${place.hosting_id}/0`},
                    }
                })
                
                setHostPlaceList(placeList)  
            })
        }, [])
    )

    const ListItem = ({ 
            hosting_id,
            hosting_name,
            hosting_place,
            hosting_date,
            hostDate,
            hostDayNm,
            hostHHMI,
            imageLink,
            introduce,
            age_group_max,
            age_group_min,
            max_personnel,
            current_personnel,
        }) => (
        <TouchableOpacity onPress={()=>onClickItem({
                hosting_id,
                hosting_name,
                hosting_place,
                hosting_date,
                hostDate,
                hostDayNm,
                hostHHMI,
                imageLink,
                introduce,
                age_group_max,
                age_group_min,
                max_personnel,
                current_personnel
            })} style={styles.placeItem}>
            <View style={styles.imageContainer}>
                <Image source={imageLink} style={styles.placeImage}/>
            </View>
            <Text style={styles.placeTitle}>{hosting_name}</Text>

            <View style={styles.placeDetail}>
                <Text>{hostDate}({hostDayNm}) | {hostHHMI}</Text>

                <View style={{flexDirection: 'row'}}>

                    <Text>
                        {current_personnel} / {max_personnel}
                        
                    </Text>
                    <Image style={styles.userImage} source={UserImage}></Image>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <ListItem
            hosting_id={item.hosting_id}
            style={styles.itemScrollContainer}
            hosting_name={item.hosting_name}
            hosting_place={item.hosting_place}
            hosting_date={item.hosting_date}
            hostDate={item.hostDate}
            hostDayNm={item.hostDayNm}
            hostHHMI={item.hostHHMI}
            imageLink={item.imageLink}
            introduce={item.introduce}
            age_group_max={item.age_group_max}
            age_group_min={item.age_group_min}
            max_personnel={item.max_personnel}
            current_personnel={item.current_personnel}
        />
    );
      
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <TouchableOpacity onPress={onClickLocationChange} style={styles.touchable}>
                    <Text style={styles.headerText}>
                        {location}
                    </Text>
                    <Image source={arrowToLeft} style={styles.arrowIcon} />
                </TouchableOpacity> */}
                
                {
                    !isUser && <TouchableOpacity onPress={onClickHostBtn} style={styles.touchableRight}>
                    <Text style={styles.hostingText}>
                        호스팅하기
                    </Text>
                    <Image source={arrowRight} style={styles.arrowRightIcon} />
                </TouchableOpacity>
                }

                {
                    isUser && <TouchableOpacity
                        style={{position: 'absolute', right: 25, top: 20}}
                        onPress={()=>{
                            Alert.alert(
                                '로그아웃',
                                '로그아웃하시겠습니까?',
                                [
                                  {
                                    text: '취소',
                                    style: 'cancel',
                                  },
                                  {
                                    text: '확인',
                                    onPress: () => {
                                        AsyncStorage.clear().then(()=>{
                                            navigation.navigate('Home')
                                        })
                                    },
                                  },
                                ],
                                { cancelable: false }
                              );
                        }}
                    >
                        <Text style={{
                                        fontSize: 20,
                                        color:'black',
                                        fontFamily:'BlackHanSans-Regular',
                                        fontWeight:'200'}}
                        >로그아웃</Text>
                    </TouchableOpacity>
                }
                
            </View>

            <FlatList
                data={hostPlaceList}
                renderItem={renderItem}
                keyExtractor={item => item.hosting_id}
                showsVerticalScrollIndicator={false}
                scrollIndicatorInsets={{ right: 1 }}
                contentContainerStyle={styles.flatListContent}
            />
            {
                !isUser && <TouchableOpacity onPress={goMyHome} style={styles.MyHomeBtn}>
                    <Image source={MyHomePng}></Image>
                </TouchableOpacity>
            }
            
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
        height: 262,
        width: 335,
        borderBlockColor: 'black',
        marginBottom: 50,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },

    placeTitle: {
        marginTop: 17,
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
        overflow: 'hidden',
        borderRadius: 10,
    },

    placeImage: {
        flex: 1,
        resizeMode: ''
    },

    userImage: {
        marginLeft: 5,
        position: 'relative',
        top: 2.5,
    },

    hr: {
        marginTop: 50,
        borderBottomColor: '#000', // 선 색상
        borderBottomWidth: 1, // 선 두께
        marginVertical: 10, // 수직 마진 (선 위아래의 간격)
      },

      flatListContent: {
        paddingBottom: 50,
      },
    
      MyHomeBtn: {
        position: 'absolute',
        bottom: 20, right: 20,
      }
    
});
