import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from '../../common/responsiveFunction';
import {useDispatch, useSelector} from 'react-redux';
import {EditProfileIcon} from '../../componant/svg';
import CustomModal from '../../componant/CustomModal';
import {EditeProfile, UpdateProfileSlice, getProfile} from '../../redux/slice/profile';
import EditText from '../../componant/EditText';
import Button from '../../componant/Button';
import {COLORS, FONTFAMILY, IMAGES} from '../../constants/theme';
import utills from '../../utills';
import {image_url} from '../../api';

export default function UpdateProfile({navigation, route}) {
  const dispatch = useDispatch();
  const Profile = useSelector(state => state.profileReducer.profileData);
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [image, setImage] = useState('');
  const [profileData, setProfileData] = useState({
    user_id: Profile?._id,
    name: Profile?.name,
    email: Profile?.email,
    image: Profile?.photo,
    location: Profile?.location,
  });

  const handleChange = useCallback(
    value => {
      setProfileData(state => ({...state, ...value}));
    },
    [setProfileData],
  );
  const onSubmit = useCallback(async () => {
    if (utills.isEmptyOrSpaces(profileData.name)) {
      utills.errorAlert('', 'Please enter user name');
      return;
    }
    if (!utills.validateEmail(profileData.email)) {
      utills.errorAlert('', 'Please enter a valid email');
      return;
    }

    if (utills.isEmptyOrSpaces(profileData.location)) {
      utills.errorAlert('', 'Please enter Location');
      return;
    }
   
   console.log('====================================');
   console.log(profileData);
   console.log('====================================');
    const responce=await dispatch(EditeProfile(profileData));
      console.log('responce====', responce);
      if (!responce.error) {
        dispatch(getProfile(Profile?._id));
        utills.successAlert('','Profile upated successfuly');
      }
  }, [profileData]);
  return (
    <>
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingBottom: hp('5%'),
        }}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={
              profileData.image === undefined
                ? IMAGES.user1
                : {
                    uri: image !== '' ? image.path : image_url + Profile?.photo,
                  }
            }
          />
          <Pressable
            style={({pressed}) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
              styles.editIconContainer,
            ]}
            onPress={useCallback(() => {
              setUploadImageModal(true);
            }, [uploadImageModal])}>
            <EditProfileIcon />
          </Pressable>
        </View>
        <EditText
          placeholder={'Enter name'}
          outline
          value={profileData.name}
          onChangeText={value => {
            handleChange({name: value});
          }}
        />
        <EditText
          placeholder={'Enter email'}
          outline
          disable={true}
          value={profileData.email}
          onChangeText={value => {
            handleChange({email: value});
          }}
        />
        {/* <EditText
          placeholder={'Enter mobile no:'}
          outline
          keyboardType="phone-pad"
          value={profileData.mobile}
          maxLength={10}
          onChangeText={value => {
            handleChange({mobile: value.replace(/[^0-9]/g, '')});
          }}
        /> */}
        <EditText
          placeholder={'Enter city'}
          outline
          value={profileData.location}
          onChangeText={value => {
            handleChange({location: value});
          }}
        />
        <Button
          title="Update profile"
          style={{marginTop: hp('3%')}}
          onPress={onSubmit}
        />
      </ScrollView>
      <CustomModal
        visible={uploadImageModal}
        setVisible={setUploadImageModal}
        options={{type: 'slide', from: 'bottom'}}
        handleImageData={(res, title) => {
          setImage(res);
          setProfileData(prev => ({
            ...prev,
            image: {
              uri: res.path,
              type: res.mime,
              name: res.path.split('/').slice(-1).toString(),
            },
          }));
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp('3%'),
  },
  txt: {
    color: COLORS.black,
    fontSize: rf(2.7),
    fontFamily: FONTFAMILY.Bold,
  },
  txt1: {
    color: COLORS.Greyscale,
    fontSize: rf(1.7),
    fontFamily: FONTFAMILY.Regular,
  },
  txt2: {
    color: COLORS.Greyscale,
    fontSize: rf(1.5),
    fontFamily: FONTFAMILY.Medium,
  },
  alreadyAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
  },
  image: {
    height: wp('30%'),
    width: wp('30%'),
    borderRadius: wp('30%'),
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 2,
    right: 5,
  },
  imageContainer: {
    alignSelf: 'center',
  },
});
