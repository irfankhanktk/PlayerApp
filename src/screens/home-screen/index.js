import NetInfo from "@react-native-community/netinfo";
import database from '@react-native-firebase/database';
import { colors } from 'config/colors';
import { height, mvs, width } from 'config/metrices';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import MarqueeText from 'react-native-marquee';
import { openDatabase } from 'react-native-sqlite-storage';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {
  syncTimeStamp
} from 'services/api/api-actions';
import Regular from 'typography/regular-text';
import styles from './styles';
// let deviceId = 
import { Loader } from "components/atoms/loader";
import MarqueeVertically from "components/molecules/marquee-txt";
import Lottie from "lottie-react-native";
import { getAllOfCollection, saveData } from 'services/firebase';
import Medium from 'typography/medium-text';
import { UTILS } from "utils";
import { PlayerLottie } from "assets/lottie";
import { Row } from "components/atoms/row";
import VideoFrame from "components/molecules/video-frame";

const Home = props => {
  var db = openDatabase({ name: 'VideoDatabase.db' });
  const [playerId, setPlayerId] = React.useState('');
  const [videos, setVideos] = React.useState([])
  const [isConnected, setIsConnected] = React.useState(false)
  const [loading, setLoading] = React.useState(true);
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
      })
    })()
  }, [])
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(`Current blinking text`);
      (() => {
        if (playerId !== '' && isConnected) {
          // syncTimeStamp(playerId);
        }
      })()

    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [])
  React.useEffect(() => {
    if (playerId !== '') {
      database()
        .ref(`/devices/${playerId}`).on('value', snapshot => {
          const device = snapshot.val();
          if (device) {
            setIsConnected(true)
          } else {
            setIsConnected(false)
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
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
    return () => unsubscribe();
  }, [])
  // const ActivateDB = (drop = false) => {
  //   db.transaction(function (txn) {
  //     if (drop) {
  //       console.log("Dropping Database Table")
  //       txn.executeSql('DROP TABLE IF EXISTS table_video', []);
  //     }
  //     // console.log("CREATING or OPENING Database Table")
  //     txn.executeSql(
  //       'CREATE TABLE IF NOT EXISTS table_video(video_id INTEGER PRIMARY KEY AUTOINCREMENT,video_name VARCHAR(100), video_path VARCHAR(255))',
  //       [],
  //       (tx, success) => {
  //         console.log("DB OK")
  //       },
  //       (tx, error) => {
  //         console.log("ERROR create table====> ", error)
  //       },
  //     );
  //   });
  // }
  const fetchAllVideos = () => {
    console.log("Fetching All Videos from DB...")
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_video',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(
              {
                title: "VIDEO " + (i + 1),
                time: 40,
                uri: `file://${results.rows.item(i).video_path}`,
                repeat: false,
              },
            );
          }
          // console.log("ALL VIDEOS===> ", temp)
          // setVideos(temp)
        }
      );
    });
  }
  // const onStoreVideoPath = (video_path, video_name) => {
  //   db.transaction(function (tx) {
  //     tx.executeSql(
  //       'INSERT INTO table_video (video_path) VALUES (?)',
  //       [video_path],
  //       (tx, results) => {
  //         console.log('DB Write Effect Rows===> ', results.rowsAffected);
  //         if (results.rowsAffected > 0) {
  //           console.log("Download Successfully - DB")
  //         } else {
  //           console.log("Download Failed - DB")
  //         }
  //       },
  //       (tx, error) => {
  //         console.log("Store in DB failed ===> ", { video_name, video_path })
  //       }
  //     );
  //   });
  // }
  // const onDownloadVideo = (url, name) => {
  //   if (!url) return console.log("Please Provide URL")
  //   if (!name) {
  //     let index = url.lastIndexOf("/")
  //     name = url.slice(index + 1)
  //   }
  //   RNFS.downloadFile({
  //     fromUrl: url,
  //     toFile: `${RNFS.DocumentDirectoryPath}/${name}`,
  //   }).promise.then((r) => {
  //     console.log("DOWNLOADED=====> ", r)
  //     onStoreVideoPath(`${RNFS.DocumentDirectoryPath}/${name}`, name)
  //   }).catch((error) => {
  //     console.log("DOWNLOAD ERROR====> ", error)
  //   })
  // }
  const getVideos = async () => {
    try {

      const res = await getAllOfCollection('videos');
      setVideos(res);
      console.log("get videos response ===> ", res)
    } catch (error) {
      fetchAllVideos()
    }
  }
  React.useEffect(() => {
    getVideos();
  }, [])
  if (loading) {
    return (<Loader />)
  }
  if (!isConnected)
    return (
      <View style={styles.container}>
        <Lottie
          source={PlayerLottie}
          autoPlay loop style={{ height: height / 2, alignSelf: 'center' }} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Regular label={'Please Put your player id in the web portal'} />
          <Medium label={playerId} style={{ color: colors.primary, fontSize: mvs(34) }} />
          <MarqueeVertically />
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <VideoFrame frameItem={videos[0] || {}} />
      {/* <View style={styles.marqueeView}>
        <MarqueeText
          style={{ fontSize: mvs(18), color: colors.green }}
          speed={0.1}
          marqueeOnStart={true}
          loop={true}
          delay={10000} >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry.
        </MarqueeText>
      </View> */}
    </View>
  );
};
export default Home;