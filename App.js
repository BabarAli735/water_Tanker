
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import MainNavigation from './src/navigation/MainNavigation';
import store from './src/redux/store';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import { COLORS, FONTFAMILY } from './src/constants/theme';
import { heightPercentageToDP as hp,responsiveFontSize as rf} from './src/common/responsiveFunction';
function App()  {
  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        text1Style={{
          color: COLORS.white,
          fontSize: rf(2),
          fontFamily: FONTFAMILY.Bold,
        }}
        text2Style={{
          color: COLORS.white,
          fontSize: rf(1.5),
          fontFamily: FONTFAMILY.SemiBold,
        }}
        style={{backgroundColor: COLORS.trueGreen}}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          color: COLORS.white,
          fontSize: rf(2),
          fontFamily: FONTFAMILY.Bold,
        }}
        text2Style={{
          color: COLORS.white,
          fontSize: rf(1.5),
          fontFamily: FONTFAMILY.SemiBold,
        }}

        style={{backgroundColor: COLORS.primary,height:hp('5%')}}
      />
    ),
  };
  return (
    // <SafeAreaView style={styles.container}>
    <Provider store={store}>
      <MainNavigation />
    <Toast config={toastConfig} />
    </Provider>
  // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default App;
