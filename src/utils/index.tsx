import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import {
  Linking, Platform,
  Share
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationProps } from '../types/navigation-types';
// Initialize the module (needs to be done only once)
export const horizontalAnimation: any = {
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

// const hasPermissionIOS = async () => {
//   const status = await Geolocation.requestAuthorization('whenInUse');

//   if (status === 'granted') {
//     return true;
//   }

//   if (status === 'denied') {
//     Alert.alert('Permission denied');
//   }

//   if (status === 'disabled') {
//     Alert.alert('Permission disabled');
//   }

//   return false;
// };
export const UTILS = {
  resetStack: (props: NavigationProps, routeName: string, params?: object) => {
    props?.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: routeName,
            params: params,
          },
        ],
      }),
    );
  },
  dialPhone: async (phoneNumber: string) => {
    try {
      const isSupported = await Linking.canOpenURL(`tel:${phoneNumber}`);
      console.log('isSupported=>', isSupported);
      if (isSupported) Linking.openURL(`tel:${phoneNumber}`);
    } catch (error) {
      console.log('error =>', error);
    }
  },
  getItem: async (key: string) => {
    try {
      const res = await AsyncStorage.getItem(key);
      return res;
    } catch (error) {
      console.log('error=>', error);
      return null;
    }
  },
  setItem: async (key: string, data: string) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.log('error=>', error);
      return null;
    }
  },
  clearStorage: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('error=>', error);
      return null;
    }
  },
  getFormData: (object: any) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  },
  returnError: (error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('=>>>>>>::::', error.response.data?.errors);
      console.log(error.response.status);
      // console.log(error.response.headers);
      if (error.response.data?.errors) {
        return `${error.response.data?.errors}`;
      }
      console.log(error.response.data);
      return `${error.response.status}`;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    console.log('type of code: ', error?.code);
    console.log('type of message: ', error?.message);
    if (typeof error === 'string') {
      return error;
    }
    return error?.message || error?.code;
  },
  capitalizeFirst: (str: string) =>
    str?.charAt(0)?.toUpperCase() + str?.slice(1),
  returnStringify: (data: object) => JSON.stringify(data),
  _share: async (description = '', url: string) => {
    try {
      console.log('url::', url);
      const result = await Share.share({
        // message:description?description:url,
        // url: url,
        message: description, // + ' ' + createText(description),
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // console.log(error.message);
    }
  },
  // get_current_location: async (
  //   onSuccess = (position: any) => { },
  //   onError = (error: any) => { },
  // ) => {
  //   try {
  //     const flag = await UTILS.requestLocationPermission();
  //     if (flag) {
  //       Geolocation.getCurrentPosition(onSuccess, onError, {
  //         enableHighAccuracy: true,
  //         timeout: 15000,
  //         maximumAge: 10000,
  //       });
  //     }
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // },

  _returnAddress: (addressObject: any) => {
    // console.log('addressObject:', addressObject.results[0]);
    let returnAddress = {
      street_number: null,
      street_address: null,
      fulladdress: addressObject?.results[0]?.formatted_address,
      geoCode: {
        ...addressObject.results[0]?.geometry?.location,
      },
      place_id: addressObject.results[0]?.place_id,
      province: null,
      district: null,
      tehsil: null,
      city: null,
      area: null,
      country: null,
      country_short_name: null,
    };
    addressObject.results?.forEach((element: any) => {
      element?.address_components?.forEach((item: any) => {
        if (
          item.types.some((el: any) => el === 'administrative_area_level_1')
        ) {
          returnAddress = { ...returnAddress, province: item.long_name };
        } else if (
          item.types.some((el: any) => el === 'administrative_area_level_2')
        ) {
          returnAddress = { ...returnAddress, district: item.long_name };
        } else if (
          item.types.some((el: any) => el === 'administrative_area_level_3')
        ) {
          returnAddress = { ...returnAddress, tehsil: item.long_name };
        } else if (item.types.some((el: any) => el === 'locality')) {
          returnAddress = { ...returnAddress, city: item.long_name };
        } else if (item.types.some((el: any) => el === 'sublocality')) {
          returnAddress = { ...returnAddress, area: item.long_name };
        } else if (item.types.some((el: any) => el === 'street_address')) {
          returnAddress = {
            ...returnAddress,
            street_address: item.long_name || null,
          };
        } else if (item.types.some((el: any) => el === 'street_number')) {
          returnAddress = {
            ...returnAddress,
            street_number: item.long_name || null,
          };
        } else if (item.types.some((el: any) => el === 'country')) {
          returnAddress = {
            ...returnAddress,
            country: item.long_name || null,
            country_short_name: item?.short_name,
          };
        }
      });
    });
    return returnAddress;
  },
  // requestLocationPermission: async () => {
  //   try {
  //     if (Platform.OS === 'ios') {
  //       const hasPermission = await hasPermissionIOS();
  //       return hasPermission;
  //     }
  //     if (Platform.OS === 'android' && Platform.Version < 23) {
  //       return true;
  //     }

  //     const hasPermission = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );

  //     if (hasPermission) {
  //       return true;
  //     }

  //     const status = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );

  //     if (status === PermissionsAndroid.RESULTS.GRANTED) {
  //       return true;
  //     }

  //     if (status === PermissionsAndroid.RESULTS.DENIED) {
  //       ToastAndroid.show('Permission denied', ToastAndroid.LONG);
  //     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //       ToastAndroid.show('Permission disabled', ToastAndroid.LONG);
  //     }
  //     return false;
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  // },

  // serialize: (obj: any) => {
  //   var str = [];
  //   for (var p in obj)
  //     if (obj.hasOwnProperty(p)) {
  //       str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
  //     }
  //   return str.join('&');
  // },
  _removeEmptyKeys: (payload: any) => {
    const obj = payload;
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  },
  _returnImageCamera: async () => {
    try {
      let image = await ImagePicker.openCamera({
        width: 1000,
        height: 800,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.5,
        compressImageMaxWidth: 1500,
        compressImageMaxHeight: 1000,
      });
      return {
        uri:
          Platform.OS === 'android'
            ? image?.path
            : image?.path.replace('file://', ''),
        name: image?.filename,
        type: image?.mime,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  _returnImageGallery: async () => {
    try {
      let image = await ImagePicker.openPicker({
        // width: 1000,
        // height: 800,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.5,
        compressImageMaxWidth: 1500,
        compressImageMaxHeight: 1000,
      });
      return {
        uri:
          Platform.OS === 'android'
            ? image?.path
            : image?.path.replace('file://', ''),
        name: image?.filename || `${new Date().getTime()}`,
        type: image?.mime,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getMinutesDiff: (a: string, b: string) => moment(b).diff(a, 'm'),
  getUUID: () => uuid?.v4()?.toString(),
};
