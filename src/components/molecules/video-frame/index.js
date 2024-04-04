import { colors } from 'config/colors';
import { height, mvs } from 'config/metrices';
import React, { useEffect, useRef,useState } from 'react';
import { Animated, Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import Regular from 'typography/regular-text';
import { UTILS } from 'utils';
import { navigate } from 'navigation/navigation-ref';
import IconPositions from '../icon-positions';
import { PDFView } from 'react-native-pdf';
import Bold from 'typography/bold-text';
const VideoFrame = ({ frameItem, setNextIndex = (index) => { }, nextIndex, playlist, props }) => {
  const videoRef = React.useRef(null);
  const [currentProgressTime, setCurrentProgressTime] = React.useState(0);
  const frame = { ...frameItem };
  const onBuffer = buffer => {
    // if (buffer?.isBuffering === false) setIsNext(false)
  };
  const videoError = error => {
    console.log('=======================VIDEO ERROR===================', error);
  };
  const pauseAfter20Seconds = () => { };
  const onProgress = progress => {
    const { currentTime, playableDuration } = progress;
    // console.log('playableDuration::', playableDuration);
    // console.log('currentTime::', currentTime);
    if (Math.round(currentTime) >= Math.round(playableDuration)) {
      setNextIndex(nextIndex < (playlist?.videos?.length - 1) ? nextIndex + 1 : 0);
      setCurrentProgressTime(0);
    } else {

      setCurrentProgressTime(currentTime);
    }
  };
  // multple video frame

const rotation = new Animated.Value(0);

const rotate = rotation.interpolate({
inputRange: [0, 1],
outputRange: ['0deg', '360deg'],
});

const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
  // Update the current time every second
  const intervalId = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  // Cleanup function to clear the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []); // Empty dependency array to run the effect only once


  return (
    <View style={{ flex: 1 }}>
      <Video
        // source={{
        //   uri:
        //     frame?.video_url?.indexOf('file') >= 0
        //       ? frameItem?.video_url
        //       : convertToProxyURL(frameItem?.video_url || 'no_video'),
        // }} // Can be a URL or a local file.
        source={{
          uri: convertToProxyURL(frameItem?.video_url || 'no_video'),
        }} // Can be a URL or a local file.
        controls={false}
        resizeMode={'cover'}
        // paused={paused}
        fullscreen={true}
        ref={videoRef} // Store reference
        onBuffer={onBuffer} // Callback when remote video is buffering
        onError={videoError} // Callback when video cannot be loaded
        onProgress={onProgress}
        onReadyForDisplay={pauseAfter20Seconds}
        style={styles.backgroundVideo}
        useTextureView={false}
        repeat
        playInBackground={true}
        disableFocus={true}
      />
      {frameItem?.widgets?.map((w, i) =>
        w?.setting?.delay > currentProgressTime ? null : (
          <IconPositions key={i} onPress={() => UTILS.openUrl(w?.url)} x={100} y={200} direction={'left'} >
         {w.title.toLowerCase() === 'clock' ? (
        //  <View style={{width:150,height:80,backgroundColor:'white'}}>
        //     <Regular
        //        label={w?.title}
        //        style={{ marginRight: mvs(10) }}
        //        color={colors.black}
        //      />
        //  <Bold label={dt} color={colors.black} fontSize={mvs(16)}/>
        //  </View>
        <>
        {/* <Animated.View style={[styles.clock, { transform: [{ rotate }] }]}>
        {/* Add clock face or clock hands components here */}
        {/* <View style={styles.clockHand} /> */}
      {/* </Animated.View>  */}
      <Regular style={styles.hourText}label={currentTime.toLocaleTimeString()} />
      </>
         ):(

           <TouchableOpacity
             key={i}
             // onPress={() => UTILS.openUrl(w?.url)}
             onPress={() => {
               if (w?.url.toLowerCase().endsWith('.pdf')) {
                 // If the URL ends with '.pdf', navigate to PDFViewerScreen
                 navigate('PDFViewerScreen', {
                   pdfUrl: w?.url,
                 });
               } else {
                 // Otherwise, navigate to WebViewScreen
                 navigate('WebViewScreen', {
                   url: w?.url,
                 });
               }
             }}
             style={[
               styles.widget,
               {
                 left: w?.setting?.position?.x,
                 top: w?.setting?.position?.y,
               },
             ]}>
             <Regular
               label={w?.title}
               style={{ marginRight: mvs(10) }}
               color={colors.white}
             />
             <Image
               source={{ uri: w?.icon }}
               style={{ height: mvs(25), width: mvs(30) }}
             />
           </TouchableOpacity>
         )}

          </IconPositions>
        ),
      )}
    </View>
  );
};

export default React.memo(VideoFrame);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  widget: {
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(3),
    borderRadius: mvs(12),
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: colors.primary,
  },
  backgroundVideo: {
    height: '100%',
    width: '100%',
  },
  // clock: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   borderWidth: 2,
  //   borderColor: 'white',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // clockHand: {
  //   width: 4,
  //   height: 80,
  //   backgroundColor: 'white',
  //   position: 'absolute',
  //   transform: [{ rotate: '90deg' }], // Adjust the initial rotation angle if needed
  // },
  hourText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color:colors.white
  },
});
