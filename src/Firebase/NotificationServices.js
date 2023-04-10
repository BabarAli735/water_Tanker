import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { saveFcmData } from '../redux/slice/auth';

import Firebase from './firebaseConfig';

export async function requestUserPermission(userId,dispatch) {
  // console.log('requestUserPermission ======= >>>>>>>>>>> ');
//   Firebase();

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
  const token=await  getFcmToken(userId,dispatch);
  return token
  }
}

const getFcmToken = async (userId) => {
  try {
    messaging()
      .getToken()
      .then(token => {
       return token
      });

    messaging().onTokenRefresh(token => {
        return token
    });
  } catch (error) {}
};

const SetFcmToken = async ( userId,fcmToken,dispatch) => {
  // console.log('set fcm token ==========>', token);

  let data = {
    driverId: userId,
    fcmToken:fcmToken
  };
  dispatch(saveFcmData(data))
};

// export const removeFcmTokenFromFirebase = async userId => {
//   if (userId !== undefined) {
//     try {
//       await database()
//         .ref(CONSTANTS.FIREBASE.TOKEN)
//         .child(userId.toString())
//         .set('')
//         .then(() => console.log('Token removed from firebase..!!!!!.'));
//     } catch (error) {
//       console.log('error ====>', error);
//     }
//   }
// };