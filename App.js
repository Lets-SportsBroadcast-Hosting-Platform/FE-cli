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
import Toast from 'react-native-toast-message';
import StoreAddress from './screens/StoreAddress.js';
// 메인화면
import HostPlaceList from './screens/HostPlaceList.js';
import HostPlaceDetail from './screens/HostPlaceDetail.js';
//호스팅
import MakingHost from './screens/Hosting/MakingHost.js';
import ChoosingGame from './screens/Hosting/ChoosingGame.js';
import { AuthProvider } from './contexts/AuthContext.js';
//호스트 마이페이지
import EditStoreMypage from './screens/HostUserMyPage/EditStoreMypage.js';
import EditMypage from './screens/HostUserMyPage/EditMypage.js';
//사용자 마이페이지
import UserMyHome from './screens/User/UserMyHome.js';

//테스트용
import SliderScreen from './screens/Hosting/SliderScreen.js';
//마이홈
import MyHome from './screens/MyHome/MyPlaceList.js'
import MyHomeEdit from './screens/MyHome/MyPlaceEdit.js'
import EditStoreAddress from './screens/MyHome/EditStoreAddress.js';

//유저 인증 절차
import SelectUserLocation from './screens/User/SelectUserLocation.js';
import HostPhoneNumber from './screens/HostPhoneNumber.js';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AuthProvider>
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
          <Stack.Screen name="StoreAddress" component={StoreAddress} options={{headerShown:false}}/>

          {/* 메인 화면 */}
          <Stack.Screen name="PlaceList" component={HostPlaceList} options={{headerShown:false}}/>
          <Stack.Screen name="HostPlaceDetail" component={HostPlaceDetail} options={{headerShown:false}}/>
          <Stack.Screen name="MakingHost" component={MakingHost} options={{headerShown:false}}/>
          <Stack.Screen name="ChoosingGame" component={ChoosingGame} options={{headerShown:false}}/>
          {/* 호스트 마이페이지 */}
          <Stack.Screen name="EditStoreMypage" component={EditStoreMypage} options={{headerShown:false}}/>
          <Stack.Screen name="EditMypage" component={EditMypage} options={{headerShown:false}}/>
          <Stack.Screen name="EditStoreAddress" component={EditStoreAddress} options={{headerShown:false}}/>
          <Stack.Screen name="SliderScreen" component={SliderScreen} options={{headerShown:false}}/>

          {/*사장님 마이홈*/}
          <Stack.Screen name="MyHome" component={MyHome} options={{headerShown:false}}/>
          <Stack.Screen name="MyHomeEdit" component={MyHomeEdit} options={{headerShown:false}}/>

          {/* 사용자 마이홈 */}
          <Stack.Screen name="UserMyHome" component={UserMyHome} options={{headerShown:false}}/>

          {/* 유저 인증 절차 */}
          <Stack.Screen name="SelectUserLocation" component={SelectUserLocation} options={{headerShown:false}}/>
          <Stack.Screen name="HostPhoneNumber" component={HostPhoneNumber} options={{headerShown:false}}/>
          

        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </AuthProvider>
  );
}