import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Animated,
  Text,
} from 'react-native';
import Button from '../../componant/Button';
import {COLORS, FONTFAMILY, IMAGES, SCREENS} from '../../constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from '../../common/responsiveFunction';

export default function OnBoardScreen({navigation}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width} = useWindowDimensions();
  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const onViewRef = React.useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const RendorOnBoard = ({item, index}) => {
    return (
      <View
        style={{
          flex: 0.8,
          width,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            height: hp('35%'),
            width: wp('90%'),
            alignSelf: 'center',
            marginTop: hp('2%'),
          }}>
          <Image
            source={item.image}
            style={{height: '100%', width: '100%'}}
            resizeMode={'contain'}
          />
        </View>

        <View style={{}}>
          <Text
            style={[
              {
                textAlign: 'center',
                color: COLORS.black,
                marginTop: hp('8%'),
                width: '80%',
                alignSelf: 'center',
                fontSize: rf(2.5),
                fontFamily: FONTFAMILY.Bold,
              },
            ]}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const Pagignator = ({data, scrollX}) => {
    return (
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          height: 30,
          alignSelf: 'center',
        }}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 20],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  backgroundColor: COLORS.primary,
                  width: dotWidth,
                  opacity: opacity,
                },
              ]}
              key={i.toString()}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: COLORS.white,
        },
      ]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={[
              {
                textAlign: 'center',
                fontFamily: FONTFAMILY.Bold,
                color: COLORS.black,
                fontSize: rf(2),
              },
            ]}>
            ON DEMAND WATER TANKER
          </Text>
        </View>
        <FlatList
          horizontal
          data={Data}
          renderItem={RendorOnBoard}
          keyExtractor={item => item.id}
          contentContainerStyle={{}}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          showsHorizontalScrollIndicator={false}
          ref={slideRef}
        />
      </View>

      <Pagignator data={Data} scrollX={scrollX} />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 0.4,
          paddingHorizontal: wp('3%'),
          flexDirection: 'row',
        }}>
        <Button
          onPress={() => {
            navigation.navigate(SCREENS.Login, {
              from: currentIndex === 0 ? 'Driver' : 'User',
            });
          }}
          title={'Login'}
          style={{width: wp('40%')}}
        />
        <Button
          title={'SignUp'}
          style={{width: wp('40%'), marginLeft: wp('5%')}}
          onPress={() => {
            navigation.navigate(SCREENS.SighnUp, {
              from: currentIndex === 0 ? 'Driver' : 'User',
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  loginBtnBg: {
    width: '70%',
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Data = [
  {
    id: 1,
    title: 'Schedule Fuel Delivery',
    description: 'SIGNUP AS DRIVER',
    image: IMAGES.tankerimg,
  },
  {
    id: 2,
    title: 'Schedule Fuel Delivery',
    description: 'SIGNUP AS USER',
    image: IMAGES.user1,
  },
];
