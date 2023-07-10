import NetInfo from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';
import React from 'react';
import {View} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {getPlaylist, syncTimeStamp} from 'services/api/api-actions';
import Regular from 'typography/regular-text';
import styles from './styles';
// let deviceId =
import {PlayerLottie} from 'assets/lottie';
import {Loader} from 'components/atoms/loader';
import VerticalMarquee from 'components/molecules/marquee-txt/vertical-morquee';
import VideoFrame from 'components/molecules/video-frame';
import {PLAYLIST} from 'config/playlist';
import Lottie from 'lottie-react-native';
import Medium from 'typography/medium-text';
import HorizontalMarquee from 'components/molecules/marquee-txt/horizontal-marquee';

const Home = props => {
  const [playerId, setPlayerId] = React.useState('');
  const [videos, setVideos] = React.useState([]);
  const [playlist, setPlaylist] = React.useState(PLAYLIST);
  const [nextIndex, setNextIndex] = React.useState(0);
  const [isConnected, setIsConnected] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  console.log(width, height);
  React.useEffect(() => {
    (async () => {
      // database()
      //   .ref(`/users/12`).onDisconnect().remove((error) => {
      //     // Do some stuff
      //     console.log('disconnected client');
      //   });
      getUniqueId().then(id => {
        console.log('player id=>>:::', id);
        setPlayerId(id);
        setLoading(false);
      });
    })();
  }, []);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(`Current blinking text`);
      (() => {
        if (playerId !== '' && isConnected) {
          syncTimeStamp(playerId);
        }
      })();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  React.useEffect(() => {
    if (playerId !== '') {
      database()
        .ref(`/devices/${playerId}`)
        .on('value', snapshot => {
          const device = snapshot.val();
          if (device) {
            setIsConnected(true);
          } else {
            setIsConnected(false);
          }
          console.log('Device data:---===--->>> ', device);
        });
    }
    // Stop listening for updates when no longer required
    // return () => database().ref(`/users/${userId}`).off('value', onValueChange);
  }, [playerId]);
  React.useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const getVideos = async () => {
    try {
      const res = await getPlaylist(playerId);
      // setVideos(res);
      // setPlaylist(res?.data);
      console.log('get videos response ===> ', res);
    } catch (error) {}
  };
  React.useEffect(() => {
    getVideos();
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (!isConnected)
    return (
      <View style={styles.container}>
        <Lottie
          source={PlayerLottie}
          autoPlay
          loop
          style={{height: height / 2, alignSelf: 'center'}}
        />
        <View style={{flex: 1, alignItems: 'center'}}>
          <Regular label={'Please Put your player id in the web portal'} />
          <Medium
            numberOfLines={2}
            label={playerId}
            style={{color: colors.primary, fontSize: mvs(34)}}
          />
        </View>
      </View>
    );
  // return (<IconPositions x={100} y={200} direction={'left'} />);
  return (
    <View style={styles.container}>
      {playlist?.videos && (
        <VideoFrame
          nextIndex={nextIndex}
          setNextIndex={setNextIndex}
          playlist={playlist}
          speed={5}
          frameItem={playlist?.videos[nextIndex] || {}}
        />
      )}
      <View style={styles.marqueeView}>
        <HorizontalMarquee
          type={'right'}
          delay={playlist?.message?.delay}
          content={playlist?.message?.message}
        />
        <VerticalMarquee
          type={'bottom'}
          delay={playlist?.message?.delay}
          content={playlist?.message?.message}
        />
      </View>
    </View>
  );
};
export default Home;
