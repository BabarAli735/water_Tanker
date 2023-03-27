import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import {COLORS, FONTFAMILY, SCREENS} from '../../constants/theme';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../../common/responsiveFunction';

import Seperator from '../../componant/Seperator';
import EditText from '../../componant/EditText';
import Button from '../../componant/Button';
import SocialButtons from '../../componant/SocialButtons';
import {CommonActions} from '@react-navigation/native';
import utills from '../../utills';
import { LoginSlice } from '../../redux/slice/auth';
import { useDispatch } from 'react-redux';
export default function SignIn({navigation, route}) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const [loginData, setLoginata] = useState({
    email: '',
    password: '',
  });
  const handleChange = useCallback(
    value => {
      setLoginata(state => ({...state, ...value}));
    },
    [setLoginata],
  );
  const onSubmit = useCallback(async () => {
 
    if (!utills.validateEmail(loginData.email)) {
      utills.errorAlert('', 'Please Enter a valid Email');
      return;
    }
    if (utills.isEmptyOrSpaces(loginData.password)) {
      utills.errorAlert('', 'Please Enter Password');
      return;
    }
    const response = await dispatch(LoginSlice(loginData));
    if (!response.error) {
      utills.successAlert('', 'Login Successful');
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: SCREENS.HomeScreen
              },
            ],
          })
        );
      }, 500);
     
    }
  }, [loginData]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.txt]}>Lets sign you in </Text>

      <Text style={styles.txt2}>Welcome Back. You've been missed </Text>
      <EditText placeholder={'Email'}   onChangeText={value => {
          handleChange({email: value});
        }}/>
      <EditText placeholder={'Password'} icon password 
        onChangeText={value => {
          handleChange({password: value});
        }}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={{alignSelf: 'flex-end', marginVertical: hp('2%')}}>
        <Text
          style={{
            fontWeight: '700',
            color: COLORS.primary,
            marginTop: hp(0.5),
            marginBottom: hp(2),
          }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <Button
        title="Log In"
        onPress={onSubmit}
      />
      <Seperator />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <SocialButtons />
        <SocialButtons facebook />
      </View>

      <View style={styles.SignUpContainer}>
        <Text style={styles.txt1}>Don't have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate(SCREENS.SighnUp);
          }}>
          <Text style={[styles.txt1, {color: COLORS.primary}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(2.5),
    marginTop: hp('1.5%'),
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
    marginTop: hp('1%'),
  },
  SignUpContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
