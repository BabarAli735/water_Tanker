import {
    Image,
    Modal,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
  } from 'react-native';
  import React, {memo} from 'react';
  import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
  } from 'react-native-reanimated';
  import {COLORS, IMAGES} from '../constants/theme';
  import {
    heightPercentageToDP as hp,
    responsiveFontSize as rf,
    widthPercentageToDP as wp,
  } from '../common/responsiveFunction';
  import {useSelector} from 'react-redux';
  function LogoLoader() {
    const rotation = useSharedValue(0);
    const {width} = Dimensions.get('window');
    console.log('LogoLoader render');
    const isLoading = useSelector(state => state.authReducer.isLoading);
    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            rotate: `${rotation.value}deg`,
          },
        ],
      };
    }, [rotation.value]);
    React.useEffect(() => {
      console.log('Logo FocusEffect');
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      );
      return () => cancelAnimation(rotation);
    }, []);
    return (
      <Modal visible={isLoading} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: hp('20%'),
              width: wp('40%'),
              backgroundColor: COLORS.white,
              borderRadius: wp(3),
              // flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <ActivityIndicator size={'large'} color={COLORS.primary} /> */}
  
            {/* <Image
              source={IMAGES.loading}
              style={{maxWidth: width-112, resizeMode:'contain', maxHeight: 300}}
              resizeMode="contain"
            /> */}
            <Animated.View
              style={[
                {
                  borderColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: wp('22%'),
                  width: wp('22%'),
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: wp('22%'),
                  padding: wp('2%'),
                },
                animatedStyles,
              ]}>
              <Animated.View
                style={[
                  {
                    borderColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: wp('15%'),
                    width: wp('15%'),
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderRadius: wp('20%'),
                    padding: wp('2%'),
                  },
                  animatedStyles,
                ]}
              />
            </Animated.View>
  
            <Image
              source={IMAGES.tankerimg}
              style={{width: wp('10%'), height: wp('10%'), position: 'absolute'}}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    );
  }
  export default memo(LogoLoader);
  const styles = StyleSheet.create({});
  