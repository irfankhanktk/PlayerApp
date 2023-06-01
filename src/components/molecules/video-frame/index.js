import {colors} from 'config/colors';
import {height, mvs} from 'config/metrices';
import React from 'react';
import {Image} from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import {navigate} from 'navigation/navigation-ref';

const VideoFrame = ({frameItem, playlist, props}) => {
  // console.log('frame==>', frameItem);
  const videoRef = React.useRef(null);
  const [currentProgressTime, setCurrentProgressTime] = React.useState(0);
  const frame = {...frameItem};
  const onBuffer = buffer => {
    // if (buffer?.isBuffering === false) setIsNext(false)
  };
  const videoError = error => {
    console.log('=======================VIDEO ERROR===================', error);
  };
  const pauseAfter20Seconds = () => {};
  const onProgress = progress => {
    const {currentTime, playableDuration} = progress;
    setCurrentProgressTime(currentTime);
  };
  // multple video frame
  return (
    <View style={{flex: 1}}>
      <Video
        // source={{
        //   uri:
        //     frame?.video_url?.indexOf('file') >= 0
        //       ? frameItem?.video_url
        //       : convertToProxyURL(frameItem?.video_url || 'no_video'),
        // }} // Can be a URL or a local file.
        source={{
          uri: convertToProxyURL(
            'http://70.35.197.229:3000/editor/admin/files/1681994082.mp4' ||
              'no_video',
          ),
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
      {frame?.widgets?.map((w, i) =>
        w?.setting?.delay > currentProgressTime ? null : (
          <TouchableOpacity
            key={i}
            // onPress={() => UTILS.openUrl(w?.url)}
            onPress={() =>
              navigate('WebViewScreen', {
                url: w?.url,
              })
            }
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
});
