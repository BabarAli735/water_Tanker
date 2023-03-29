import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React from 'react';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../../common/responsiveFunction';
import {COLORS, FONTFAMILY, IMAGES, SCREENS} from '../../constants/theme';
import Button from '../../componant/Button';
import AntiDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen({navigation}) {
  const scale = useSharedValue(0);
  const [showDriver, setShowDriver] = React.useState(false);
  const [driverDetail, setDriverDetail] = React.useState();
  const [initRegion, setinitialRegion] = React.useState({
    latitude: 33.5525601624979,
    longitude: 73.01996568366887,
    latitudeDelta: 0.014,
    longitudeDelta: 0.0118,
  });

  const CatCompnant = ({image, title, onPress}) => {
    return (
      <TouchableOpacity style={styles.catComponant} onPress={onPress}>
        <Image style={styles.catimage} source={image} resizeMode="contain" />
        <Text style={[styles.txt2]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const Enterlocationaddress = ({title}) => {
    return (
      <View style={styles.enterLocation}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="location" color={COLORS.black} size={rf(2.5)} />
          <View style={{marginStart: wp('3%')}}>
            <Text style={[styles.txt5]}>New lalaZar</Text>
            <Text style={[styles.txt6]}>Andyala Road Rawalpindi</Text>
          </View>
        </View>
        <AntiDesign name="right" color={COLORS.black} size={rf(2.5)} />
      </View>
    );
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: hp('3%')}}>
      <View style={styles.header}>
        <Text style={[styles.txt]}>Water You Need </Text>
        <Text style={[styles.txt1]}>Read a Book Take a nap</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Book Your Tanker"
            style={styles.booktankerButton}
            onPress={() => {
              navigation.navigate(SCREENS.BookTanker,{
                item:undefined
              });
            }}
          />
        </View>
        <Image
          style={styles.imageTanker}
          source={IMAGES.HomeTanker}
          resizeMode="contain"
        />
      </View>
      <View style={styles.categoryContainer}>
        <CatCompnant
          image={IMAGES.tanker}
          title="Usage-Water"
          onPress={() => {
            navigation.navigate(SCREENS.BookTanker);
          }}
        />
        <CatCompnant
          image={IMAGES.drinkwater}
          title="Pure-Water"
          onPress={() => {
            navigation.navigate(SCREENS.Pure_Water);
          }}
        />
      </View>
      <View style={styles.whereTo}>
        <Text style={[styles.txt3]}>Where To ?</Text>
        <TouchableOpacity style={styles.now}>
          <AntiDesign name="clockcircle" color={COLORS.black} size={rf(2.5)} />
          <Text style={[styles.txt4]}>Now</Text>
          <AntiDesign name="down" color={COLORS.black} size={rf(2.5)} />
        </TouchableOpacity>
      </View>
      <Enterlocationaddress />
      <View style={styles.line} />
      <Enterlocationaddress />
      <Text style={[styles.txt7]}>Around you</Text>

      <View
        style={{
          height: hp('40%'),
          marginTop: hp('2%'),
          paddingHorizontal: wp('3%'),
        }}>
        <MapView
          // region={initRegion}
          initialRegion={initRegion}
          mapType="standard"
          // customMapStyle={MapTheme}
          onPress={e => {
            // //console.log(e.nativeEvent);
          }}
          style={{
            flex: 1,
          }}>
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
        </MapView>
      </View>
      <ShowDriverDetailModal
        isVisible={showDriver}
        scale={scale}
        setIsShowNumberModal={setShowDriver}
        item={driverDetail}
      />
    </ScrollView>
  );
}
const ShowDriverDetailModal = React.memo(
  ({isVisible, setIsShowNumberModal, scale, item}) => {
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
                <Ionicons name="close" size={rf(3)} color={COLORS.white} />
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
              title={'Book Tanker'}
              style={{marginHorizontal: wp('3%'), marginBottom: hp('2%')}}
              onPress={()=>{
                scale.value = withTiming(0, {duration: 2000});
                setTimeout(() => {
                  setIsShowNumberModal(false);
                  
                  navigation.navigate(SCREENS.BookTanker,{
                    item
                  })
                }, 1000);
              
              }}
            />
          </Animated.View>
        </View>
      </Modal>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('3%'),
  },
  txt: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: rf(2.5),
    marginTop: hp('1.5%'),
  },
  txt1: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.Regular,
    fontSize: rf(1.8),
    marginTop: hp('1.2%'),
  },
  txt2: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: rf(1.5),
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
    width: wp('25%'),
  },
  txt3: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(2),
  },
  txt4: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.Regular,
    fontSize: rf(1.5),
  },
  txt5: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(2),
  },
  txt6: {
    color: COLORS.charcoalGrey,
    fontFamily: FONTFAMILY.Regular,
    fontSize: rf(1.5),
  },
  txt7: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: rf(2),
    marginTop: hp('2%'),
    paddingLeft: wp('3%'),
  },
  buttonContainer: {
    marginTop: hp('5%'),
    paddingBottom: hp('7%'),
  },
  booktankerButton: {
    backgroundColor: COLORS.black,
    width: wp('50%'),
  },
  imageTanker: {
    height: hp('21%'),
    width: wp('30%'),
    position: 'absolute',
    right: 0,
    bottom: -22,
  },
  imageTanker1: {
    height: hp('21%'),
    width: wp('30%'),
  },
  imageDriver: {
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: wp('20%'),
    alignSelf: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  catimage: {
    height: hp('15%'),
    width: wp('15%'),
  },
  catComponant: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whereTo: {
    backgroundColor: COLORS.brownGrey,
    padding: wp('2%'),
    marginTop: hp('2%'),
    marginHorizontal: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  now: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('25%'),
    paddingHorizontal: wp('1.8%'),
    paddingVertical: wp('2%'),
    borderRadius: wp('5%'),
  },
  enterLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
    marginTop: hp('2%'),
  },
  line: {
    height: 1,
    backgroundColor: COLORS.brownGrey,
    marginTop: hp('1%'),
    width: '90%',
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
    formatted_address:'Karachi, Karachi City, Sindh, Pakistan'
  },
  {
    id: 2,
    lat: 33.57358727719362,
    lng: 73.0235705725744,
    name: 'Driver 2',
    mobile: '03113516459',
    formatted_address:'Karachi, Karachi City, Sindh, Pakistan'
  },
  {
    id: 3,
    lat: 33.55263169197335,
    lng: 73.02151063605696,
    name: 'Driver 3',
    mobile: '03113516459',
    formatted_address:'Karachi, Karachi City, Sindh, Pakistan'
  },
  {
    id: 4,
    lat: 33.55771013335155,
    lng: 73.04073671021978,
    name: 'Driver 4',
    mobile: '03113516459',
    formatted_address:'Karachi, Karachi City, Sindh, Pakistan'
  },
];
