import {StyleSheet, Text, View,Image} from 'react-native';
import React from 'react';
import {COLORS, IMAGES} from '../../constants/theme';
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
    longitude:  73.01996568366887,
    latitudeDelta: 0.2,
    longitudeDelta: 0.0118,
  });
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
      <Button
        title="Book Your Tanker"
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
