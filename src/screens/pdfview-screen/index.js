import React from 'react';
import { View } from 'react-native';
import styles from './styles';
// let deviceId =
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf';

const PDFViewerScreen = props => {
  const url = props?.route?.params?.pdfUrl;
  console.log('url===>>>>>', props?.route?.params?.pdfUrl);
  const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true};
  return (
    <View style={styles.container}>
      <Header1x2x />
      
                    <Pdf
                    trustAllCerts={false}
                      source={{
                        uri: url,
                        cache: true,
                      }}
                      onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                      }}
                      onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                      }}
                      onError={error => {
                        console.log(error);
                      }}
                      onPressLink={uri => {
                        console.log(`Link pressed: ${uri}`);
                      }}
                      style={styles.pdf}
                    />
    </View>
  );
};
export default PDFViewerScreen;
