import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList } from 'react-native';
import arrowToLeft from '../../assets/images/location.png';
import arrowRight from '../../assets/images/arrow-right.png';
import MyHomePng from '../../assets/images/myhome.png';
import EditPng from '../../assets/images/edit.png'
import UserImage from '../../assets/images/user.png'
import { useEffect, useState } from 'react';
import ApiConfig from '../../api/ApiConfig';
import ApiUtil from '../../api/ApiUtil';

export default function HostPlaceList({navigation}) {
    const onClickItem = (item)=>{
        navigation.navigate('HostPlaceDetail', {...item})
    }

    const onClickEdit = ()=>{
        console.log('정보 수정')
    }

    const onClickHostBtn = ()=>{
        navigation.navigate('ChoosingGame')
    }

    const clickING = ()=>{
        console.log('진행중 버튼 클릭')
    }

    const clickCOMPLEDTED = ()=>{
        console.log('마감 버튼 클릭')
    }

    const [hostPlaceList, setHostPlaceList] = useState([]);
    useEffect(()=>{
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
                    imageLink: {uri: `${ApiConfig.IMAGE_SERVER_URL}/${place.business_no}/0`},
                }
            })

            setHostPlaceList(placeList)  
        })
    }, [])

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
            <View style={styles.userInfoContainer}>
                <Text style={{fontSize: 28, color: 'black', fontWeight: 'blod', fontFamily:'BlackHanSans-Regular',}} >벨지움재즈카페</Text>
                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>010-1234-5678</Text>
                <Text style={{fontSize: 15, color: 'black'}}>서울시 반포대로 24길 17</Text>
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

            <TouchableOpacity style={styles.MyHomeBtn}>
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
      buttonContainer: {
        flexDirection: 'row'
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
      }
    
});
