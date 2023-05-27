import * as React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS, FONTFAMILY, IMAGES, SCREENS, STYLES} from '../constants/theme';
import messaging from '@react-native-firebase/messaging';
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../common/responsiveFunction';
import SingIn from '../screens/Auth/SingIn';
import SignUp from '../screens/Auth/SignUp';
import BookTanker from '../screens/User/BookTankerScreen/BookTanker';
import Pure_Water from '../screens/User/Pure_Water';
import OnBoardScreen from '../screens/Auth/OnBoardingScreen';
import GooglePlacesInput from '../componant/GooglePlacesInput';
import SplashScreen from '../screens/Auth/SplashScreen';
import OtpVerification from '../screens/Auth/OtpVarification';
import DriverHomeScreen from '../screens/Driver/Home';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Button from '../componant/Button';
import DrawerNavigator from './drawer';
import {useDispatch, useSelector} from 'react-redux';
import {ChangeOrderStatus, getOrder} from '../redux/slice/order';
import {SaveFcm} from '../redux/slice/auth';
import utills from '../utills';
import Profile from '../screens/Profile';
import { getProfile } from '../redux/slice/profile';
import MyOrder from '../screens/Order/MyOrder';
import ChatScreen from '../screens/Chat';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const scale = useSharedValue(0);
  const [showDriver, setShowDriver] = React.useState(false);
  const userData = useSelector(state => state.authReducer.userData);
  let user=userData?.data?userData?.data?.user:userData?.user
  React.useEffect(() => {
    if (userData !== null) {
      notificationListener();
      requestUserPermission(user._id);
    }
  }, [userData]);

  const requestUserPermission = async userId => {
    // console.log('requestUserPermission ======= >>>>>>>>>>> ');
    //   Firebase();
    dispatch(getProfile(user._id));
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      try {
        messaging()
          .getToken()
          .then(token => {
            SetFcmToken(userId, token);
          });
        messaging().onTokenRefresh(token => {
          SetFcmToken(userId, token);
        });
      } catch (error) {}
    }
  };
  const SetFcmToken = async (userId, fcmToken) => {
    // console.log('set fcm token ==========>', token);

    let data = {
      driverId: userId,
      fcmToken: fcmToken,
    };

    dispatch(SaveFcm(data));
  };
  const notificationListener = async () => {
    messaging().onNotificationOpenedApp(rm => {
      console.log('Notification caused app to open from background', rm);
    });

    // Check forGround
    messaging().onMessage(async rm => {
      console.log('Notification in foreground', rm);
      try {
        if (user?.type === 'User') {
          utills.successAlert('', rm.notification.body);
        }
        if (user?.type === 'Driver') {
          await dispatch(getOrder(rm.data.orderData));
          setShowDriver(true);
          scale.value = withTiming(1, {duration: 2000});
        }
      } catch (e) {
        console.log('eeee', e);
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(rm => {
        console.log('Notification in getInitialNotification', rm);
        // navref?.current?.navigate(SCREENS.MyOrder)
      })
      .catch(error => {
        console.log('getInitialNotification ======> ', error);
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled ======++++++', remoteMessage);
      if (userData.data? userData.data?.user.type:userData.user.type === 'Driver') {
        setShowDriver(true);
        scale.value = withTiming(1, {duration: 2000});
      }
    });
  };

  return (
    <>
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
          <Stack.Screen
            name={SCREENS.OnBoardScreen}
            component={OnBoardScreen}
          />
          <Stack.Screen
            name={SCREENS.OtpVerification}
            component={OtpVerification}
          />
          <Stack.Screen name={SCREENS.Login} component={SingIn} />
          <Stack.Screen name={SCREENS.SighnUp} component={SignUp} />
          <Stack.Screen name={SCREENS.BookTanker} component={BookTanker} />
          <Stack.Screen name={SCREENS.Pure_Water} component={Pure_Water} />
          <Stack.Screen name={SCREENS.Profile} component={Profile} />
          <Stack.Screen name={SCREENS.MyOrder} component={MyOrder} />
          <Stack.Screen name={SCREENS.ChatScreen} component={ChatScreen} />
          <Stack.Screen
            name={SCREENS.GooglePlacesInput}
            component={GooglePlacesInput}
          />
          <Stack.Screen
            name={SCREENS.DrawerNavigator}
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <ShowDriverDetailModal
        isVisible={showDriver}
        scale={scale}
        setIsShowNumberModal={setShowDriver}
      />
    </>
  );
};
const ShowDriverDetailModal = React.memo(
  ({isVisible, setIsShowNumberModal, scale, item}) => {
    const dispatch = useDispatch();
    const orderData = useSelector(state => state.orderReducer.orderData);

    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scale.value}],
      };
    }, []);
    return (
      <Modal visible={isVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Animated.View
            style={[
              rStyle,
              {
                width: wp('90%'),
                backgroundColor: COLORS.white,
                borderRadius: wp(3),
                overflow: 'hidden',
              },
            ]}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                alignItems: 'flex-end',
                paddingHorizontal: wp('3%'),
                height: hp('5%'),
              }}></View>
            <Image
              style={styles.imageDriver}
              source={IMAGES.user1}
              resizeMode="contain"
            />

            <View>
              <Text
                style={[
                  styles.txt1,
                  {
                    fontFamily: FONTFAMILY.Bold,
                    fontSize: rf(1.6),
                    color: COLORS.black,
                    marginTop: hp('2%'),
                    textAlign: 'center',
                  },
                ]}>
                {orderData?.OrderData.user.name}
              </Text>
              <Text
                style={[
                  styles.txt1,
                  {
                    fontFamily: FONTFAMILY.Bold,
                    fontSize: rf(1.6),
                    color: COLORS.black,
                    marginTop: hp('2%'),
                    textAlign: 'center',
                    paddingBottom: hp('2%'),
                  },
                ]}>
                {orderData?.OrderData.user.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp('2%'),
                paddingBottom: wp('3%'),
              }}>
              <View>
                <Text
                  style={[
                    styles.txt1,
                    {
                      fontFamily: FONTFAMILY.Bold,
                      fontSize: rf(1.6),
                      color: COLORS.black,
                      marginTop: hp('2%'),
                    },
                  ]}>
                  Amount
                </Text>
                <Text
                  style={[
                    styles.txt1,
                    {
                      fontFamily: FONTFAMILY.Bold,
                      fontSize: rf(1.6),
                      color: COLORS.black,
                      marginTop: hp('2%'),
                    },
                  ]}>
                  Discount
                </Text>
                <Text
                  style={[
                    styles.txt1,
                    {
                      fontFamily: FONTFAMILY.Bold,
                      fontSize: rf(1.6),
                      color: COLORS.black,
                      marginTop: hp('2%'),
                    },
                  ]}>
                  Total Amount
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.txt1,
                    {
                      fontFamily: FONTFAMILY.Bold,
                      fontSize: rf(1.6),
                      color: COLORS.black,
                      marginTop: hp('2%'),
                    },
                  ]}>
                  Rs.{orderData?.OrderData.amount}
                </Text>
                <Text
                  style={[
                    styles.txt1,
                    {
                      fontFamily: FONTFAMILY.Bold,
                      fontSize: rf(1.6),
                      color: COLORS.black,
                      marginTop: hp('2%'),
                    },
                  ]}>
                  Rs.{orderData?.OrderData.discount}
                </Text>
                <Text
                  style={[
                    styles.txt1,
                    {
                      fontFamily: FONTFAMILY.Bold,
                      fontSize: rf(1.6),
                      color: COLORS.black,
                      marginTop: hp('2%'),
                    },
                  ]}>
                  Rs. {orderData?.OrderData.total}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp('2%'),
              }}>
              <Button
                title={
                  orderData?.OrderData.orderStatus === 'pending'
                    ? 'Accept'
                    : 'Complete'
                }
                style={{
                  marginBottom: hp('2%'),
                  width: wp('40%'),
                  backgroundColor: COLORS.trueGreen,
                }}
                onPress={async () => {
                  if (orderData?.OrderData.orderStatus === 'pending') {
                    const data = {
                      id: orderData?.OrderData._id,
                      status: 'accepted',
                    };
                    await dispatch(ChangeOrderStatus(data));
                    dispatch(getOrder(orderData?.OrderData._id));
                  } else {
                    const data = {
                      id: orderData?.OrderData._id,
                      status: 'completed',
                    };
                    await dispatch(ChangeOrderStatus(data));
                    scale.value = withTiming(0, {duration: 2000});
                    setTimeout(() => {
                      setIsShowNumberModal(false);
                    }, 2000);
                  }
                }}
              />
              {orderData?.OrderData.orderStatus !== 'accepted' ? (
                <Button
                  title={'Reject'}
                  style={{
                    marginBottom: hp('2%'),
                    width: wp('40%'),
                    backgroundColor: 'red',
                  }}
                  onPress={async () => {
                    const data = {
                      id: orderData?.OrderData._id,
                      status: 'reject',
                    };
                    await dispatch(ChangeOrderStatus(data));
                    scale.value = withTiming(0, {duration: 2000});
                    setTimeout(() => {
                      setIsShowNumberModal(false);
                    }, 2000);
                  }}
                />
              ) : (
                <Button
                  title={'Sow Route'}
                  style={{
                    marginBottom: hp('2%'),
                    width: wp('40%'),
                  }}
                  onPress={() => {
                    const daddr = `${orderData?.OrderData.to.lat},${orderData?.OrderData.to.long}`;
                    const company = Platform.OS === 'ios' ? 'apple' : 'google';
                    Linking.openURL(
                      `http://maps.${company}.com/maps?daddr=${daddr}`,
                    );
                  }}
                />
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  },
);
export default MainNavigation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('3%'),
  },
  txt: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: rf(2.5),
    marginTop: hp('1.5%'),
  },
  txt1: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.Regular,
    fontSize: rf(1.8),
    marginTop: hp('1.2%'),
  },
  txt2: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: rf(1.5),
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
    width: wp('25%'),
  },
  txt3: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(2),
  },
  txt4: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.Regular,
    fontSize: rf(1.5),
  },
  txt5: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(2),
  },
  txt6: {
    color: COLORS.charcoalGrey,
    fontFamily: FONTFAMILY.Regular,
    fontSize: rf(1.5),
  },
  txt7: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: rf(2),
    marginTop: hp('2%'),
    paddingLeft: wp('3%'),
  },
  buttonContainer: {
    marginTop: hp('5%'),
    paddingBottom: hp('7%'),
  },
  booktankerButton: {
    backgroundColor: COLORS.black,
    width: wp('50%'),
  },
  imageTanker: {
    height: hp('21%'),
    width: wp('30%'),
    position: 'absolute',
    right: 0,
    bottom: -22,
  },
  imageTanker1: {
    height: hp('21%'),
    width: wp('30%'),
  },
  imageDriver: {
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: wp('20%'),
    alignSelf: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  catimage: {
    height: hp('15%'),
    width: wp('15%'),
  },
  catComponant: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whereTo: {
    backgroundColor: COLORS.brownGrey,
    padding: wp('2%'),
    marginTop: hp('2%'),
    marginHorizontal: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  now: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('25%'),
    paddingHorizontal: wp('1.8%'),
    paddingVertical: wp('2%'),
    borderRadius: wp('5%'),
  },
  enterLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
    marginTop: hp('2%'),
  },
  line: {
    height: 1,
    backgroundColor: COLORS.brownGrey,
    marginTop: hp('1%'),
    width: '90%',
    alignSelf: 'center',
  },
});
