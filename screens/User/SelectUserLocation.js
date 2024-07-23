import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert,TextInput, FlatList } from 'react-native';
import arrowToLeft from '../../assets/images/arrowToLeft.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';

// api
import ApiUtil from '../../api/ApiUtil';
import ApiConfig from '../../api/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HostAuthentication() {
  const navigation = useNavigation();
  const route = useRoute()
  const params = route.params;
  const {saveUserInfo} = useAuth()


  const arrowbuttonPress = () => {
    navigation.goBack();
    console.log("arrowbuttonPressed");
  };


  //res [{},{}]
  const [storeInfoList, setStoreInfoList] = React.useState([]);
  //가게 입력값
  const [text, setText] = React.useState('');

  function SearchStore(text){
    ApiUtil.get(`${ApiConfig.SERVER_URL}/user/search-local`, {
        params : {address: text}
    })
    .then((res)=>{
      console.log(res)
      // console.log(stores);
      // console.log(stores[0]);
      // console.log(stores.length);//항상 5구나 아님 0
      setStoreInfoList(res)
    })
    .catch((error)=>console.log(error.config))
  }
  //진진자라
  //res에 뜬 가게를 선책하면 사업자등록번호 페이지로 넘어감
  const goNextStep= async (store)=>{

    if(params.action === 'relocate'){
      const jwtToken = await AsyncStorage.getItem('jwtToken')
      const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))

      ApiUtil.put(`${ApiConfig.SERVER_URL}/user`, {
          name: userInfo.name,
          age: parseInt(new Date().getFullYear()) - parseInt(userInfo.birthyear),
          area: store.addr_name
      }, {
        headers: {
          jwToken: jwtToken
        }
      })
      .then(res=>{
        console.log('성공', res)
        navigation.navigate('PlaceList')
        AsyncStorage.setItem('userInfo', JSON.stringify({...userInfo, area: addr_name}))
        navigation.navigate('PlaceList')
      })
      .catch(err=>console.log(JSON.stringify(err)))

    } else {
      navigation.navigate('TermsOfService',{
        ...store,
        ...params
      });
    }


  }

//   //res 가게를 출력
//   const StoreList = () => (
//     <>
//     {storeInfoList.length > 0 ? 
//       (storeInfoList.map((store, storeIdx) => 
//       {
//           return (
            
//           )
//       })
//       ) : (<Text>검색 결과가 없습니다.</Text>)
//       }
//     </>
//   );

  const ListItem = ({item}) => (
        <TouchableOpacity
            style={styles.storeItem}
            onPress={() => goNextStep(item)}
            key={item.addr_name}>
              <View style={styles.line}></View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.storeItemText, styles.storeItemTitle]}>{text} / </Text> 
                <Text style={[styles.storeItemDesc]}>{item.addr_name}</Text>
              </View>
        </TouchableOpacity>
);



  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
          <Image source={arrowToLeft} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>동네 검색</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder='    동.읍.면을 입력해주세요.'
            value={text}
            onChangeText={(inputText) => {
              setText(inputText);
              SearchStore(inputText);
            }}
            style={styles.storeInputText}
            mode='outlined'
          />
        </View>
        <Button mode="contained" onPress={()=>{}} style={styles.typeButton}>
          내 위치로 찾기
        </Button>

        <FlatList
            data={storeInfoList}
            renderItem={ListItem}
            keyExtractor={item => item.addr_name}
            showsVerticalScrollIndicator={false}
            scrollIndicatorInsets={{ right: 1 }}
            contentContainerStyle={styles.flatListContent}
        >

        </FlatList>
        {/* {StoreList()} */}
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
    width: '100%',
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
    fontSize:13,
    marginTop:15,
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
