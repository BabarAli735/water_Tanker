import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import MapView from 'react-native-maps';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {SaveFcm} from '../../../redux/slice/auth';
export default function DriverHomeScreen() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authReducer.userData);
  const FcmData = useSelector(state => state.authReducer.FcmData);
  const [initRegion, setinitialRegion] = React.useState({
    latitude: 33.5525601624979,
    longitude: 73.01996568366887,
    latitudeDelta: 0.014,
    longitudeDelta: 0.0118,
  });
  useEffect(() => {
    requestUserPermission(userData.user._id);
  }, []);
  const requestUserPermission = async userId => {
    // console.log('requestUserPermission ======= >>>>>>>>>>> ');
    //   Firebase();

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      try {
        messaging()
          .getToken()
          .then(token => {
            SetFcmToken(userId, token);
          });

        messaging().onTokenRefresh(token => {
          SetFcmToken(userId, token);
        });
      } catch (error) {}
    }
  };
  const SetFcmToken = async (userId, fcmToken) => {
    // console.log('set fcm token ==========>', token);

    let data = {
      driverId: userId,
      fcmToken: fcmToken,
    };
    dispatch(SaveFcm(data));
  };
  return (
    <View style={{flex: 1}}>
      <MapView
        // region={initRegion}
        initialRegion={initRegion}
        mapType="standard"
        // customMapStyle={MapTheme}
        onPress={e => {
          // //console.log(e.nativeEvent);
        }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
