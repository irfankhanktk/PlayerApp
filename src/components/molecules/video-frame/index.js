import {colors} from 'config/colors';
import {height, mvs} from 'config/metrices';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image} from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import {navigate} from 'navigation/navigation-ref';
import IconPositions from '../icon-positions';
import Bold from 'typography/bold-text';

const VideoFrame = ({
  frameItem,
  setNextIndex = index => {},
  nextIndex,
  playlist,
  getVideos, // Add getVideos as a prop
  props,
}) => {
  const videoRef = React.useRef(null);
  const [currentProgressTime, setCurrentProgressTime] = React.useState(0);
  const frame = {...frameItem};
  // console.log('framItem check===>', frameItem);
  const onBuffer = buffer => {
    // if (buffer?.isBuffering === false) setIsNext(false)
  };

  const videoError = error => {
    console.log('=======================VIDEO ERROR===================', error);
  };

  const pauseAfter20Seconds = () => {};
  const onProgress = progress => {
    const {currentTime, playableDuration} = progress;
    // console.log('playableDuration::', playableDuration);
    console.log('currentTime::', currentTime);

    if (Math.round(currentTime) >= Math.round(playableDuration)) {
      const isLastVideo = nextIndex >= playlist?.videos?.length - 1;
      if (isLastVideo) {
        console.log('is last video');
        getVideos();
        setNextIndex(0); // Reset to the first video
      } else {
        console.log('next video index');
        setNextIndex(nextIndex + 1);
      }
      setCurrentProgressTime(0);
    } else {
      setCurrentProgressTime(currentTime);
    }
  };

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
  const proxyUrl = convertToProxyURL(
    frameItem?.video_url || frameItem?.localPath || 'no_video',
  );
  return (
    <View style={{flex: 1}}>
      <Video
        source={{
          uri: proxyUrl,
        }} // Can be a URL or a local file.
        controls={false}
        resizeMode={'cover'}
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
          <IconPositions
            key={i}
            onPress={() => UTILS.openUrl(w?.url)}
            x={100}
            y={200}
            direction={'left'}>
            {w.title.toLowerCase() === 'clock' ? (
              <>
                <Regular
                  style={styles.hourText}
                  label={currentTime.toLocaleTimeString()}
                />
              </>
            ) : (
              <TouchableOpacity
                key={i}
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
                  style={{marginRight: mvs(10)}}
                  color={colors.white}
                />
                <Image
                  source={{uri: w?.icon}}
                  style={{height: mvs(25), width: mvs(30)}}
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
    backgroundColor: colors.black,
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
  hourText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
});
