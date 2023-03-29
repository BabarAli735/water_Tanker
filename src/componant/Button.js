import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY} from '../constants/theme';
import { heightPercentageToDP as hp, responsiveFontSize as rf, widthPercentageToDP as wp} from '../common/responsiveFunction';
import { useSelector } from 'react-redux';

export default function Button({title,style,onPress}) {
  const isLoading = useSelector(state => state.authReducer.isLoading);

  return (
    <TouchableOpacity style={[styles.container,style]}
    activeOpacity={0.7}
    onPress={onPress}
    disabled={isLoading}
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
