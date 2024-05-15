import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert,TextInput } from 'react-native';
import arrowToLeft from '../assets/images/arrowToLeft.png';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import kakaoMapIcon from '../assets/images/KakaoMap_logo.png';
import NaverMap_logo from '../assets/images/NaverMap_logo.png';

// api
import ApiUtil from '../api/ApiUtil';
import ApiConfig from '../api/ApiConfig';

export default function HostAuthentication() {
  const navigation = useNavigation();

  const arrowbuttonPress = () => {
    navigation.navigate('ChooseUser');
    console.log("arrowbuttonPressed");
  };


  const [provider,setProvider] = React.useState('kakao');

  //res [{},{}]
  const [storeInfoList, setStoreInfoList] = React.useState([]);
  //가게 입력값
  const [text, setText] = React.useState('');

  //map 선택
  const [map, setMap] = useState(0);
  const mapIconClick = () => {
    setMap(map===1? 0:1);
    setProvider(map === 0 ? 'naver': 'kakao');
    // SearchStore(text);
    // console.log(storeInfoList)
  };

  useEffect(()=>{
    SearchStore(text);
    console.log(map)
  }, [map])

  //링크 부분
  //http://43.202.194.172/host/search?keyword=ㅅ&provider=kakao
  function SearchStore(text){
    
    const params = {}
    ApiUtil.post(`${ApiConfig.SERVER_URL}/host/search?keyword=${text}&provider=${provider}`, params)
    .then((res)=>{
      const stores = res.stores ?? [];
      // console.log(stores);
      // console.log(stores[0]);
      // console.log(stores.length);//항상 5구나 아님 0
      setStoreInfoList(stores)
      console.log(storeInfoList)
    })
    .catch((error)=>console.log(error))
  }
  //진진자라
  //res에 뜬 가게를 선책하면 사업자등록번호 페이지로 넘어감
  const goNextStep=(title)=>{
    navigation.navigate('HostBusinessRegisNumber',{
    'title': title,
    });
  }

  //res 가게를 출력
  const StoreList = () => (
    <>
    {storeInfoList.length > 0 ? 
      (storeInfoList.map((store, storeIdx) => 
      {
          return (
            <TouchableOpacity
            style={styles.storeItem}
            onPress={() => goNextStep(store.place_name)}
            key={storeIdx}>
              <View style={styles.line}></View>
              <Text style={[styles.storeItemText, styles.storeItemTitle]}>{store.place_name}</Text>
              <Text style={[styles.storeItemText, styles.storeItemDesc]}>{store.address_name}</Text>
            </TouchableOpacity>
          )
      })
      ) : (<Text>검색 결과가 없습니다.</Text>)
      }
    </>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
          <Image source={arrowToLeft} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>우리 가게 검색</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder='    가게 이름을 입력해주세요'
            value={text}
            onChangeText={(inputText) => {
              setText(inputText);
              SearchStore(inputText);
            }}
            style={styles.storeInputText}
            mode='outlined'
          />
          <TouchableOpacity onPress={mapIconClick}>
            {map === 0 ? (
              <Image source={kakaoMapIcon} style={styles.kakaoMapIcon} />
            ) : (
              <Image source={NaverMap_logo} style={styles.kakaoMapIcon} />
            )}
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={() => navigation.navigate('InputStore')} style={styles.typeButton}>
          우리 가게를 못찾겠어요
        </Button>
        {StoreList()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    // paddingVertical: 30,
    // paddingHorizontal: 10
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
  arrowIcon: {
    width: 20,
    height: 20,
     // 이미지와 텍스트 사이의 간격 조정
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    // backgroundColor:'red'
  },
  textInputContainer: {
    width: '100%',
    // height:41.24,
    // justifyContent: 'center',
    borderRadius: 10,
    borderBottomWidth: 0,
    // backgroundColor:'red',
    flexDirection: 'row'
  },
  typeButton: {
    width: '100%',
    height:41,
    borderRadius: 10,
    marginTop: 15,
    backgroundColor:'#01162D',
    fontFamily:'BlackHanSans-Regular',
  },
  storeInputText :{
    width: '85%',
    backgroundColor: '#ddd',
    borderRadius:10,
    paddingLeft:15,
  },
  storeItem: {
    width: '100%',
    marginTop: 10,
    padding: 5,
  },
  storeItemText: {
    width: '100%',
  },
  storeItemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop:15,
    color:'black',
    fontFamily:'NotoSansKR-Black',
    fontWeight:'900'
  },
  storeItemDesc: {
    color: '#888',
    fontSize:13
  },
  kakaoMapIcon :{
    height:50,
    width:50,
    borderRadius:50,
    marginLeft:14
  },
  line: {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    // marginVertical: 4, // 수평선의 상단과 하단 여백 조정,
    marginRight:"2%",
    marginLeft:"2%",
  },
});
