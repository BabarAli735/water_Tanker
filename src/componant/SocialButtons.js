import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../common/responsiveFunction';
import {COLORS} from '../constants/theme';
import {GoogleSvg, FacebookSvg} from '../componant/svg';

export default function SocialButtons({facebook}) {
  let Svg = facebook ? FacebookSvg : GoogleSvg;
  return (
    <TouchableOpacity style={styles.socialContainer} activeOpacity={0.7}>
      <Svg />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  socialContainer: {
    paddingHorizontal: Platform.OS === 'android' ? wp('16%') : wp('18%'),
    paddingVertical: hp(2),
    backgroundColor:COLORS.socialBg,
    borderRadius: wp(5),
  },
});
