import { StyleSheet, Text, View,Image,TouchableOpacity  } from 'react-native';
import { Button } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';

export default function LoginPage({navigation}) {
  const handleHostPress = () => {
    navigation.navigate('HostAuthentication')
  };
    return (
        <View style={styles.container}>

          <TouchableOpacity onPress={handleHostPress}  style={styles.hostContainer}>
            <Shadow>
              <Text style={styles.text}>호스트</Text>
              <Text style={styles.subtext}>가게에서 모임을 호스팅해요.</Text>
            </Shadow>
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
      margin: 20, 
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
      marginVertical: 10, // 수평선의 상단과 하단 여백 조정,
      marginRight:60,
      marginLeft:60
    },
});
