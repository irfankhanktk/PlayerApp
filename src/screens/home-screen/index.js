import NetInfo from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';
import React from 'react';
import {Alert, View} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {getPlaylist, syncTimeStamp} from 'services/api/api-actions';
import Regular from 'typography/regular-text';
import styles from './styles';
import {PlayerLottie} from 'assets/lottie';
import {Loader} from 'components/atoms/loader';
import VerticalMarquee from 'components/molecules/marquee-txt/vertical-morquee';
import VideoFrame from 'components/molecules/video-frame';
import Lottie from 'lottie-react-native';
import Medium from 'typography/medium-text';
import HorizontalMarquee from 'components/molecules/marquee-txt/horizontal-marquee';
import {convertToSixDigitNumber} from '../../utils/get-hashed-key';
import {Linking} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import db, {
  createTableIfNotExists,
  downloadVideo,
  saveDataToDatabase,
} from 'services/sqlite/db';

const Home = props => {
  const [playerId, setPlayerId] = React.useState('');
  const [videos, setVideos] = React.useState([]);
  const [playlist, setPlaylist] = React.useState({});
  const [nextIndex, setNextIndex] = React.useState(1);
  const [isConnected, setIsConnected] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  console.log(width, height);

  // Call this function when initializing the component
  const initializeDatabase = () => {
    createTableIfNotExists();
  };

  const requestOverlayPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const result = await check(PERMISSIONS.ANDROID.SYSTEM_ALERT_WINDOW);
        console.log('RESULT:', result);

        if (result === RESULTS.UNAVAILABLE) {
          console.log('Permission is not available on this device.');
          return;
        }
        if (result !== RESULTS.GRANTED) {
          Alert.alert(
            'Permission Needed',
            'PlayerApp needs to be granted permission to draw over other windows. On the next screen, please grant this permission.',
            [
              {
                text: 'Go to Settings',
                onPress: () => Linking.openSettings(),
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        }
      } catch (error) {
        console.error('Error checking permission:', error);
      }
    }
  };

  const getVideos = async () => {
    try {
      const res = await getPlaylist(playerId);
      // console.log('res check===>', res);
      const videoData = await Promise.all(
        res?.data?.videos.map(async video => {
          const localPath = await downloadVideo(
            video.video_url,
            `${video.video_title}.mp4`,
          );
          return {...video, localPath};
        }),
      );
      setVideos(videoData);
      setPlaylist(res?.data);
      saveDataToDatabase(videoData);
    } catch (error) {
      console.log('Error fetching playlist', error);
    }
  };

  const getLastSavedData = async () => {
    if (!db) return;

    const executeSqlAsync = (sql, params = []) => {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            sql,
            params,
            (tx, results) => resolve(results),
            (tx, error) => reject(error),
          );
        });
      });
    };

    try {
      const results = await executeSqlAsync(
        'SELECT video_time, video_title, video_url, widget_data, localPath FROM Playlist ORDER BY id DESC',
        [],
      );

      if (results.rows.length > 0) {
        const lastData = [];
        for (let i = 0; i < results.rows.length; i++) {
          const item = {
            video_time: results.rows.item(i).video_time,
            video_title: results.rows.item(i).video_title,
            video_url: results.rows.item(i).video_url,
            widget_data: results.rows.item(i).widget_data
              ? JSON.parse(results.rows.item(i).widget_data)
              : null,
            localPath: results.rows.item(i).localPath,
          };
          lastData.push(item);
        }
        console.log('lastData check from sqlLite===>', lastData);
        setVideos(lastData);
        setPlaylist({videos: lastData});
        console.log('last video check===>', playlist?.videos);
      }
    } catch (error) {
      console.log('Error retrieving data', error);
    }
  };

  React.useEffect(() => {
    requestOverlayPermission(); // Request the permission first

    initializeDatabase();
  }, []);

  React.useEffect(() => {
    (async () => {
      database()
        .ref(`/users/12`)
        .onDisconnect()
        .remove(error => {
          console.log('disconnected client');
        });
      getUniqueId().then(id => {
        console.log('player id=>>:::', id);
        const pId = convertToSixDigitNumber(id);
        setPlayerId(pId);
        setLoading(false);
      });
    })();
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (playerId !== '' && isConnected) {
        syncTimeStamp(playerId);
      }
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [playerId, isConnected]);

  React.useEffect(() => {
    if (playerId !== '') {
      database()
        .ref(`/devices/${playerId}`)
        .on('value', snapshot => {
          const device = snapshot.val();
          setIsConnected(!!device);
          console.log('Device data:---===--->>> ', device);
        });
    }
  }, [playerId]);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (!state?.isConnected) {
        getLastSavedData();
      }
    });
    return () => unsubscribe();
  }, [playerId]);

  React.useEffect(() => {
    if (!playerId) {
      // Handle case where playerId does not exist
    } else {
      getVideos();
    }
  }, [playerId]);

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

  return (
    <View style={styles.container}>
      {playlist?.videos && (
        <VideoFrame
          nextIndex={nextIndex}
          setNextIndex={setNextIndex}
          playlist={playlist}
          getVideos={getVideos}
          speed={5}
          frameItem={playlist?.videos[nextIndex] || {}}
        />
      )}
    </View>
  );
};

export default Home;
