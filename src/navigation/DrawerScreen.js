import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../common/responsiveFunction';
import {
  COLORS,
  FONTFAMILY,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import Button from '../componant/Button';
import {logOutSlice} from '../redux/slice/auth';
import {getProfile} from '../redux/slice/profile';
import {image_url} from '../api';

export default function DrawerScreen({navigation}) {
  const dispatch = useDispatch();
  const scale = useSharedValue(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const userData = useSelector(state => state.authReducer.userData);
  const profileData = useSelector(state => state.profileReducer.profileData);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopRightRadius: 20,
        borderBottomRightRadius: SIZES.twenty,
      }}>
      {/* Start of Top Container of User */}
      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: COLORS.white,
          paddingTop: 10,
          paddingVertical: 20,
        }}
        onPress={() => {}}>
        <View style={[STYLES.drawerItem, {alignItems: 'center'}]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate(SCREENS.Profile);
            }}>
            <Image
              style={styles.imageDriver}
              source={
                profileData?.photo !== undefined
                  ? {uri: image_url + profileData?.photo}
                  : IMAGES.user1
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text
            style={[
              {
                color: COLORS.black,
                fontFamily: FONTFAMILY.Medium,
                marginVertical: hp('1%'),
              },
            ]}>
            {profileData?.name}
          </Text>
          <Text numberOfLines={1} style={[{color: COLORS.brownGrey}]}>
            {profileData?.email}
          </Text>
        </View>
      </TouchableOpacity>
      {/* End of Top Container of User */}
      <View
        style={{
          paddingHorizontal: SIZES.ten,
          paddingTop: SIZES.ten,
        }}>
        <DrawerItems
          onPress={() => navigation.navigate(SCREENS.Profile)}
          name={'Profile'}
          icon={'ios-person-outline'}
        />
        <DrawerItems
          onPress={() => navigation.navigate(SCREENS.MyOrder)}
          name={'My Order'}
          icon={'reader-outline'}
        />
        <DrawerItems
          onPress={() => navigation.navigate(SCREENS.ChatScreen)}
          name={'Chat'}
          icon={'reader-outline'}
        />
        <DrawerItems
          onPress={() => navigation.navigate(SCREENS.Profile)}
          name={'Logout'}
          icon={'log-out-outline'}
        />
      </View>
      <ShowLogoutModal
        isVisible={showLogoutModal}
        scale={scale}
        setShowLogoutModal={setShowLogoutModal}
      />
    </View>
  );
}

const DrawerItems = memo(({onPress, name, icon}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        STYLES.drawerItem,
        {
          marginTop: hp('2%'),
        },
      ]}
      onPress={onPress}>
      <View
        style={{
          alignSelf: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Ionicons
          name={icon}
          style={[{color: COLORS.black, fontSize: rf(3)}]}
        />
        <Text style={[{color: COLORS.black, marginStart: wp('1%')}]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
const ShowLogoutModal = memo(({isVisible, setShowLogoutModal, scale, item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(state => state.authReducer.userData);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  }, []);
  return (
    <Modal visible={isVisible} transparent={true}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => {
          scale.value = withTiming(0, {duration: 1000});
          setTimeout(() => {
            setShowLogoutModal(false);
          }, 1000);
        }}>
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
                width: wp('70%'),
                backgroundColor: COLORS.white,
                borderRadius: wp(3),
                overflow: 'hidden',
              },
            ]}>
            <Text
              style={[
                styles.txt1,
                {
                  fontFamily: FONTFAMILY.Bold,
                  fontSize: rf(2),
                  color: COLORS.black,
                  marginTop: hp('2%'),
                  textAlign: 'center',
                },
              ]}>
              Are You Sure ?
            </Text>
            <Text
              style={[
                styles.txt1,
                {
                  fontFamily: FONTFAMILY.Bold,
                  fontSize: rf(1.8),
                  color: COLORS.black,
                  textAlign: 'center',
                  marginTop: hp('1%'),
                },
              ]}>
              Do you want to logout
            </Text>
            <View
              style={[
                {
                  paddingHorizontal: wp('3%'),
                  paddingVertical: hp('2%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <Button
                title={'Yes'}
                style={{width: wp('25%'), height: hp('6.5%')}}
                onPress={async () => {
                  scale.value = withTiming(0, {duration: 1000});
                  setTimeout(() => {
                    setShowLogoutModal(false);
                  }, 1000);
                  const data = {
                    id: userData.user._id,
                  };
                  console.log(data);
                  const responce = await dispatch(logOutSlice(data));
                  if (!responce.error) {
                    navigation.navigate(SCREENS.OnBoardScreen);
                  }
                }}
              />
              <Button
                title={'No'}
                style={{width: wp('25%'), height: hp('6.5%')}}
                onPress={() => {
                  scale.value = withTiming(0, {duration: 1000});
                  setTimeout(() => {
                    setShowLogoutModal(false);
                  }, 1000);
                }}
              />
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});
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
    height: wp('30%'),
    width: wp('30%'),
    borderRadius: wp('30%'),
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
