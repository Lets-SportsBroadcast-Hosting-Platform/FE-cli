import React,{useEffect } from 'react'; 
import { StyleSheet, Text, View,Image  } from 'react-native';
import icons from '../assets/images/logo.png';

export default function Home({navigation}) {
    useEffect(() => {
        // 3초 후에 LoginPage로 이동
        const timer = setTimeout(() => {
            navigation.navigate('LoginPage')
        }, 3000);
    
        return () => clearTimeout(timer);
        }, []);

    return (
        <View style={styles.container}>
        {/* <Text style={{ color: 'white' }}>Open up App.js to start working on your app!</Text> */}
            <Image source={icons} style={styles.image}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#01162D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 130,
        height: 130,
    },

});
