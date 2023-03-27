import React, {memo, useEffect, useRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {COLORS, FONTFAMILY, SCREENS} from '../constants/theme';
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../common/responsiveFunction';

import Ionic from 'react-native-vector-icons/Ionicons';
import {saveLocatin} from '../redux/slice/auth';
import { useDispatch } from 'react-redux';
const GooglePlacesInput = ({navigation, route}) => {
  const ref = useRef();
  const dispatch=useDispatch()
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const renderRow = (data, index) => {
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
  return (
    <GooglePlacesAutocomplete
      ref={ref}
      listEmptyComponent={() => {
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: hp('10%'),
            }}>
            <ActivityIndicator size={'small'} color={COLORS.primary} />
          </View>
        );
      }}
      GooglePlacesSearchQuery={{rankby: 'distance'}}
      GooglePlacesDetailsQuery={{fields: ['formatted_address', 'geometry']}}
      currentLocationLabel="Current location"
      keepResultsAfterBlur={true}
      nearbyPlacesAPI="GooglePlacesSearch"
      fetchDetails={true}
      renderRow={renderRow}
      styles={{
        container: {
          backgroundColor: COLORS.white,
          paddingHorizontal: wp('3%'),
        },
        row: {
          backgroundColor: COLORS.transparent,
        },
        textInputContainer: {
          backgroundColor: COLORS.white,
          alignItems: 'center',
          paddingHorizontal: wp('3%'),
          height: hp('7%'),
          borderColor: COLORS.black,
          borderWidth: 0.5,
          borderRadius: wp('2%'),
          overflow: 'hidden',
        },
        textInput: [
          {
            color: COLORS.black,
            fontFamily: FONTFAMILY.Medium,
            fontSize: rf(1.3),
            textTransform: 'capitalize',
            height: hp('7%'),
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
      placeholder="Search"
      onPress={(data, details = null) => {
        dispatch(saveLocatin(details));

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }}
      query={{
        key: 'AIzaSyDp-9NI8G8l7zLLB0GqNAxjwa17tZKcyuc',
        // key: 'AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM',
        language: 'en',
        components: 'country:pk',
      }}
    />
  );
};

export default memo(GooglePlacesInput);
