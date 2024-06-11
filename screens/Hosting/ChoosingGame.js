import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList, ActivityIndicator , ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import arrowToLeft from '../../assets/images/arrowToLeft.png';
import React,{useState,useEffect } from 'react';
import ApiUtil from '../../api/ApiUtil';
import ApiConfig from '../../api/ApiConfig';
import { RadioButton,Button } from 'react-native-paper';




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
    const [selectedTabIndex, setSelectedTabIndex] = useState(upperCategoryId);
    const upperCategoryNm = ['kbaseball', 'wfootball']
    const categoryNmList = [['kbo'], ['epl', 'primera', 'ligue1', 'bundesliga']]

    const [sportsGameList, setSportsGameList] = useState([]);
    //라디오버튼들 중 선택된 경기
    const [selectedGame, setSelectedGame] = useState(null);
    //pagination
    
    const [pageCount, setPageCount] = useState(0);
    const [hasMoreGames, setHasMoreGames] = useState(true);
    const [prevSelectedTabIndex, setPrevSelectedTabIndex] = useState(0);

    const ListItem = ({gameData})=>{
        console.log("Game Data:", gameData);
        return (
            <View style={{width:'98%'}}>
                
                <Text style={{ fontFamily: 'BalooDa2-SemiBold', fontSize: 18, color: 'black',marginBottom:10 }}>{formatKoreanDate(gameData.date)} ({gameData.weekDay})</Text>
                    {gameData.games.map((game, index) => ( 
                        <TouchableOpacity key={index} style={{flex:1, flexDirection:'row', marginLeft:9, marginBottom:8}}>
                        <RadioButton
                        label=''
                        value={gameData.games}
                        selected={selectedGame === gameData.games[index]}
                        onPress={() => {
                            setSelectedGame(game)
                        }}
                        status={ selectedGame === gameData.games[index] ? 'checked' : 'unchecked' }
                        />
                        <Text style={{ fontFamily: 'BalooDa2-Medium', fontSize: 18, color: 'black',marginLeft: 20, marginRight: 20  }}>{game.time.slice(0, 2)}:{game.time.slice(2)}             {game.homeTeamName}     <Image source={{ uri: game.homeTeamEmblemUrl }} style={{ height: 28, width: 28}} />
                            <Text style={{ fontFamily: 'BlackHanSans-Regular', fontSize: 10}}>     vs     </Text>
                            <Image source={{ uri: game.awayTeamEmblemUrl }} style={{ height: 28, width: 28}} />     {game.awayTeamName}
                        </Text>
                        </TouchableOpacity>
                    ))
                    }
                
            </View>
        );
        
    }

    function formatKoreanDate(dateString) {
        
        const yearr = dateString.slice(0, 4);
        const monthh = dateString.slice(4, 6);
        const dayy = dateString.slice(6);
        const formattedDateString = `${yearr}-${monthh}-${dayy}`;
        
        const date = new Date(formattedDateString);
        const month = date.getMonth() + 1; 
        const day = date.getDate(); 
        
        const dayWithoutZero = day < 10 ? `0${day}` : day.toString();

        return `${month}월 ${dayWithoutZero}일`; 
    }

    function groupGamesByDate(gamesArray) {
        const groupedGames = {};
    
        for (const game of gamesArray) {
            const date = game.date;
            const weekDay = game.weekDay; 
            const gameKey = `${date}-${weekDay}`; 
        
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


    const fetchGames = async () => {
        try {
            const response = await ApiUtil.get(`${ApiConfig.SERVER_URL}/schedule/sports`, {
                params: {
                upperCategoryId: upperCategoryNm[upperCategoryId],
                categoryId: categoryNmList[upperCategoryId][categoryId],
                count: pageCount, 
                },
            });
            if (response.games && response.games.length === 0) {
                console.log("No more games to fetch");
                setHasMoreGames(false);
            } else if (pageCount >= response.total_count) {
                console.log("No more games to load");
                setHasMoreGames(false);
            }else {
                const newGames = groupGamesByDate(response.games);
                // sportsGameList.forEach((gameData, index) => {
                //     gameData.games = newGames[index].games;
                // });
                setSportsGameList([...sportsGameList, ...newGames]);
                setPageCount(pageCount + 1);
            }
            // const newGames = groupGamesByDate(response.games);
            // setSportsGameList([...sportsGameList, ...newGames]); // Append new games
            // setPageCount(pageCount + 1); // Increment page count for next request
            } catch (err) {
            console.error(err);
            }
        };
    useEffect(() => {
        fetchGames(); // Fetch initial data on mount
        }, [upperCategoryId, categoryId]); // Re-fetch on category change
    
        const handleLoadMore = () => {
            if (hasMoreGames) {
                fetchGames();
            } else {
            console.log("No more games to load2");
            // Display message to user (if applicable)
            }
        };
    useEffect(() => {
        if (prevSelectedTabIndex !== selectedTabIndex) {
            setSportsGameList([]); // Clear existing game list
            setPrevSelectedTabIndex(selectedTabIndex);
            setPageCount(0);
            setHasMoreGames(true);
            fetchGames(); // Fetch games for the selected tab
        }
        }, [selectedTabIndex]);
    const getTabList = ()=>{
        return tabList.map((title, idx)=>{
            return <TouchableOpacity
                key={idx}
                style={self.button}
                onPress={() => {
                    setSelectedTabIndex(idx);
                    setUpperCategoryId(idx);
                    setCategoryId(0);
                    setSportsGameList([]);
                }}>
                
                <Text style={selectedTabIndex === idx ? self.selectedButtonText : self.buttonText}>{title}</Text>
                <View style={selectedTabIndex === idx ? self.selectedButtonbar : self.buttonBar} />
            </TouchableOpacity>
        })
    }

    const gotoMakingHosyButton = () =>{
        navigation.navigate('MakingHost',{
            selectedGame,
            upperCategoryId,
            categoryId
        });
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
            
        
            {sportsGameList.length === 0 && ( 
                <Text style={self.noGamesText}>아직 진행되는 경기가 없습니다.</Text>
            )}
            {sportsGameList.length > 0 && (
                <View style={{width:'96%', flex: 1}}>
                    <FlatList
                        renderItem={({ item }) => <ListItem gameData={item} />}
                        data={sportsGameList}
                        showsVerticalScrollIndicator={false}
                        scrollIndicatorInsets={{ right: 1 }}
                        keyExtractor={(item) => `${item.date}-${item.weekDay}`}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            sportsGameList.length > 0 && <ActivityIndicator size="large" />
                        }
                        // ListFooterComponent={() => (
                        // <View style={self.footerContainer}>
                        //     <Button style={self.AfterChoosingGameButton} onPress={() => loadMoreGames()}><Text style={self.nextText}>다음</Text></Button>
                        // </View>
                        // )}
                    />
                    <View style={self.footerContainer}>
                        <Button style={self.AfterChoosingGameButton} onPress={gotoMakingHosyButton}><Text style={self.nextText}>다음</Text></Button>
                    </View>
                </View>)}
        </View>
    );
}

