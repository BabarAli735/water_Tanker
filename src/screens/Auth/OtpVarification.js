import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {COLORS, FONTFAMILY, SCREENS, SIZES} from '../../constants/theme';
import {
  responsiveFontSize as rf,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../common/responsiveFunction';
import {useDispatch, useSelector} from 'react-redux';

import utils from '../../utills';
import {useCallback} from 'react';
import Button from '../../componant/Button';
import { OtpVarification } from '../../redux/slice/auth';
import utills from '../../utills';
import { CommonActions } from '@react-navigation/native';
export default function OtpVerification({route, navigation}) {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const handleSignResendOtp = async () => {
    const data = {
      email: route.params.email,
      otp: code,
    };
    const otpresponse = await dispatch(OtpVarification(data));
    console.log('otoresponse', otpresponse);
    if (!otpresponse.error) {
      utills.successAlert('', 'Email Varify Successfuly');
      setTimeout(() => {
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: SCREENS.HomeScreen,
                },
              ],
            })
          );
      }, 500);
    }
  };

  const handleOtpChange = useCallback(
    code => {
      setCode(code);
    },
    [code],
  );
  console.log('OtpVerification======render');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.twenty,
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* ======================== LOGIN SIGHNUP VIW START ======================== */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZES.twentyFive,
          }}></View>
        {/* ======================== LOGIN SIGHNUP VIW END ======================== */}

        <Text
          style={[
            {
              marginTop: SIZES.twenty * 2,
              color: COLORS.black,
              fontFamily: FONTFAMILY.Regular,
              fontSize: rf(1.5),
            },
          ]}>
          Please check the OTP sent to your email
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp('3%'),
          }}></View>
        <Text
          style={[
            {
              color: COLORS.brownGrey,
              fontFamily: FONTFAMILY.Medium,
              fontSize: rf(2),
              marginTop: hp('4%'),
            },
          ]}>
          Enter OTP
        </Text>
        <View
          style={{
            flex: 1,
            paddingHorizontal: wp('7%'),
          }}>
          <OTPInputView
            style={{
              flex: 0.35,
              marginTop: hp('3%'),
            }}
            pinCount={4}
            code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={setCode}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              // console.log(`Code is ${code}, you are good to go!`);
            }}
          />
        </View>
      </View>

      {/* ======================== SIGHNUP/LOGIN BUTTON VIEW START ======================== */}

      <View style={{flex: 0.3}}>
        <Button title={'Sign Up'} onPress={handleSignResendOtp} />
      </View>
      {/* ======================== SIGHNUP/LOGIN BUTTON VIEW END ======================== */}
    </View>
  );
}

const styles = StyleSheet.create({
  underlineStyleBase: {
    borderBottomWidth: 2,
    height: hp('10%'),
    borderColor: COLORS.white,
    borderBottomColor: COLORS.black,
    fontSize: SIZES.twentyFive,
    color: COLORS.black,
    fontFamily: FONTFAMILY.Light,
  },
  underlineStyleHighLighted: {
    width: SIZES.fifty,
    height: hp('10%'),
    borderBottomWidth: 2,
    borderColor: COLORS.white,
    borderBottomColor: COLORS.primary,
    fontSize: SIZES.twentyFive,
    fontFamily: FONTFAMILY.Light,
  },
});
