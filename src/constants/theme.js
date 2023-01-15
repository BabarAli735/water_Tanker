import { Dimensions, Platform, StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageOrientation, widthPercentageToDP } from "../common/responsiveFunction";

export const { width, height } = Dimensions.get("window");

/* *************** Colors ********** */

export const COLORS = {
  primary:'#286ef0',
    navy: "#001e3e",
    cherry: "#dd003e",
    black: "#000000",
    white: "#ffffff",
    charcoalGrey: "#4a4b4d",
      brownGrey: "#b3c6cc",
    blue: "#0037c1",
    brightYellow: "#fcf400",
    golden: "#FFD700",
    veryLightPink: "#d5d5d5",
    halfpwhite: "#eeeeee",
    transparent: "transparent",
    naviWithOpacity: "rgba(0,30,62,0.4)",
    trueGreen: "#1eaf08",
    cranBerry: "#ab0030",
    greenishBlack: "#2b2b2b",
    skyBlue:'#72bacf'
};

const appTheme = { COLORS };

export default appTheme;

/* * Fonts * */
export const FONTFAMILY = {
  Light: "Metropolis-Light",
  Medium: "Metropolis-Medium",
  Regular: "Metropolis-Regular",
  SemiBold: "Metropolis-SemiBold",
  Bold: "Metropolis-Bold",
  Circularstd:'Circular Std Font'
};

/* * Images * */
export const IMAGES = {
  HomeTanker:require('../assets/images/HomeTanker.jpg'),
  tanker:require('../assets/images/tanker.png'),
  drinkwater:require('../assets/images/drinkwater.png'),
  tankerimg:require('../assets/images/tankerimg.png'),
  user1:require('../assets/images/user1.png'),
};

/* * Screens * */
export const SCREENS = {
  /* * Auth  Screens * */
  Login:'Login',
  SighnUp:'SighnUp',
  HomeScreen:'HomeScreen',
  BookTanker:'BookTanker',
  Pure_Water:'Pure_Water',
  OnBoardScreen:'OnBoardScreen',
 
}

export const SIZES = {
  // global sizes
  five: height * 0.0055,
  ten: height * 0.011,
  fifteen: height * 0.017,
  twenty: height * 0.023,
  twentyWidth: width * 0.05,
  twentyFive: height * 0.03,
  twentyFiveWidth: width * 0.08,
  fifty: height * 0.075,
  fiftyWidth: width * 0.13,

  // font sizes
  h16: width * 0.034,
  h18: width * 0.038,
  h20: width * 0.042,
  h22: width * 0.048,
  h24: width * 0.055,
  body08: width * 0.024,
  body10: width * 0.028,
  body12: width * 0.032,
  body14: width * 0.036,
  body16: width * 0.04,
  body18: width * 0.045,
};

export const FONTS = {
  boldFont16: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h16,
    color: COLORS.black,
  },
  boldFont18: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h18,
    color: COLORS.black,
  },
  boldFont20: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h20,
    color: COLORS.black,
  },
  boldFont22: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h22,
    color: COLORS.black,
  },
  boldFont24: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h24,
    color: COLORS.black,
  },
  semiBoldFont08: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.body08,
    color: COLORS.black,
  },
  semiBoldFont10: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.body10,
    color: COLORS.black,
  },
  semiBoldFont16: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h16,
    color: COLORS.black,
  },
  semiBoldFont18: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h18,
    color: COLORS.black,
  },
  semiBoldFont20: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h20,
    color: COLORS.black,
  },
  semiBoldFont22: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h22,
    color: COLORS.black,
  },
  semiBoldFont24: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h24,
    color: COLORS.black,
  },
  mediumFont10: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body10 },
  mediumFont12: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body12 },
  mediumFont14: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body14 },
  mediumFont16: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body16 },
  mediumFont18: { fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body18 },
  regularFont08: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body08 },
  regularFont10: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body10 },
  regularFont12: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body12 },
  regularFont14: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body14 },
  regularFont16: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body16 },
  regularFont18: { fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body18 },
  lightFont08: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body08 },
  lightFont10: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body10 },
  lightFont12: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body12 },
  lightFont14: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body14 },
  lightFont16: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body16 },
  lightFont18: { fontFamily: FONTFAMILY.Light, fontSize: SIZES.body18 },
};

export const STYLES = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
   
  },
  splashLogo: {
    width: SIZES.fifteen * 13,
    height: SIZES.fifteen * 13,
    alignSelf: "center",
  },
  loginView: {
    flex: 1,
    width: "100%",
    marginTop: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
  },
  lightText: {
    fontFamily: FONTFAMILY.Light,
  },
  mediumText: {
    fontFamily: FONTFAMILY.Medium,
  },
  boldText: {
    fontFamily: FONTFAMILY.Bold,
  },
  headingText: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.twenty + 2,
    color: COLORS.black,
  },
  shadow: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.brownGrey,
    shadowOffset: {
      width: widthPercentageToDP(1),
      height: heightPercentageToDP(1),
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    elevation: 3,
  },
});


