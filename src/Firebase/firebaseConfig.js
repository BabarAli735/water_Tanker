import firebase from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyANdlgdYqku9oKiM00U4VQ9DexW6otVpls',
  databaseURL: 'https://watertanker-56174-default-rtdb.firebaseio.com',
  authDomain: 'fueld-a6582.firebaseapp.com',
  projectId: 'watertanker-56174',
  storageBucket: 'watertanker-56174.appspot.com',
  messagingSenderId: '585348357772',
  appId: '1:585348357772:android:6e83a19d22af819bdce5a9',
};

export default Firebase= () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};