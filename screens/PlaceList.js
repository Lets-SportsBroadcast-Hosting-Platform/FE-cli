import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList } from 'react-native';
import arrowToLeft from '../assets/images/location.png';
import arrowRight from '../assets/images/arrow-right.png';

export default function PlaceList({navigation}) {
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

    const DATA = [
        { 
            id: '1', 
            imageLink: "https://pcmap.place.naver.com/restaurant/36028358/home?entry=pll&from=nx&fromNxList=true&from=map&fromPanelNum=2&timestamp=202405051906#",
            place: '서초동',
            time: '16:30',

            event_title: '서울당산곱창 서울 - 당산',
            event_place: '당산역 N번출구',
            event_date: '20240505',
            event_day: '수',
            event_time: '1900',
            count: 13,
            total: 15, 
        },
        { 
            id: '2', 
            imageLink: "https://pcmap.place.naver.com/restaurant/36028358/home?entry=pll&from=nx&fromNxList=true&from=map&fromPanelNum=2&timestamp=202405051906#",
            place: '서초동',
            time: '16:30',

            event_title: '서울당산곱창',
            event_place: '당산역 N번출구',
            event_date: '20240505',
            event_day: '수',
            event_time: '1900',
            count: 13,
            total: 15, 
        },
        { 
            id: '3', 
            imageLink: "https://pcmap.place.naver.com/restaurant/36028358/home?entry=pll&from=nx&fromNxList=true&from=map&fromPanelNum=2&timestamp=202405051906#",
            place: '서초동',
            time: '16:30',

            event_title: '서울당산곱창',
            event_place: '당산역 N번출구',
            event_date: '20240505',
            event_day: '수',
            event_time: '1900',
            count: 13,
            total: 15, 
        },
        { 
            id: '4', 
            imageLink: "https://pcmap.place.naver.com/restaurant/36028358/home?entry=pll&from=nx&fromNxList=true&from=map&fromPanelNum=2&timestamp=202405051906#",
            place: '서초동',
            time: '16:30',

            event_title: '서울당산곱창',
            event_place: '당산역 N번출구',
            event_date: '20240505',
            event_day: '수',
            event_time: '1900',
            count: 13,
            total: 15, 
        },
        
        // 추가적인 데이터 항목들...
    ];

    const ListItem = ({ event_title }) => (
        <View style={styles.placeItem}>
            <Text style={styles.placeTitle}>{event_title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <ListItem
         event_title={item.event_title}
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
                
                <TouchableOpacity onPress={onClickLocationChange} style={styles.touchableRight}>
                    <Text style={styles.hostingText}>
                        호스팅하기
                    </Text>
                    <Image source={arrowRight} style={styles.arrowRightIcon} />
                </TouchableOpacity>
                
            </View>

            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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

    }
    
});
