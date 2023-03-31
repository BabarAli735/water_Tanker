import React, {memo, useEffect} from 'react';
import {StyleSheet, View, Image, Modal} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../../common/responsiveFunction';
import {COLORS, CONSTANTS, IMAGES, SCREENS} from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {saveUser} from '../../redux/slice/auth';
export default function SplashScreen({navigation}) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const dispatch = useDispatch();
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  }, []);
  useEffect(() => {
    scale.value = withTiming(1, {duration: 2000, easing: Easing.linear});
    opacity.value = withTiming(0.3, {duration: 1000, easing: Easing.linear});
    getUserData();
  }, []);
  const getUserData = async () => {
    const value = await AsyncStorage.getItem(CONSTANTS.UserData);
    const userData = JSON.parse(value);
    if (userData !== null && userData !== undefined) {
      dispatch(saveUser(userData));
      console.log(userData);
      if (userData.type === 'Driver') {
        navigateTo(SCREENS.DriverHomeScreen)
      } else {
        navigateTo(SCREENS.HomeScreen)
      }
    }else{
      navigateTo(SCREENS.OnBoardScreen)
    }
  };

  const navigateTo=(screen)=>{
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name:screen}],
        }),
      );
    }, 2000);
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animationContainer, rStyle]}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 250,
            width: 250,
            height: 250,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 200,
              width: 200,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                opacity: 0.7,
                borderRadius: 150,
                width: 150,
                height: 150,
              }}></View>
          </View>
        </View>
      </Animated.View>
      <Animated.Image
        source={IMAGES.tankerimg}
        style={[styles.logo, rStyle]}
        resizeMode={'contain'}
      />
    </View>
  );
}
const LogoModal = memo(({isVisible, scale}) => {
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
          justifyContent: 'center',
        }}>
        <Animated.View
          style={[
            rStyle,
            {
              width: wp('90%'),
              backgroundColor: COLORS.white,
              borderRadius: wp(3),
              paddingHorizontal: wp('3%'),
              paddingVertical: hp('2%'),
            },
          ]}>
          <Image
            source={IMAGES.logoGliston}
            style={{width: 400, height: 200}}
            resizeMode={'contain'}
          />
        </Animated.View>
      </View>
    </Modal>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('90%'),
    width: wp('90%'),
    height: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 100,
    position: 'absolute',
  },
});
