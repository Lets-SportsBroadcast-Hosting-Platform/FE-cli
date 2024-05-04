import React,{useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import LoginPage from './screens/LoginPage';
import ChooseUser from './screens/ChooseUser';
import HostAuthentication from './screens/HostAuthentication';
import HostBusinessRegisNumber from './screens/HostBusinessRegisNumber.js';
import TermsOfService from './screens/TermsOfService.js';
import InputStore from './screens/InputStore.js';
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        
        <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown:false}}/>
        {/* <Stack.Screen name="TestPage" component={TestPage} /> */}
        <Stack.Screen name="ChooseUser" component={ChooseUser} options={{headerShown:false}}/>
        <Stack.Screen name="HostAuthentication" component={HostAuthentication} options={{headerShown:false}}/>
        <Stack.Screen name="HostBusinessRegisNumber" component={HostBusinessRegisNumber} options={{headerShown:false}}/>
        <Stack.Screen name="TermsOfService" component={TermsOfService} options={{headerShown:false}}/>
        <Stack.Screen name="InputStore" component={InputStore} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}