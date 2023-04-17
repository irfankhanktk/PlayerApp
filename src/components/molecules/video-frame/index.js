import React from 'react';
import { View, Text } from 'react-native';
import Video from 'react-native-video'
const VideoFrame = ({
    frameItem,
}) => {
    const [frame, setFrame] = React.useState(frameItem);

    const onProgress = (progress, item, index) => {
        const { currentTime, playableDuration } = progress;
        const copy = { ...frame };
        item.videos[item?.videoIndex || 0].currentProgress = currentTime;
        // setVideos(copy);
        // setCurrentProgress(currentTime);
        // console.log({currentTime})
        if (item.videos[item?.videoIndex || 0]?.runningTime <= currentTime) {
            const nextVideoIndex = ((item?.videoIndex || 0) + 1) % item?.videos.length;
            item.videoIndex = nextVideoIndex;
            copy[index] = item;
            setFrame(copy);
        } else {
            copy[index] = item;
            setFrame(copy);
        }
    }
    return (
        <View key={index} style={{ height: frameItem?.height, width: frameItem?.width, margin: 3 }}>
            <Video
                source={{ uri: frameItem?.videos[frameItem?.videoIndex || 0]?.uri?.indexOf("file") >= 0 ? frameItem?.videos[frameItem?.videoIndex || 0]?.uri : convertToProxyURL(frameItem?.videos[frameItem?.videoIndex || 0]?.uri || "no_video") }}   // Can be a URL or a local file.
                // source={require(`./local.mp4`)}
                // source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                controls
                resizeMode={'stretch'}

                // paused={paused}
                fullscreen={false}
                // ref={videoRef}                                      // Store reference
                onBuffer={(b) => onBuffer(b)}                // Callback when remote video is buffering
                onError={(e) => videoError(e)}               // Callback when video cannot be loaded
                onProgress={(progress) => onProgress(progress, frameItem, index)}
                onReadyForDisplay={pauseAfter20Seconds}
                style={styles.backgroundVideo}
                useTextureView={false}
                repeat
                playInBackground={true}
                disableFocus={true}
            />
            {frameItem?.videos[frameItem?.videoIndex || 0]?.widgets?.map((w, i) => w?.setting?.delay > frameItem?.videos[frameItem?.videoIndex || 0]?.currentProgress ? null : (
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
export default VideoFrame;