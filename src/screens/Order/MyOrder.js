import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMyOrder} from '../../redux/slice/order';
import {COLORS, FONTFAMILY, STYLES} from '../../constants/theme';
import {FlatList} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
} from '../../common/responsiveFunction';

export default function MyOrder() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authReducer.userData);
  const MyOrder = useSelector(state => state.orderReducer.myOrder);
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = async () => {
    let data = {
      id:userData.data? userData.data.user._id: userData.user._id,
      type:userData.data? userData?.data.user.type:userData.user.type,
    };
    dispatch(getMyOrder(data));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={MyOrder}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: wp('3%'),
          paddingBottom: hp('3%'),
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height:hp('90%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[styles.txt, {}]}>No Record Found !</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
const renderItem = ({item, id}) => {
  return (
    <View style={[styles.itemContainer, STYLES.shadow]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={[styles.txt, {width: wp('20%')}]}>Order Id</Text>
          <Text style={[styles.txt, {width: wp('20%')}]}>From</Text>
          <Text style={[styles.txt, {width: wp('20%')}]}>To</Text>
          <Text style={[styles.txt, {width: wp('20%')}]}>Amount</Text>
          <Text style={[styles.txt, {width: wp('20%')}]}>Discount</Text>
          <Text style={[styles.txt, {width: wp('20%')}]}>Total</Text>
          <Text style={[styles.txt, {width: wp('30%')}]}>Order Status</Text>
        </View>
        <View>
          <Text style={styles.txt} numberOfLines={1}>
            {item._id}
          </Text>
          <Text style={styles.txt} numberOfLines={1}>
            {item.from.address}
          </Text>
          <Text style={styles.txt} numberOfLines={1}>
            {item.to.address}
          </Text>
          <Text style={styles.txt}>{item.amount}</Text>
          <Text style={styles.txt}>{item.discount}</Text>
          <Text style={styles.txt}>{item.total}</Text>
          <Text style={styles.txt}>{item.orderStatus}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  itemContainer: {
    marginTop: hp('2%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: wp('2%'),
  },
  txt: {
    width: wp('50%'),
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
  },
});
