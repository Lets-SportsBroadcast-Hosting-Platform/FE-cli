import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import arrowToLeft from '../assets/images/arrowToLeft.png';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

export default function HostAuthentication() {
  const navigation = useNavigation();

  const arrowbuttonPress = () => {
    navigation.navigate('ChooseUser');
    console.log("arrowbuttonPressed");
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
    if(title === ''){
      Alert.alert('먼저 가게 이름을 입력해주세요!')
      return;
    }
    console.log(`${title} 사업장 선택!`)
    navigation.navigate('HostBusinessRegisNumber', {
      'title': title,
    })
  }

  const StoreList = storeInfoList.map((store, storeIdx)=>{
    return (
    <TouchableOpacity style={styles.storeItem} onPress={()=>goNextStep(store.title)} key={storeIdx}>
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
        <Text style={styles.headerText}>사장님이신가요?</Text>
        
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder='가게 이름을 입력해주세요'
            value={text}
            onChangeText={onChangeText}
            style={styles.storeInputText}
            mode='outlined'
          />
        </View>
        <Button mode="contained" onPress={() => goNextStep(text)} style={styles.typeButton}>
          직접등록
        </Button>
        {StoreList}

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
    fontSize: 20,
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
    alignItems: 'center'
  },
  textInputContainer: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  typeButton: {
    width: '100%',
    borderRadius: 10,
    marginTop: 15,
    backgroundColor:'#01162D',
  },
  storeInputText :{
    backgroundColor: '#ddd',
  },
  storeItem: {
    width: '100%',
    marginTop: 15,
    padding: 5,
  },
  storeItemText: {
    width: '100%',
  },
  storeItemTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  storeItemDesc: {
    color: '#888',
  }
});
