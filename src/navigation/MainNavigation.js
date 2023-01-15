
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, SCREENS } from '../constants/theme';
import SingIn from '../screens/Auth/SingIn';
import SignUp from '../screens/Auth/SignUp';
import HomeScreen from '../screens/Home/HomeScreen';

import AntiDesign from 'react-native-vector-icons/AntDesign';
import BookTanker from '../screens/BookTankerScreen/BookTanker';

const Stack = createNativeStackNavigator();

const MainNavigation=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator
      
      screenOptions={{
        headerTitle:'',
        headerStyle:{
          backgroundColor:COLORS.white,
          
        },
        headerShadowVisible:false
        
      }}>
        <Stack.Screen name={SCREENS.Login} component={SingIn} />
        <Stack.Screen name={SCREENS.SighnUp} component={SignUp} />
        <Stack.Screen name={SCREENS.BookTanker} component={BookTanker} />
        <Stack.Screen name={SCREENS.HomeScreen} component={HomeScreen} 
       options={{
        headerStyle:{
          backgroundColor:COLORS.primary
        },
        headerLeft:()=>(
          <AntiDesign name="menuunfold" color={COLORS.white} size={20} />
        )
       }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;