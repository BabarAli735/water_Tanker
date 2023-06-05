import {
    Dimensions,
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useCallback, forwardRef, useImperativeHandle} from 'react';
  import {COLORS, FONTFAMILY, IMAGES, STYLES} from '../constants/theme';
  import {
    heightPercentageToDP as hp,
    responsiveFontSize as rf,
    widthPercentageToDP as wp,
  } from '../common/responsiveFunction';
  import {Gesture, GestureDetector} from 'react-native-gesture-handler';
  import Animated, {
    event,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
  } from 'react-native-reanimated';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  const {width, height: SCREEN_HEIGHT} = Dimensions.get('window');
  const BottomSheet = forwardRef((props, ref) => {
    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const active = useSharedValue(false);
    const context = useSharedValue({y: 0});
    const scrollTo = useCallback(destination => {
      'worklet';
      active.value = !destination == 0;
      translateY.value = withSpring(destination, {damping: 50});
    }, []);
    const isActive = useCallback(() => {
      if (active.value === true) {
        opacity.value = withTiming(0, {duration: 100});
      } else {
        opacity.value = withTiming(1, {duration: 2000});
      }
      return active.value;
    }, []);
    useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo]);
    const gesture = Gesture.Pan()
      .onStart(event => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(event => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(0);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });
    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );
      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });
  
    const rListItemStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });
  
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.BottomSheetContainer, rBottomSheetStyle, STYLES.shadow]}>
          <ImageBackground
            source={IMAGES.logoGliston}
            style={[
              {
                opacity: 0.2,
                marginBottom: 200,
              },
              StyleSheet.absoluteFillObject,
            ]}
            resizeMode={'contain'}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: hp('2%'),
            }}>
            <Text style={styles.txt}>Select</Text>
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                scrollTo(0);
              }}>
              <AntDesign name="close" color={COLORS.black} size={rf(3)} />
            </TouchableOpacity>
          </View>
  
          <FlatList
            data={props.data}
            contentContainerStyle={{
              paddingBottom:hp('3%')
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {  
                    props.onSelectItem(item);
                    scrollTo(0)
                  }}>
                  <Animated.View
                    style={[styles.renderItemContainer, rListItemStyle]}>
                    <Text style={{color: COLORS.black}}>{item.title}</Text>
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
          />
        </Animated.View>
      </GestureDetector>
    );
  });
  
  const styles = StyleSheet.create({
    BottomSheetContainer: {
      height: SCREEN_HEIGHT,
      width: '100%',
      backgroundColor: COLORS.white,
      position: 'absolute',
      top: SCREEN_HEIGHT,
  
      paddingHorizontal: wp('2%'),
  
      // borderTopRightRadius: wp('5%'),
      // borderTopLeftRadius: wp('5%'),
    },
    line: {
      height: 4,
      width: 100,
      backgroundColor: COLORS.Greyscale,
      alignSelf: 'center',
      marginTop: hp('2%'),
    },
    renderItemContainer: {
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: COLORS.Greyscale,
      height: hp('5%'),
    },
    close: {
      position: 'absolute',
      right: 10,
    },
    txt: {
      color: COLORS.black,
      fontFamily: FONTFAMILY.Bold,
      fontSize: rf(2.5),
      alignSelf: 'center',
    },
  });
  export default BottomSheet;