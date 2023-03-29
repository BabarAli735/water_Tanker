import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS, FONTFAMILY, height, IMAGES, width} from '../../constants/theme';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Button from '../../componant/Button';
import Ionic from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../../common/responsiveFunction';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
export default function BookTanker({navigation, route}) {
  const mapRef = useRef();
  const scale = useSharedValue(0);
  const [whereFrom, setWhereFrom] = React.useState(route.params.item);
  const [whereTo, setWhereTo] = React.useState();
  const [showRoute, setshowRoute] = useState(false);
  const [showDriver, setShowDriver] = React.useState(false);
  const [driverDetail, setDriverDetail] = React.useState();
  const [initRegion, setinitialRegion] = React.useState({
    latitude: 33.5525601624979,
    longitude: 73.01996568366887,
    latitudeDelta: 0.04,
    longitudeDelta: 0.0118,
  });

  const PickUpEnter = () => {
    return (
      <View style={styles.pickUpLocation}>
        <View style={{alignItems: 'center', paddingBottom: 35}}>
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
              height: hp('3%'),
              width: 1,
              backgroundColor: COLORS.brownGrey,
            }}
          />
          <View
            style={{height: 7, width: 7, backgroundColor: COLORS.brownGrey}}
          />
        </View>
        <View style={{marginStart: wp('2%'), width: '95%'}}>
          <GooglePlacesAutocomplete
            GooglePlacesSearchQuery={{rankby: 'distance'}}
            GooglePlacesDetailsQuery={{
              fields: ['formatted_address', 'geometry'],
            }}
            currentLocationLabel="Current location"
            keepResultsAfterBlur={true}
            nearbyPlacesAPI="GooglePlacesSearch"
            fetchDetails={true}
            renderRow={RenderRow}
            styles={{
              container: {
                backgroundColor: COLORS.white,
              },
              row: {
                backgroundColor: COLORS.transparent,
              },
              textInputContainer: {
                backgroundColor: COLORS.veryLightPink,
                alignItems: 'center',
                height: hp('6%'),
                overflow: 'hidden',
              },
              textInput: [
                {
                  backgroundColor: COLORS.veryLightPink,
                  marginTop: hp('1%'),
                  fontFamily: FONTFAMILY.SemiBold,
                  paddingHorizontal: wp('3%'),
                  color: COLORS.black,
                  fontSize: rf(1.5),
                },
              ],
              listView: {
                // marginVertical: SIZES.five,
                backgroundColor: COLORS.white,
              },
              separator: {
                borderColor: COLORS.brownGrey,
                borderBottomWidth: 0.5,
                backgroundColor: COLORS.transparent,
              },
              description: {
                backgroundColor: COLORS.transparent,
              },
            }}
            keyboardShouldPersistTaps="always"
            placeholder={
              whereTo !== undefined ? whereTo.formatted_address : 'Where To ?'
            }
            onPress={(data, details = null) => {
              setWhereTo(details);
            }}
            query={{
              key: 'AIzaSyDp-9NI8G8l7zLLB0GqNAxjwa17tZKcyuc',
              // key: 'AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM',
              language: 'en',
              components: 'country:pk',
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.black,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              padding: wp('2%'),
              marginTop: hp('1%'),
              borderRadius: wp('2%'),
            }}
            onPress={() => {
              if (whereFrom !== undefined && whereTo !== undefined) {
                setTimeout(() => {
                  setshowRoute(true);
                }, 100);
              }
            }}>
            <Text style={styles.txt}>show Route</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  console.log('whereFrom', whereFrom);
  console.log('whereTo', whereTo);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        // region={initRegion}
        initialRegion={initRegion}
        mapType="standard"
        // customMapStyle={MapTheme}
        onPress={e => {
          // //console.log(e.nativeEvent);
        }}
        style={{height: '100%', width: '100%'}}>
        {showRoute ? (
          <>
            <MapViewDirections
              origin={whereFrom.formatted_address}
              destination={whereTo.formatted_address}
              strokeColor={COLORS.primary}
              strokeWidth={5}
              // apikey={'AIzaSyDp-9NI8G8l7zLLB0GqNAxjwa17tZKcyuc'}
              apikey={'AIzaSyAvWnnwxysCLY3IitgCIPBHPU_g4HiBS04'}
              onStart={params => {
                console.log(
                  `Started routing between ------ "${
                    params.origin
                  }" and "${JSON.stringify(params.destination)}"`,
                );
              }}
              resetOnChange={true}
              onReady={result => {
                // console.log("onReady====================>>>>>>>>>>>>>");

                mapRef?.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 10,
                    bottom: height / 3.5,
                    left: width / 15,
                    top: height / 35,
                  },
                });

                // setShowMarkerLoader(false);
                // setInvalidCoorDinates(false);
              }}
              onError={onError => {
                // setShowMarkerLoader(false);
                console.log('MapViewDirections', onError);
                if (onError === 'Error on GMAPS route request: ZERO_RESULTS') {
                  // setInvalidCoorDinates(true);
                }
              }}
            />
            <Marker
              coordinate={{
                latitude: whereFrom.lat,
                longitude: whereFrom.lng,
              }}
            />

            <Marker
              coordinate={{
                latitude: whereTo?.geometry.location.lat,
                longitude: whereTo?.geometry.location.lng,
              }}
            />
          </>
        ) : (
          <>
            {MarkerData.map((item, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item.lat,
                    longitude: item.lng,
                  }}
                  onPress={() => {
                    setShowDriver(true);
                    setDriverDetail(item);
                    scale.value = withTiming(1, {duration: 2000});
                  }}>
                  <Image
                    style={styles.imageTanker1}
                    source={IMAGES.tankerimg}
                    resizeMode="contain"
                  />
                </Marker>
              );
            })}
          </>
        )}
      </MapView>
      <PickUpEnter />
      <Button
        title="Done"
        style={styles.booktankerButton}
        onPress={() => {
          navigation.goBack();
        }}
      />
       <ShowDriverDetailModal
        isVisible={showDriver}
        scale={scale}
        setIsShowNumberModal={setShowDriver}
        item={driverDetail}
        setSelectedDriver={setWhereFrom}
      />
    </View>
  );
}
const ShowDriverDetailModal = React.memo(
  ({isVisible, setIsShowNumberModal, scale, item,setSelectedDriver}) => {
    const navigation=useNavigation()
    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scale.value}],
      };
    }, []);
    return (
      <Modal visible={isVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.View
            style={[
              rStyle,
              {
                width: wp('90%'),
                backgroundColor: COLORS.white,
                borderRadius: wp(3),
                overflow: 'hidden',
              },
            ]}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                alignItems: 'flex-end',
                paddingHorizontal: wp('3%'),
                height: hp('5%'),
              }}>
              <TouchableOpacity
                style={{marginTop: hp('1%')}}
                onPress={React.useCallback(() => {
                  scale.value = withTiming(0, {duration: 2000});
                  setTimeout(() => {
                    setIsShowNumberModal(false);
                  }, 2000);
                }, [isVisible])}>
                <Ionic name="close" size={rf(3)} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <Image
              style={styles.imageDriver}
              source={IMAGES.user1}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.txt1,
                {
                  fontFamily: FONTFAMILY.Bold,
                  fontSize: rf(1.6),
                  color: COLORS.black,
                  marginTop: hp('2%'),
                  textAlign: 'center',
                },
              ]}>
              {item?.name}
            </Text>
            <Text
              style={[
                styles.txt1,
                {
                  fontFamily: FONTFAMILY.Bold,
                  fontSize: rf(1.6),
                  color: COLORS.black,
                  marginTop: hp('2%'),
                  textAlign: 'center',
                  paddingBottom: hp('2%'),
                },
              ]}>
              {item?.mobile}
            </Text>
            <Button
              title={'Select Driver'}
              style={{marginHorizontal: wp('3%'), marginBottom: hp('2%')}}
              onPress={()=>{
                scale.value = withTiming(0, {duration: 2000});
                setTimeout(() => {
                  setIsShowNumberModal(false);
                  setSelectedDriver(item)
                }, 1000);
              
              }}
            />
          </Animated.View>
        </View>
      </Modal>
    );
  },
);
const RenderRow = (data, index) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.transparent,
      }}>
      <Ionic name="location-sharp" style={{color: COLORS.brownGrey}} />
      <View style={{alignItems: 'baseline', marginLeft: wp('2%')}}>
        <Text
          style={[
            {
              color: COLORS.black,
              fontFamily: FONTFAMILY.Regular,
              fontSize: rf(1.3),
            },
          ]}>
          {data.description}
        </Text>
      </View>
    </View>
  );
};
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
  txt: {
    color: COLORS.white,
    fontSize: rf(1.5),
    fontFamily: FONTFAMILY.Bold,
  },
  imageDriver: {
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: wp('20%'),
    alignSelf: 'center',
  },
});
const MarkerData = [
  {
    id: 1,
    lat: 33.5525601624979,
    lng: 73.01996568366887,
    name: 'Driver 1',
    mobile: '03113516459',
    formatted_address: 'Karachi, Karachi City, Sindh, Pakistan',
  },
  {
    id: 2,
    lat: 33.57358727719362,
    lng: 73.0235705725744,
    name: 'Driver 2',
    mobile: '03113516459',
    formatted_address: 'Karachi, Karachi City, Sindh, Pakistan',
  },
  {
    id: 3,
    lat: 33.55263169197335,
    lng: 73.02151063605696,
    name: 'Driver 3',
    mobile: '03113516459',
    formatted_address: 'Karachi, Karachi City, Sindh, Pakistan',
  },
  {
    id: 4,
    lat: 33.55771013335155,
    lng: 73.04073671021978,
    name: 'Driver 4',
    mobile: '03113516459',
    formatted_address: 'Karachi, Karachi City, Sindh, Pakistan',
  },
];
