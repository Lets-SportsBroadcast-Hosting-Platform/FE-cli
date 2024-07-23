import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList } from 'react-native';
import MyHomePng from '../../assets/images/myhome.png';
import EditPng from '../../assets/images/edit.png'
import UserImage from '../../assets/images/user.png'
import CancelImage from '../../assets/images/cancel.png'
import { useCallback, useEffect, useState } from 'react';
import ApiConfig from '../../api/ApiConfig';
import ApiUtil from '../../api/ApiUtil';

import AsyncStorage from '@react-native-async-storage/async-storage';

// auth
import { useAuth } from '../../contexts/AuthContext.js';
import { useFocusEffect } from '@react-navigation/native';

export default function HostPlaceList({navigation}) {
    const {getUserToken, getStoreInfo} = useAuth()
    const [storeName, setStoreName] = useState('')
    const [storeNo, setStoreNo] = useState('')
    const [storeAddress, setStoreAddress] = useState('')
    const [my_business_no, set_business_no] = useState('')
    const onClickItem = (item)=>{
        navigation.navigate('HostPlaceDetail', {...item})
    }

    const onClickEdit = ()=>{
        navigation.navigate('MyHomeEdit', {business_no: my_business_no})
    }

    const onClickHostBtn = ()=>{
        navigation.navigate('ChoosingGame')
    }

    const logout = ()=>{
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

        
    }

    const clickING = ()=>{
        console.log('진행중 버튼 클릭   ')
        setStatus(true)
    }

    const onClickCancelButton = (id)=>{
        Alert.alert(
            '호스팅 취소',
            '호스팅된 모임을 취소하시겠습니까?',
            [
              {
                text: '취소',
                style: 'cancel',
              },
              {
                text: '확인',
                onPress: () => {
                    console.log('호스팅 삭제...')
                  ApiUtil.delete(`${ApiConfig.SERVER_URL}/party/${id}`).then(res=>{
                    console.log(res)
                    searchHostings()
                  })

                },
              },
            ],
            { cancelable: false }
          );
    }

    const clickCOMPLEDTED = ()=>{
        console.log('마감 버튼 클릭')
        setStatus(false)
    }
    const [status, setStatus] = useState(true)
    const [hostPlaceList, setHostPlaceList] = useState([]);
    // const [imageLink, setImageLink] = useState(uri:{"https://sitem.ssgcdn.com/86/60/02/item/1000385026086_i1_1100.jpg"});

    useFocusEffect(
        useCallback(()=>{
            searchHostings()
        }, [status])
    )

    const searchHostings = ()=>{
        getUserToken().then((token)=>{
            console.log(status, token)
            ApiUtil.get(`${ApiConfig.SERVER_URL}/party`, {
                params: {
                    status: status
                },
                headers: {
                    jwToken: token
                }
            }).then(async (res)=>{
                console.log(res)
                const storeInfo = await getStoreInfo();
                console.log('storeInfo::', storeInfo)
                setStoreName(storeInfo.store_name)
                setStoreNo(storeInfo.store_number)
                setStoreAddress(storeInfo.store_road_address)
                set_business_no(storeInfo.business_no)
                const placeList = res.map(place=>{
                    const dayArray = ['월', '화', '수', '목', '금', '토', '일']
                    const hostingDateInfo = new Date(place.hosting_date)
                    const hostMonth = hostingDateInfo.getMonth() + 1
                    const hostDate = hostingDateInfo.getDate()
                    const hostDay = hostingDateInfo.getDay()
                    const hostHHMI = `${hostingDateInfo.getHours()}:${hostingDateInfo.getMinutes()}`
                    const hostDayNm = dayArray[hostDay]
                    console.log(`${ApiConfig.IMAGE_SERVER_URL}/${storeInfo.business_no}/${place.hosting_id}/0`)
                    return {
                        ...place,
                        dayArray,
                        hostingDateInfo,
                        hostMonth,
                        hostDate: `${hostMonth}.${hostDate}`,
                        hostDay,
                        hostHHMI,
                        hostDayNm,
                        // imageLink: {uri: `${ApiConfig.IMAGE_SERVER_URL}/${storeInfo.business_no}/${place.hosting_id}/0`},
                        imageLink: {uri: `${ApiConfig.IMAGE_SERVER_URL}/${storeInfo.business_no}/${place.hosting_id}/0`},
                    }
                    
                })
                console.log('검색...')
                setHostPlaceList(placeList)
            })
        })
    }

    const ListItem = ({ 
            hosting_id,
            hosting_name,
            // hosting_place,
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
                // hosting_place,
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
            <TouchableOpacity onPress={()=>onClickCancelButton(hosting_id)} style={styles.editdetailBtn}>
                <Image style={{transform: [{scale: 1}], width: 20, height: 20}} source={CancelImage}></Image>
            </TouchableOpacity>
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
            // hosting_place={item.hosting_place}
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
            <View style={styles.userInfoContainer}>
                <Text style={{fontSize: 28, color: 'black', fontWeight: 'blod', fontFamily:'BlackHanSans-Regular',}} >{storeName}</Text>
                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>{storeNo}</Text>
                <Text style={{fontSize: 15, color: 'black'}}>{storeAddress}</Text>
                <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <Text>로그아웃</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClickEdit} style={styles.editBtn}>
                    <Image style={{transform: [{scale: 1.3}]}} source={EditPng}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={clickING} style={styles.statusBtn}>
                    <Text style={[styles.statusBtnText, styles.boxRight]}>진행중</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clickCOMPLEDTED} style={styles.statusBtn}>
                    <Text style={styles.statusBtnText}>마감</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={hostPlaceList}
                renderItem={renderItem}
                keyExtractor={item => item.hosting_id}
                showsVerticalScrollIndicator={false}
                scrollIndicatorInsets={{ right: 1 }}
                contentContainerStyle={styles.flatListContent}
            />

            <TouchableOpacity onPress={()=>{
                navigation.navigate('PlaceList')
            }} style={styles.MyHomeBtn}>
                <Image source={MyHomePng}></Image>
            </TouchableOpacity>
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

    placeItem: {
        height: 262,
        width: 335,
        borderBlockColor: 'black',
        marginBottom: 50,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        position: 'relative'
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
        position: 'relative'
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
      },

      userInfoContainer: {
        width: '100%',
        padding: 18,
        height: 200,
        borderBottomWidth: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      editBtn: {
        position: 'absolute',
        bottom: 32,
        right: 10
      },
      logoutBtn: {
        position: 'absolute',
        bottom: 32,
        left: 10
      },
      buttonContainer: {
        flexDirection: 'row',
        marginBottom:30
      },
      statusBtn: {
        width: '50%',
        paddingTop: 10,
      },
      statusBtnText: {
        fontSize: 20,
        fontWeight: 'blod',
        color: 'black',
        fontFamily: 'BlackHanSans-Regular',
        textAlign: 'center'
      },
      boxRight: {
        borderRightWidth: 1
      },
      editdetailBtn: {
          position: 'absolute', top: 5, right: 5, padding: 5,
          zIndex: 10,
      }
    
});
