import NetInfo from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import MarqueeText from 'react-native-marquee';
import {openDatabase} from 'react-native-sqlite-storage';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {syncTimeStamp} from 'services/api/api-actions';
import Regular from 'typography/regular-text';
import styles from './styles';
// let deviceId =
import {Loader} from 'components/atoms/loader';
import MarqueeVertically from 'components/molecules/marquee-txt';
import Lottie from 'lottie-react-native';
import {getAllOfCollection, saveData} from 'services/firebase';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import {PlayerLottie} from 'assets/lottie';
import {Row} from 'components/atoms/row';
import VideoFrame from 'components/molecules/video-frame';
import {WebView} from 'react-native-webview';
import Header1x2x from 'components/atoms/headers/header-1x-2x';

const WebViewScreen = props => {
  const url = props?.route?.params?.url;
  console.log('url===>>>>>', url);

  return (
    <View style={styles.container}>
      <Header1x2x />
      <WebView
        style={{
          flex: 1,
        }}
        source={{
          uri: url,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
      />
    </View>
  );
};
export default WebViewScreen;
