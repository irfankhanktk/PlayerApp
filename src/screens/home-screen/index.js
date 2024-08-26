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
import RNFS from 'react-native-fs';
import db from 'services/sqlite/db';

const Home = props => {
  const [playerId, setPlayerId] = React.useState('');
  const [videos, setVideos] = React.useState([]);
  const [playlist, setPlaylist] = React.useState({});
  const [nextIndex, setNextIndex] = React.useState(0);
  const [isConnected, setIsConnected] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  console.log(width, height);
  const createTableIfNotExists = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Playlist (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          video_time INTEGER,
          video_title TEXT UNIQUE,
          video_url TEXT,
          widget_data TEXT,
          localPath TEXT
        )`,
        [],
        () => console.log('Table created or already exists'),
        error => console.log('Error creating table', error),
      );
    });
  };

  // Call this function when initializing the component
  const initializeDatabase = () => {
    createTableIfNotExists();
  };

  const downloadVideo = async (url, fileName) => {
    const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const download = RNFS.downloadFile({
      fromUrl: url,
      toFile: path,
    });
    const result = await download.promise;
    if (result.statusCode === 200) {
      return path;
    } else {
      throw new Error('Failed to download video');
    }
  };

  const saveDataToDatabase = async videos => {
    if (!db) return;

    db.transaction(tx => {
      videos.forEach(video => {
        // Check if video already exists
        tx.executeSql(
          'SELECT COUNT(*) AS count FROM Playlist WHERE video_title = ?',
          [video.video_title],
          (tx, results) => {
            const count = results.rows.item(0).count;
            if (count > 0) {
              // If video exists, check if the URL is different
              tx.executeSql(
                'SELECT video_url FROM Playlist WHERE video_title = ?',
                [video.video_title],
                (tx, results) => {
                  const existingVideoUrl = results.rows.item(0).video_url;
                  if (existingVideoUrl !== video.video_url) {
                    // Update existing video if the URL is different
                    tx.executeSql(
                      'UPDATE Playlist SET video_time = ?, video_url = ?, widget_data = ?, localPath = ? WHERE video_title = ?',
                      [
                        video.video_time,
                        video.video_url,
                        video.widget_data
                          ? JSON.stringify(video.widget_data)
                          : null,
                        video.localPath,
                        video.video_title,
                      ],
                      () => console.log('Video data updated successfully'),
                      error => console.log('Error updating video data', error),
                    );
                  }
                },
                error => console.log('Error checking video URL', error),
              );
            } else {
              // Insert new video if it doesn't exist
              tx.executeSql(
                'INSERT INTO Playlist (video_time, video_title, video_url, widget_data, localPath) VALUES (?, ?, ?, ?, ?)',
                [
                  video.video_time,
                  video.video_title,
                  video.video_url,
                  video.widget_data ? JSON.stringify(video.widget_data) : null,
                  video.localPath,
                ],
                () => console.log('Video data inserted successfully'),
                error => console.log('Error inserting video data', error),
              );
            }
          },
          error => console.log('Error checking video existence', error),
        );
      });
    });
  };

  const getVideos = async () => {
    try {
      if (!isConnected) {
        const res = await getPlaylist(playerId);
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
      }
    } catch (error) {
      console.log('Error fetching playlist', error);
    }
  };

  const getLastSavedData = () => {
    if (!db) return;

    db.transaction(tx => {
      tx.executeSql(
        'SELECT video_time, video_title, video_url, widget_data, localPath FROM Playlist ORDER BY id DESC',
        [],
        (tx, results) => {
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
        },
        error => console.log('Error retrieving data', error),
      );
    });
  };
  // Call initializeDatabase() inside your useEffect or initialization logic
  React.useEffect(() => {
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

  // React.useEffect(() => {
  //   NetInfo.fetch().then(state => {
  //     if (!state.isConnected) {
  //       getLastSavedData();
  //     }
  //   });
  // }, []);
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (!state?.isConnected) {
        getLastSavedData();
      } else if (!playerId) {
      } else {
        getVideos();
      }
    });
    return () => unsubscribe();
  }, [playerId]);

  // React.useEffect(() => {
  //   if (!playerId) {
  //     // Handle case where playerId does not exist
  //   } else {
  //     getVideos();
  //   }
  // }, [playerId]);

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
