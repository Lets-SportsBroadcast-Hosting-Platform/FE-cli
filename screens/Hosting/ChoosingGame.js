import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList, Button, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import arrowToLeft from '../../assets/images/arrowToLeft.png';
import { useEffect, useState } from 'react';
import ApiUtil from '../../api/ApiUtil';
import ApiConfig from '../../api/ApiConfig';
// import arrowRight from '../assets/images/arrow-right.png';


export default function HostPlaceList() {
    const navigation = useNavigation();
    const route = useRoute()
    const goBackPage = ()=>{
        navigation.goBack()
    }   
    
    const [upperCategoryId, setUpperCategoryId] = useState(0)
    const [categoryId, setCategoryId] = useState(0)
    const [count, setCount] = useState(0)

    const tabList = ['KBO', '해외축구']
    const upperCategoryNm = ['kbaseball', 'wfootball']
    const categoryNmList = [['kbo'], ['epl', 'primera', 'ligue1', 'bundesliga']]

    const [sportsGameList, setSportsGameList] = useState([]);

    const ListItem = ({
        awayTeamEmblemUrl,
        awayTeamName,
        date,
        homeTeamEmblemUrl,
        homeTeamName,
        time,
        weekDay
    })=>{
        return (
            // <TouchableOpacity>
            //     <View style={[self.checkboxItem]}>
            //         <Text>18:30</Text><Text>{homeTeamName} vs {awayTeamName}</Text>
            //     </View>
            // </TouchableOpacity>
            <View>
                <Text>{homeTeamName} vs {awayTeamName}</Text>
            </View>
        );
    }

    const renderItem = (game)=>(<ListItem
            awayTeamEmblemUrl={game.awayTeamEmblemUrl}
            awayTeamName={game.awayTeamName}
            date={game.date}
            homeTeamEmblemUrl={game.homeTeamEmblemUrl}
            homeTeamName={game.homeTeamName}
            time={game.time}
            weekDay={game.weekDay}
        />
    )

    useEffect(()=>{
        ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports`, {
            params: {
                upperCategoryId: upperCategoryNm[upperCategoryId],
                categoryId: categoryNmList[upperCategoryId][categoryId],
                count:count
            }
        }).then(res=>{
            res.games.forEach(game => {
                console.log(game)
            });
            setSportsGameList(res.games)
        })
    }, [upperCategoryId, categoryId, count])

    const getTabList = ()=>{
        return tabList.map((title, idx)=>{
            return <TouchableOpacity
                key={idx}
                style={self.button}
                onPress={() => {
                    setUpperCategoryId(idx);
                    setCategoryId(0);
                }}>
                <Text style={[self.buttonText]}>{title}</Text>
            </TouchableOpacity>
        })
    }

    return (
        <View style={self.container}>

            <View style={self.header}>
                <TouchableOpacity onPress={goBackPage} style={self.touchable}>
                <Image style={self.arrowIcon} source={arrowToLeft}  />
                </TouchableOpacity>
                <Text style={self.headerText}>4월</Text>
            </View>
            
            <View style={self.tabButtonContainer}>
                { getTabList() }
            </View>
            {/* <View style={{backgroundColor:'#fff', height:699, flex:1}}></View>
            <View style={{backgroundColor:'#eee', height:50}}></View> */}
                {/* keyExtractor={item=>`${item.date}${item.awayTeamName}${item.homeTeamName}`} */}
            <FlatList
            contentContainerStyle={{backgroundColor:'green'}}
                renderItem={renderItem}
                data={sportsGameList}
                showsVerticalScrollIndicator={false}
                scrollIndicatorInsets={{ right: 1 }}
                // contentContainerStyle={self.flatListContent}
                />
            {/* </FlatList> */}
        </View>
    );
}

const self = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 30,
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 10,
        width: '100%',
        position: 'relative',
        backgroundColor:'red'
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
        borderRadius: 10,
        alignContent:'center',
        height:50,
    },
    buttonText: {
    color: '#C5C5C7', // 버튼 글자색상 추가
    fontSize: 18,
    fontWeight: '700',
    padding: 10
    },
    tabButtonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
        width:'100%',
        // height: 30,
        backgroundColor: 'red'
    },
    checkboxItem: {
        flexDirection: 'row'
    },
    flatListContent: {
        height: '100%',
        // flex: 1,
        alignItems: 'center',
        position: 'relative',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'green'
    }
});
