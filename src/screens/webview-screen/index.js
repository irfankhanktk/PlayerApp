import React from 'react';
import { View } from 'react-native';
import styles from './styles';
// let deviceId =
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { WebView } from 'react-native-webview';

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
