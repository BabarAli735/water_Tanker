import * as React from 'react';
import {COLORS, SCREENS} from '../constants/theme';
import DriverHomeScreen from '../screens/Driver/Home';
import HomeScreen from '../screens/User/Home/HomeScreen';
import DrawerScreen from './DrawerScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AntiDesign from 'react-native-vector-icons/AntDesign';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function DrawerNavigator() {
  const navRef = React.useRef();
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  const userData = useSelector(state => state.authReducer.userData);

  let user=userData?.data?userData.data.user:userData.user
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerType="front"
      drawerStyle={{
        width: '75%',
        backgroundColor: 'transparent',
      }}
      // drawerContentOptions={{
      //   itemStyle: { marginVertical: 5 },
      // }}
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerShadowVisible: false,
      }}
      drawerContent={props => <DrawerScreen {...props} />}>
      {user.type === 'Driver' ? (
        <Drawer.Screen
          name={SCREENS.DriverHomeScreen}
          component={DriverHomeScreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <AntiDesign
                name="menuunfold"
                color={COLORS.white}
                size={20}
                style={{paddingLeft: 10}}
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            ),
          }}
        />
      ) : (
        <Drawer.Screen
          name={SCREENS.HomeScreen}
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerLeft: () => (
              <AntiDesign
                name="menuunfold"
                color={COLORS.white}
                size={20}
                style={{paddingLeft: 10}}
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
