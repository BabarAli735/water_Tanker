import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS, SCREENS} from '../constants/theme';
import SingIn from '../screens/Auth/SingIn';
import SignUp from '../screens/Auth/SignUp';
import HomeScreen from '../screens/Home/HomeScreen';

import AntiDesign from 'react-native-vector-icons/AntDesign';
import BookTanker from '../screens/BookTankerScreen/BookTanker';
import Pure_Water from '../screens/Pure_Water';
import OnBoardScreen from '../screens/Auth/OnBoardingScreen';
import GooglePlacesInput from '../componant/GooglePlacesInput';
import SplashScreen from '../screens/Auth/SplashScreen';
import OtpVerification from '../screens/Auth/OtpVarification';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerShadowVisible: false,
        }}>
        <Stack.Screen name={SCREENS.SplashScreen} component={SplashScreen} />
        <Stack.Screen name={SCREENS.OnBoardScreen} component={OnBoardScreen} />
        <Stack.Screen name={SCREENS.OtpVerification} component={OtpVerification} />
        <Stack.Screen name={SCREENS.Login} component={SingIn} />
        <Stack.Screen name={SCREENS.SighnUp} component={SignUp} />
        <Stack.Screen name={SCREENS.BookTanker} component={BookTanker} />
        <Stack.Screen name={SCREENS.Pure_Water} component={Pure_Water} />
        <Stack.Screen name={SCREENS.GooglePlacesInput} component={GooglePlacesInput} />
        <Stack.Screen
          name={SCREENS.HomeScreen}
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <AntiDesign name="menuunfold" color={COLORS.white} size={20} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
