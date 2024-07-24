import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {VLCPlayer} from 'react-native-vlc-media-player';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import {navigate} from 'navigation/navigation-ref';
import IconPositions from '../icon-positions';

const VideoFrame = ({
  frameItem,
  setNextIndex = index => {},
  nextIndex,
  playlist,
  getVideos,
}) => {
  const [currentProgressTime, setCurrentProgressTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [key, setKey] = useState(0); // State to manage component key
  const playerRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onBuffer = buffer => {
    // Handle buffering if needed
  };

  const videoError = error => {
    console.log('VIDEO ERROR:', error);
    // Handle video error if needed
  };

  const onProgress = progress => {
    const {currentTime, duration} = progress;
    setCurrentProgressTime(currentTime);
  };

  const onEnd = () => {
    const isLastVideo = nextIndex >= playlist?.videos?.length - 1;
    if (isLastVideo) {
      getVideos();
      setNextIndex(0); // Reset to the first video
    } else {
      setNextIndex(nextIndex + 1); // Move to the next video
    }
    setCurrentProgressTime(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setKey(prevKey => prevKey + 1); // Update key to re-render the component
    }, 3000);

    return () => clearTimeout(timer);
  }, [nextIndex]);

  const pauseAfter20Seconds = () => {
    // Handle pausing after 20 seconds if needed
  };

  const currentVideoUrl = playlist?.videos[nextIndex]?.video_url || 'no_video';

  return (
    <View style={{flex: 1}}>
      <VLCPlayer
        key={key} // Use key to force re-render
        ref={playerRef}
        style={styles.backgroundVideo}
        source={{
          initType: 1,
          uri: currentVideoUrl,
          autoplay: true,
          hwDecoderEnabled: 1,
          hwDecoderForced: 1,
          initOptions: [
            '--network-caching=150',
            '--rtsp-caching=150',
            '--no-audio',
          ],
        }}
        paused={false}
        resizeMode="cover"
        repeat={false} // Disable repeat in VLCPlayer since we handle repeat logic manually
        onProgress={onProgress}
        onError={videoError}
        onBuffer={onBuffer}
        onEnd={onEnd} // Handle end of video
        onReadyForDisplay={pauseAfter20Seconds}
        playInBackground={true}
        disableFocus={true}
        autoplay={true}
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
                    navigate('PDFViewerScreen', {
                      pdfUrl: w?.url,
                    });
                  } else {
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
  widget: {
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(3),
    borderRadius: mvs(12),
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: colors.primary,
  },
});
