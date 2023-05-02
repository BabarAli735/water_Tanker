import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../common/responsiveFunction';
import {COLORS, FONTFAMILY} from '../constants/theme';
export default function CustomModal({
  visible,
  options,
  setVisible,
  handleImageData,
  multipe,
}) {
  const {height} = Dimensions.get('screen');
  const startPointY = options?.from === 'top' ? -height : height;
  const transY = useRef(new Animated.Value(0));

  const profilePicture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      multiple: true,
    }).then(res => {
      Animated.timing(transY.current, {
        toValue: startPointY,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
      setVisible(false);
      handleImageData(res,'camera');
    });
  };

  const profilePictureView = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(res => {
      Animated.timing(transY.current, {
        toValue: startPointY,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
      setVisible(false);
      handleImageData(res,'gallery');
    });
  };
  const selectMultiplePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      multiple: true,
    }).then(res => {
      Animated.timing(transY.current, {
        toValue: startPointY,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
      setVisible(false);
      handleImageData(res);
    });
  };
  useEffect(() => {
    if (visible) {
      console.log('jjj', visible);
      startAnimation(0);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      setVisible(false);
      Animated.timing(transY.current, {
        toValue: startPointY,
        duration: 0,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, []);

  const startAnimation = toValue => {
    Animated.timing(transY.current, {
      toValue,
      duration: 350,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const onPress = () => {
    setVisible(false);
    Animated.timing(transY.current, {
      toValue: startPointY,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const generateBackgroundOpacity = () => {
    if (startPointY >= 0) {
      return transY.current.interpolate({
        inputRange: [0, startPointY],
        outputRange: [0.8, 0],
        extrapolate: 'clamp',
      });
    } else {
      return transY.current.interpolate({
        inputRange: [startPointY, 0],
        outputRange: [0, 0.8],
        extrapolate: 'clamp',
      });
    }
  };

  return (
    <>
      <Animated.View
        style={[styles.container, {transform: [{translateY: transY.current}]}]}>
        <View style={[styles.modalView, {}]}>
          <View style={styles.closeIconContainer}>
            <Text style={styles.txt}>Choose your action</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
              <MaterialIcons name="close" size={rf(3)} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => profilePicture()}>
              <View style={{alignItems: 'center'}}>
                <Entypo name="camera" size={rf(5)} color={COLORS.primary} />
                <Text style={styles.txt2}>Camera</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                multipe ? selectMultiplePhoto() : profilePictureView()
              }>
              <View style={{alignItems: 'center'}}>
                <MaterialIcons
                  name="photo"
                  size={rf(5)}
                  color={COLORS.primary}
                />
                <Text style={styles.txt2}>Gallery</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  innerContainer: {
    // width: '70%',
    // height: '20%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: wp('3%'),
    borderTopRightRadius: wp('3%'),
    padding: wp(3),
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  txt: {
    fontSize: rf(2),
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
  },
  txt2: {
    fontSize: rf(1.5),
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
  },
  iconContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    marginVertical: hp('2%'),
  },
  closeIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
