import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, FONTFAMILY} from '../../../constants/theme';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../../../common/responsiveFunction';
import EditText from '../../../componant/EditText';
import Button from '../../../componant/Button';
import {useDispatch, useSelector} from 'react-redux';
import utills from '../../../utills';
import {SavePureWaterOrder} from '../../../redux/slice/order';
export default function Pure_Water({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authReducer.userData);
  const [orderData, setOrderData] = useState({
    name: '',
    address: '',
    city: '',
    zipcode: '',
    quantity: '',
    company: '',
    email: '',
    phone: '',
    userId: userData.user._id,
  });

  const handleChange = useCallback(
    value => {
      setOrderData(state => ({...state, ...value}));
    },
    [setOrderData],
  );

  const onPress = useCallback(async () => {
    if (utills.isEmptyOrSpaces(orderData.name)) {
      utills.errorAlert('', 'Please enter user name');
      return;
    }
    if (!utills.validateEmail(orderData.email)) {
      utills.errorAlert('', 'Please enter a valid email');
      return;
    }
    if (orderData.phone.length < 11 || orderData.phone.length > 11) {
      utills.errorAlert('', 'Please enter a valid phone number');
      return;
    }
    if (utills.isEmptyOrSpaces(orderData.address)) {
      utills.errorAlert('', 'Please select location');
      return;
    }
    if (utills.isEmptyOrSpaces(orderData.city)) {
      utills.errorAlert('', 'Please enter city');
      return;
    }
    if (utills.isEmptyOrSpaces(orderData.zipcode)) {
      utills.errorAlert('', 'Please enter zipcode');
      return;
    }
    if (utills.isEmptyOrSpaces(orderData.quantity)) {
      utills.errorAlert('', 'Please enter Quantity');
      return;
    }
    if (utills.isEmptyOrSpaces(orderData.company)) {
      utills.errorAlert('', 'Please enter company name');
      return;
    }
    const responce = await dispatch(SavePureWaterOrder(orderData));
    if (!responce.error) {
      utills.successAlert('', 'Your Order has been Submitted successfuly');
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  }, [orderData]);
  return (
    <ScrollView
      style={styles.continer}
      contentContainerStyle={{
        paddingBottom: hp('5%'),
      }}>
      <Text style={[styles.txt3]}>Name</Text>
      <EditText
        placeholder={'Enter Your Name'}
        onChangeText={value => handleChange({name: value})}
      />
      <Text style={[styles.txt3]}>Email</Text>
      <EditText
        placeholder={'Enter Your Email'}
        onChangeText={value => handleChange({email: value})}
      />
      <Text style={[styles.txt3]}>Phone</Text>
      <EditText
        placeholder={'Enter Your Phone Number'}
        keyboardType="number-pad"
        length={11}
        onChangeText={value => handleChange({phone: value})}
      />
      <Text style={[styles.txt3]}>Address</Text>
      <EditText
        placeholder={'Enter Your Address'}
        onChangeText={value => handleChange({address: value})}
      />
      <Text style={[styles.txt3]}>City</Text>
      <EditText
        placeholder={'Enter Your City'}
        onChangeText={value => handleChange({city: value})}
      />
      <Text style={[styles.txt3]}>ZipCode</Text>
      <EditText
        placeholder={'Enter Your Zip Code'}
        keyboardType="number-pad"
        length={6}
        onChangeText={value => handleChange({zipcode: value})}
      />
      <Text style={[styles.txt3]}>Quantity</Text>
      <EditText
        placeholder={'Enter Water Quantity'}
        keyboardType="number-pad"
        length={5}
        onChangeText={value => handleChange({quantity: value})}
      />
      <Text style={[styles.txt3]}>Company</Text>
      <EditText
        placeholder={'Enter Water Company Name'}
        onChangeText={value => handleChange({company: value})}
      />
      <Button title="Book" style={{marginTop: hp('4%')}} onPress={onPress} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp('3%'),
  },
  txt3: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(2),
    marginTop: hp('1%'),
  },
});
