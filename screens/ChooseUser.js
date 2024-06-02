import { StyleSheet, Text, View,Image,TouchableOpacity  } from 'react-native';
import { Button } from 'react-native-paper';
import arrowToLeft from '../assets/images/arrowToLeft.png';

export default function LoginPage({navigation}) {
  const handleHostPress = () => {
    navigation.navigate('HostAuthentication', {type: 'host'})
  };
  const arrowbuttonPress = () => {
    navigation.goBack();
  };
    return (
        <View style={styles.container}>

        <View style={styles.header}>
            <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
            <Image source={arrowToLeft} style={styles.arrowIcon} />
            </TouchableOpacity>
            
        </View>
          <TouchableOpacity onPress={handleHostPress}  style={styles.hostContainer}>
              <Text style={styles.text}>호스트</Text>
              <Text style={styles.subtext}>가게에서 모임을 호스팅해요.</Text>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <TouchableOpacity onPress={()=>{console.log("호스트는 아직")}} style={styles.userContainer}>
                <Text style={styles.text}>사용자</Text>
                <Text style={styles.subtext}>호스팅 된 모임에 참여해요.</Text>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative'
    },
    hostContainer: {
      height: '50%',
      justifyContent: 'flex-end',
      flex:1,
      textAlign:'left',
      paddingLeft: 60,
      paddingBottom:20

    },
    userContainer: {
      height: '50%',
      justifyContent: 'flex-start',
      flex:1,
      alignItems: 'flex-end', // 가로 오른쪽 정렬
      paddingRight: 60,
      paddingTop:20
    },
    text : {
      fontWeight: '500',
      fontSize: 34,
      fontFamily :'NotoSansKR-Black',
      color:'black',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
    },
    subtext :{
      color:'black',fontSize: 13,
      fontFamily :'NotoSansKR-Medium',
      fontWeight:'100',
      marginTop: -30,
    },
    line: {
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      marginVertical: 25, // 수평선의 상단과 하단 여백 조정,
      marginRight:60,
      marginLeft:60
    },
    arrowIcon: {
      width: 20,
      height: 20,
      marginTop:20,
  },
  touchable: {
    alignItems: 'center',
    position: 'absolute',
    top: '50%', left: 0,
    transform: [{translateY: 13.1}, {translateX: 20}],
    zIndex:10
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
    position: 'absolute',
    top : 0
  },
});
