import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../common/responsiveFunction';
import {COLORS} from '../constants/theme';

export default function Seperator(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:hp('4%')
      }}>
      <View
        style={{flex: 1, height: hp(0.2), backgroundColor: COLORS.veryLightPink}}
      />
      <Text style={{width: wp(15), textAlign: 'center', color: COLORS.veryLightPink}}>
        OR
      </Text>
      <View
        style={{flex: 1, height: hp(0.2), backgroundColor: COLORS.veryLightPink}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
