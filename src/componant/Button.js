import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY} from '../constants/theme';
import { heightPercentageToDP as hp, responsiveFontSize as rf, widthPercentageToDP as wp} from '../common/responsiveFunction';

export default function Button({title,style,onPress}) {
  return (
    <TouchableOpacity style={[styles.container,style]}
    activeOpacity={0.7}
    onPress={onPress}
    >
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingVertical:hp('2%'),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:wp('2%')
  },
  txt:{
    fontSize:rf(2),
    color:COLORS.white,
    fontFamily:FONTFAMILY.SemiBold,
    
  }
});
