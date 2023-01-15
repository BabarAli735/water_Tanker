import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, IMAGES} from '../../constants/theme';
import MapView, {Marker} from 'react-native-maps';
import Button from '../../componant/Button';

import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../../common/responsiveFunction';
export default function BookTanker({navigation}) {
  const [initRegion, setinitialRegion] = React.useState({
    latitude: 33.5525601624979,
    longitude: 73.01996568366887,
    latitudeDelta: 0.2,
    longitudeDelta: 0.0118,
  });

  const PickUpEnter = () => {
    return (
      <View style={styles.pickUpLocation}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: 7,
              width: 7,
              borderRadius: 7,
              backgroundColor: COLORS.black,
            }}
          />
          <View
            style={{
              height: hp('7%'),
              width: 1,
              backgroundColor: COLORS.brownGrey,
            }}
          />
          <View
            style={{height: 7, width: 7, backgroundColor: COLORS.brownGrey}}
          />
        </View>
        <View style={{marginStart: wp('2%'), width: '95%'}}>
          <TextInput
            placeholder="Enter PickUp Point"
            placeholderTextColor={COLORS.black}
            style={{
              backgroundColor: COLORS.veryLightPink,
              fontFamily: FONTFAMILY.SemiBold,
              paddingHorizontal:wp('3%'),
              paddingVertical:hp('1%'),
              color:COLORS.black
            }}
          />
          <TextInput
            placeholder="Where To ?"
            placeholderTextColor={COLORS.black}
            style={{
              backgroundColor: COLORS.veryLightPink,
              marginTop: hp('2%'),
              fontFamily: FONTFAMILY.SemiBold,
              paddingHorizontal:wp('3%'),
              paddingVertical:hp('1%'),
              color:COLORS.black
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <MapView
        // region={initRegion}
        initialRegion={initRegion}
        mapType="standard"
        // customMapStyle={MapTheme}
        onPress={e => {
          // //console.log(e.nativeEvent);
        }}
        style={{height: '100%', width: '100%'}}>
        {MarkerData.map((item, index) => {
          return (
            // <Marker
            //   key={index}
            //   coordinate={{
            //     latitude: item.lat,
            //     longitude: item.long,
            //   }}>
            //   <Image
            //     style={styles.imageTanker1}
            //     source={IMAGES.tankerimg}
            //     resizeMode="contain"
            //   />
            // </Marker>
            <Marker
              key={index}
              coordinate={{
                latitude: item.lat,
                longitude: item.long,
              }}>
              <Image
                style={styles.imageTanker1}
                source={IMAGES.tankerimg}
                resizeMode="contain"
              />
            </Marker>
          );
        })}
      </MapView>
      <PickUpEnter />
      <Button
        title="Done"
        style={styles.booktankerButton}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  booktankerButton: {
    backgroundColor: COLORS.black,
    position: 'absolute',
    bottom: 30,
    right: 20,
    left: 20,
  },
  imageTanker1: {
    height: hp('21%'),
    width: wp('30%'),
  },
  pickUpLocation: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp('3%'),
    flexDirection: 'row',
    paddingVertical: hp('1%'),
  },
});
const MarkerData = [
  {
    id: 1,
    lat: 33.5525601624979,
    long: 73.01996568366887,
  },
  {
    id: 1,
    lat: 33.57358727719362,
    long: 73.0235705725744,
  },
  {
    id: 1,
    lat: 33.55263169197335,
    long: 73.02151063605696,
  },
  {
    id: 1,
    lat: 33.55771013335155,
    long: 73.04073671021978,
  },
];