const self = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        // height: '100%',
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    },
    header: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 10,
        width: '100%',
        position: 'relative',
    
    },
    arrowIcon: {
        width: 20,
        height: 20,
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
        backgroundColor: '#fff', 
        borderRadius: 10,
        alignContent:'center',
        height:50,
    },
    selectedButtonText:{
        color:'#01162D',
        fontSize: 18,
        fontWeight: '700',
        padding: 10
    },
    buttonBar:{
        width: '100%', 
        height: 2, 
        backgroundColor: '#C5C5C7',
    },
    selectedButtonbar:{
        width: '100%', 
        height: 2, 
        backgroundColor: '#01162D',
    },
    buttonText: {
    color: '#C5C5C7', 
    fontSize: 18,
    fontWeight: '700',
    padding: 10
    },
    tabButtonContainer:{
        // backgroundColor: 'purple',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
        width:'100%',
        marginBottom:40
    },
    checkboxItem: {
        flexDirection: 'row'
    },
    footerContainer:{
        margin: 5,
        // flex: 1,

        // right:0,
        // top: 0,
        // left:0,

        // backgroundColor: 'red',
        // width: '100%',
        // height: 80, 
        // padding: 10, 
    },
    AfterChoosingGameButton :{
        height:50,
        backgroundColor:'#01162D',
    },
    nextText :{
        color:'#fff',
        fontFamily:'NotoSansKR-Medium',
        alignItems:'center',
        fontSize:15,
        lineHeight:25.5,
        marginBottom:0,
    }
});
