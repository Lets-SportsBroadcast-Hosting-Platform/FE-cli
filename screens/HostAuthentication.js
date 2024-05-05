import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert,TextInput } from 'react-native';
import arrowToLeft from '../assets/images/arrowToLeft.png';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import kakaoMapIcon from '../assets/images/KakaoMap_logo.png';
import NaverMap_logo from '../assets/images/NaverMap_logo.png';
import { Searchbar } from 'react-native-paper';

export default function HostAuthentication() {
  const navigation = useNavigation();

  const arrowbuttonPress = () => {
    navigation.navigate('ChooseUser');
    console.log("arrowbuttonPressed");
  };


  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  
  //map 선택
  const [map, setMap] = useState(0);
  const mapIconClick = () => {
    setMap(map===1? 0:1);
    // if (map === 0) {
  //   axios.post('/host/kakao/store/list', { /* 필요한 데이터를 넣어주세요 */ })
  //       .then(response => {
  //         // POST 요청 성공 시 처리할 내용
  //       })
  //       .catch(error => {
  //         console.log("kakaomap 실패")
  //       });
  //   } 
  //   else {
  //     // Naver Map인 경우
  //     axios.post('/host/naver/store/list', { /* 필요한 데이터를 넣어주세요 */ })
  //       .then(response => {
  //         // POST 요청 성공 시 처리할 내용
  //       })
  //       .catch(error => {
  //         console.log("naveromap 실패")
  //       });
  //   }
  };

  // 가게 이름 검색
  const storeInfoList = [
    {
      title: '벨지움재즈카페',
      desc: '서울 강남구 테헤란로 83길 20 건영빌딩 400호'
    },
    {
      title: '재즈카페',
      desc: '서울 종로구 평창 11길 7'
    },
    {
      title: '째즈카페',
      desc: '서울 동작구 여의대방로 24길 129'
    },
  ]
  const [text, setText] = React.useState('');
  const onChangeText = (inputText) => {
    setText(inputText);
  };

  const goNextStep=(title)=>{
    navigation.navigate('InputStore');
    // if(title === ''){
    //   Alert.alert('먼저 가게 이름을 입력해주세요!')
    //   return;
    // }
    // console.log(`${title} 사업장 선택!`)
    // navigation.navigate('HostBusinessRegisNumber', {
    //   'title': title,
    // })
  }

  const StoreList = storeInfoList.map((store, storeIdx)=>{
    return (
    <TouchableOpacity style={styles.storeItem} onPress={()=>goNextStep(store.title)} key={storeIdx}>
      <View style={styles.line}></View>
      <Text style={[styles.storeItemText, styles.storeItemTitle]}>{store.title}</Text>
      <Text style={[styles.storeItemText, styles.storeItemDesc]}>{store.desc}</Text>
    </TouchableOpacity>
    )
  })

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
          {/* <TextInput
            placeholder='    가게 이름을 입력해주세요'
            value={text}
            onChangeText={onChangeText}
            style={styles.storeInputText}
            mode='outlined'
          /> */}
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          {/* <Image source={kakaoMapIcon} style={styles.kakaoMapIcon} /> */}
          <TouchableOpacity onPress={mapIconClick}>
            {map === 0 ? (
              <Image source={kakaoMapIcon} style={styles.kakaoMapIcon} />
            ) : (
              <Image source={NaverMap_logo} style={styles.kakaoMapIcon} />
            )}
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={() => goNextStep(text)} style={styles.typeButton}>
          우리 가게를 못찾겠어요
        </Button>
        {StoreList}



        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
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
    paddingLeft:5
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
