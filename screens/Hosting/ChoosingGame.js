import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import arrowToLeft from '../../assets/images/arrowToLeft.png';
import React,{useState,useEffect } from 'react';
import ApiUtil from '../../api/ApiUtil';
import ApiConfig from '../../api/ApiConfig';
import { RadioButton } from 'react-native-paper';
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

    const tabList = ['KBO', '해외축구', 'E-스포츠']
    const upperCategoryNm = ['kbaseball', 'wfootball']
    const categoryNmList = [['kbo'], ['epl', 'primera', 'ligue1', 'bundesliga']]

    const [sportsGameList, setSportsGameList] = useState([]);
    //라디오버튼들 중 선택된 경기
    const [selectedGame, setSelectedGame] = useState(null);
    // const [checked, setChecked] = React.useState('first');
    const ListItem = ({gameData})=>{
        console.log("Game Data:", gameData);
        return (
            <View style={{width:'98%', backgroundColor:'#ddd', marginBottom:20, justifyContent:'center'}}>
                {/* <Text>{gameData.date} ({gameData.weekDay})</Text> */}
                <Text style={{ fontFamily: 'BalooDa2-SemiBold', fontSize: 18, color: 'black',marginBottom:10 }}>{formatKoreanDate(gameData.date)} ({gameData.weekDay})</Text>
                    {gameData.games.map((game, index) => ( // Map through games array
                        <TouchableOpacity key={index} style={{flex:1, flexDirection:'row', marginLeft:9, marginBottom:8}}>
                        <RadioButton
                        label=''
                        value={gameData.games}
                        selected={selectedGame === gameData.games}
                        onPress={() => {setSelectedGame(gameData.games[index])}}
                        status={ selectedGame === gameData.games[index] ? 'checked' : 'unchecked' }
                        />
                        <Text style={{ fontFamily: 'BalooDa2-Medium', fontSize: 17, color: 'black',marginLeft: 20, marginRight: 20  }}>{game.time.slice(0, 2)}:{game.time.slice(2)}             {game.homeTeamName}     <Image source={{ uri: game.homeTeamEmblemUrl }} style={{ height: 28, width: 28}} />
                            <Text style={{ fontFamily: 'BlackHanSans-Regular', fontSize: 10}}>     vs     </Text>
                            <Image source={{ uri: game.awayTeamEmblemUrl }} style={{ height: 28, width: 28}} />     {game.awayTeamName}
                        </Text>
                        </TouchableOpacity>
                    ))
                    }
                {/* <Button  mode="contained" onPress={()=> {console.log("다음")}} style={styles.FindAddressButton}>
                <Text style={styles.nextText}>다음</Text>
                </Button> */}
            </View>
        );
        
    }

    function formatKoreanDate(dateString) {
        // Modify the date string to a format parsable by Date constructor (e.g., YYYY-MM-DD)
        const yearr = dateString.slice(0, 4);
        const monthh = dateString.slice(4, 6);
        const dayy = dateString.slice(6);
        const formattedDateString = `${yearr}-${monthh}-${dayy}`;
        
        const date = new Date(formattedDateString); // Convert string to Date object
        const month = date.getMonth() + 1; // Get month (0-indexed, so add 1)
        const day = date.getDate(); // Get day of the month
        // const dayWithoutZero = date.getDate().toString().padStart(2, '0');
        const dayWithoutZero = day < 10 ? `0${day}` : day.toString();

        return `${month}월 ${dayWithoutZero}일`; // Formatted date string
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
    function groupGamesByDate(gamesArray) {
        const groupedGames = {};
    
        for (const game of gamesArray) {
            const date = game.date;
            const weekDay = game.weekDay; // Add weekDay to the grouping
            const gameKey = `${date}-${weekDay}`; // Combine date and weekDay as key
        
        if (!groupedGames[gameKey]) {
            groupedGames[gameKey] = [game];
        } else {
            groupedGames[gameKey].push(game);
        }
        }
    
        const transformedGames = Object.entries(groupedGames).map(([gameKey, games]) => {
        const [date, weekDay] = gameKey.split('-');
        return {
            date,
            weekDay,
            games,
        };
        });
    
        return transformedGames;
    }

    useEffect(()=>{
        ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports`, {
            params: {
                upperCategoryId: upperCategoryNm[upperCategoryId],
                categoryId: categoryNmList[upperCategoryId][categoryId],
                count:count
            }
        }).then(res=>{
            // console.log(res.games)
            // console.log(groupGamesByDate(res.games))
            setSportsGameList(groupGamesByDate(res.games))
        }).catch(err=>console.log(JSON.stringify(err)))
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

            <View style={{width:'96%' }}>
                <FlatList
                // contentContainerStyle={{backgroundColor:'green'}}
                renderItem={({ item }) => <ListItem gameData={item} />}
                    data={sportsGameList}
                    showsVerticalScrollIndicator={false}
                    scrollIndicatorInsets={{ right: 1 }}
                    // contentContainerStyle={self.flatListContent}
                    />
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
        // backgroundColor:'red'
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
        // backgroundColor: 'red',
        marginBottom:40
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
    },
    FindAddressButton :{
        height:50,
        backgroundColor:'#B7B7B7',
        marginTop:40
    },
    nextText :{
        color:'#fff',
        fontFamily:'NotoSansKR-Medium',
        alignItems:'center',
        fontSize:15,
        lineHeight:25.5
    }
});
