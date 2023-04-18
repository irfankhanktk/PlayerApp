import { colors } from 'config/colors';
import { height, mvs } from 'config/metrices';
import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video'
import convertToProxyURL from 'react-native-video-cache';
import Regular from 'typography/regular-text';
import { UTILS } from 'utils';

const VideoFrame = ({
    frameItem,
}) => {
    // console.log('frame==>', frameItem);
    const videoRef = React.useRef(null);
    const [frame, setFrame] = React.useState({ ...frameItem });
    const onBuffer = (buffer) => {
        // if (buffer?.isBuffering === false) setIsNext(false)
    }
    const videoError = (error) => {
        console.log("=======================VIDEO ERROR===================", error)
    }
    const pauseAfter20Seconds = () => {
    };
    const onProgress = (progress) => {
        const { currentTime, playableDuration } = progress;
        const copy = { ...frame };
        copy.videos[frame?.videoIndex || 0].currentProgress = currentTime;
        if (copy.videos[copy?.videoIndex || 0]?.runningTime <= currentTime) {
            if (copy.videos?.length === 1) {
                videoRef?.current?.seek(0);
            } else {
                const nextVideoIndex = ((copy?.videoIndex || 0) + 1) % copy?.videos.length;
                copy.videoIndex = nextVideoIndex;
                setFrame(copy);
            }
        } else {
            setFrame(copy);
        }
    }
    return (
        <View style={{ height: height / 2, width: frame?.width }}>
            <Video
                source={{ uri: frame?.videos[frame?.videoIndex || 0]?.uri?.indexOf("file") >= 0 ? frameItem?.videos[frame?.videoIndex || 0]?.uri : convertToProxyURL(frameItem?.videos[frame?.videoIndex || 0]?.uri || "no_video") }}   // Can be a URL or a local file.
                controls
                resizeMode={'stretch'}
                // paused={paused}
                fullscreen={false}
                ref={videoRef}                                      // Store reference
                onBuffer={onBuffer}                // Callback when remote video is buffering
                onError={videoError}               // Callback when video cannot be loaded
                onProgress={onProgress}
                onReadyForDisplay={pauseAfter20Seconds}
                style={styles.backgroundVideo}
                useTextureView={false}
                repeat
                playInBackground={true}
                disableFocus={true}
            />
            {frame?.videos[frame?.videoIndex || 0]?.widgets?.map((w, i) => w?.setting?.delay > frame?.videos[frame?.videoIndex || 0]?.currentProgress ? null : (
                <TouchableOpacity
                    key={i}
                    onPress={() => UTILS.openUrl(w?.url)}
                    style={[styles.widget, {
                        left: w?.setting?.position?.x,
                        top: w?.setting?.position?.y,
                    }]}>
                    <Regular label={w?.title} style={{ marginRight: mvs(10) }} color={colors.white} />
                    <Image source={{ uri: w?.icon }} style={{ height: mvs(25), width: mvs(30) }} />
                </TouchableOpacity>))}
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
        backgroundColor: colors.primary
    },
    backgroundVideo: {
        height: 300,
        width: '100%'
    },
});