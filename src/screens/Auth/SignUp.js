import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';

import {COLORS, FONTFAMILY, SCREENS} from '../../constants/theme';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../../common/responsiveFunction';
import EditText from '../../componant/EditText';
import Button from '../../componant/Button';
import Seperator from '../../componant/Seperator';
import SocialButtons from '../../componant/SocialButtons';
import utills from '../../utills';
import {useDispatch, useSelector} from 'react-redux';
import {RegisterSlice, SendOtp} from '../../redux/slice/auth';
import axios from 'axios';

export default function SignUp({navigation, route}) {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const SelectedLocation = useSelector(state => state.authReducer.location);
  const [signUpData, setSignUpData] = useState({
    userName: 'abcefg',
    email: 'babarAli@gmail.com',
    password: '12345',
    confirmPassword: '12345',
    location: 'abcdefg',
    lat: 1235,
    long: 12345,
    type: 'user',
  });
  console.log(route.params);
  useEffect(() => {
    if (SelectedLocation !== null) {
      handleChange({
        location: SelectedLocation?.formatted_address,
        lat: SelectedLocation?.geometry.location.lat,
        long: SelectedLocation?.geometry.location.lng,
      });
    }
  }, [SelectedLocation]);
  // console.log('route===',route.params);
  const handleChange = useCallback(
    value => {
      setSignUpData(state => ({...state, ...value}));
    },
    [setSignUpData],
  );

  const onSubmit = useCallback(async () => {
    console.log('====', signUpData);
    if (utills.isEmptyOrSpaces(signUpData.userName)) {
      utills.errorAlert('', 'Please Enter User Name');
      return;
    }
    if (!utills.validateEmail(signUpData.email)) {
      utills.errorAlert('', 'Please Enter a valid Email');
      return;
    }
    if (utills.isEmptyOrSpaces(signUpData.location)) {
      utills.errorAlert('', 'Please Select Location');
      return;
    }
    if (utills.isEmptyOrSpaces(signUpData.password)) {
      utills.errorAlert('', 'Please Enter Password');
      return;
    }
    if (signUpData.confirmPassword !== signUpData.password) {
      utills.errorAlert('', `Confirm Password deosn't match`);
      return;
    }
    const response = await dispatch(RegisterSlice(signUpData));
    if (!response.error) {
      const data = {
        email: signUpData.email,
      };
      const otoresponse = await dispatch(SendOtp(data));
      console.log('otoresponse',otoresponse);
      if (!otoresponse.error) {
        utills.successAlert('', 'Varification Otp sent to your account');
        setTimeout(() => {
          navigation.navigate(SCREENS.OtpVerification,{
            email:signUpData.email
          });
        }, 500);
      }
    }
  }, [signUpData]);
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <Text style={[styles.txt]}>Get Started</Text>

      <Text style={[styles.txt1]}>Create an account to continue.</Text>

      <EditText
        placeholder={'Username'}
        onChangeText={value => {
          handleChange({userName: value});
        }}
      />
      <EditText
        placeholder={'Email'}
        onChangeText={value => {
          handleChange({email: value});
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(SCREENS.GooglePlacesInput);
        }}>
        <EditText
          placeholder={
            signUpData.location !== null
              ? signUpData.location
              : 'Select Location'
          }
          disable
        />
      </TouchableOpacity>
      <EditText
        placeholder={'Password'}
        password
        icon
        onChangeText={value => {
          handleChange({password: value});
        }}
      />
      <EditText
        placeholder={'Confirm Password'}
        password
        icon
        onChangeText={value => {
          handleChange({confirmPassword: value});
        }}
      />
      <Button
        title="Sign up"
        style={{marginTop: hp('3%')}}
        onPress={onSubmit}
      />

      <Seperator />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <SocialButtons google />
        <SocialButtons facebook />
      </View>

      <View style={styles.alreadyAccountContainer}>
        <Text style={styles.txt2}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREENS.Login,{
              from: route.params.from==='Driver'? 'Driver' : 'User',
            });
          }}>
          <Text style={{color: COLORS.primary, fontWeight: '700'}}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp('3%'),
  },
  txt: {
    color: COLORS.black,
    fontSize: rf(2.7),
    fontFamily: FONTFAMILY.Bold,
  },
  txt1: {
    color: COLORS.Greyscale,
    fontSize: rf(1.8),
    fontFamily: FONTFAMILY.Medium,
  },
  txt2: {
    color: COLORS.Greyscale,
    fontSize: rf(1.5),
    fontFamily: FONTFAMILY.Medium,
  },
  alreadyAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
