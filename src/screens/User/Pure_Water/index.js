import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY} from '../../../constants/theme';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../../../common/responsiveFunction';
import EditText from '../../../componant/EditText';
import Button from '../../../componant/Button';
export default function Pure_Water({navigation}) {
  return (
    <ScrollView style={styles.continer}>
      <Text style={[styles.txt3]}>Name</Text>
      <EditText placeholder={'Enter Your Name'} />
      <Text style={[styles.txt3]}>Address</Text>
      <EditText placeholder={'Enter Your Address'} />
      <Text style={[styles.txt3]}>City</Text>
      <EditText placeholder={'Enter Your City'} />
      <Text style={[styles.txt3]}>ZipCode</Text>
      <EditText placeholder={'Enter Your Zip Code'} />
      <Text style={[styles.txt3]}>Quantity</Text>
      <EditText placeholder={'Enter Water Quantity'} />
      <Text style={[styles.txt3]}>Company</Text>
      <EditText placeholder={'Enter Water Company Name'} />
      <Button
        title="Book"
        style={{marginTop: hp('4%')}}
        onPress={() => {
          navigation.goBack();
        }}
      />
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
