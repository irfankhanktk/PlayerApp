import { CurrentRenderContext, useIsFocused } from '@react-navigation/native';
import { appointment_bg } from 'assets/images';
import { IconButton } from 'components/atoms/buttons';
import AppHeader from 'components/atoms/headers';
import { Row } from 'components/atoms/row';
import AppointmentCounter from 'components/molecules/appointment-counter';
import { EmptyList } from 'components/molecules/empty-list';
import PopularPatientCard from 'components/molecules/popular-patient-card';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import { navigate } from 'navigation/navigation-ref';
import React from 'react';
import MarqueeText from 'react-native-marquee';
import { FlatList, ImageBackground, ScrollView, View, Text, PermissionsAndroid, Image, Alert, TouchableOpacity, Linking, Animated } from 'react-native';
import {
  getAllHospitals,
  getHomeData,
  getNotifications
} from 'services/api/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import Video from 'react-native-video';
import localVideo from "./local.mp4"
import convertToProxyURL from 'react-native-video-cache';
import VideoPlayer from 'react-native-video-controls';
import RNFS from "react-native-fs"
import { openDatabase } from 'react-native-sqlite-storage';
let videoURL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
let videoURL2 = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1";
let videoURL3 = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
let videoURL4 = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

const Home = props => {
  const VIDEOLIST = [
    {
      uri: videoURL,
      title: "VIDEO 1",
      time: 70,
      repeat: false
    },
    {
      uri: videoURL2,
      title: "VIDEO 2",
      time: 10,
      repeat: false
    },
    {
      uri: videoURL3,
      title: "VIDEO 3",
      time: 10,
      repeat: false
    },
    {
      uri: videoURL4,
      title: "VIDEO 4",
      time: 15,
      repeat: false
    },
  ]
  var db = openDatabase({ name: 'VideoDatabase.db' });
  const { userInfo, unreadNotification, location } = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const { t } = i18n;
  const [homeData, setHomeData] = React.useState({});
  const [videos, setVideos] = React.useState([])
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0)
  const [timeLimit, setTimeLimit] = React.useState(20)
  const [isNext, setIsNext] = React.useState(null)
  const [picture, setPicture] = React.useState(null)
  const [allVideos, setAllVideos] = React.useState(
    [{ "video_id": 1, "video_path": "/data/user/0/com.prismatic.playerapp/files/react-native.png" }, { "video_id": 2, "video_path": "/data/user/0/com.prismatic.playerapp/files/react-native.png" }, { "video_id": 3, "video_path": "/data/user/0/com.prismatic.playerapp/files/react-native.png" }]
  )
  const startValue = React.useRef(new Animated.Value(0)).current;
  const endValue = 150;
  const duration = 5000;

  React.useEffect(() => {
    Animated.timing(startValue, {
      toValue: -endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [startValue]);
  const videoRef = React.useRef()
  React.useEffect(() => {
    if (isNext) {
      console.log("Play next ? ", isNext)
      playNext()
      // setIsNext(false)
    } else {
    }
  }, [isNext])
  React.useEffect(() => {
    // const intervalId = setInterval(()=>setCurrentVideoIndex((currentIndex)=>(currentIndex + 1) % videos.length), 35000)
    // return ()=>clearInterval(intervalId)
  }, [])
  const ActivateDB = () => {
    db.transaction(function (txn) {
      // txn.executeSql('DROP TABLE IF EXISTS table_video', []);
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS table_video(video_id INTEGER PRIMARY KEY AUTOINCREMENT,video_name VARCHAR(100), video_path VARCHAR(255))',
        [],
        (tx, success) => {
          // console.log("SUCCESS tx====> ", tx)
          console.log("SUCCESS create table====> ", success)
        },
        (tx, error) => {
          // console.log("ERROR tx====> ", tx)
          console.log("ERROR create table====> ", error)
        },
      );
    });
  }
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

          // setAllVideos(temp);
          console.log("ALL VIDEOS===> ", temp)
          setVideos(temp)
        }
      );
    });
  }
  const onStoreVideoPath = (video_path, video_name) => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_video (video_path) VALUES (?)',
        [video_path],
        (tx, results) => {
          console.log('DB Write Effect Rows===> ', results.rowsAffected);
          console.log('DB Write Results===> ', results);
          // console.log('DB Write tx===> ', tx);
          if (results.rowsAffected > 0) {
            console.log("Download Successfully - DB")

            // Alert.alert(
            //   'Success',
            //   'You are Successfully Downloaded - DB',
            //   [
            //     {
            //       text: 'Ok',
            //       onPress: () => { },
            //     },
            //   ],
            //   { cancelable: false }
            // );
          } else {
            console.log("Download Failed - DB")
            // Alert.alert('Download Failed - DB');
          }
        },
        (tx, error) => {
          console.log("Store in DB failed ===> ", { video_name, video_path })
          // Alert.alert("Store in DB Failed", "Video: " + video_name)
        }
      );
    });
  }
  const onDownloadImagePress = (url, name) => {

  }
  const onDownloadVideo = (url, name) => {
    console.log("Download...")
    if (!url) return console.log("Please Provide URL")
    if (!name) {
      let index = url.lastIndexOf("/")
      name = url.slice(index + 1)
    }
    console.log({ name, url })
    RNFS.downloadFile({
      fromUrl: url,
      toFile: `${RNFS.DocumentDirectoryPath}/${name}`,
    }).promise.then((r) => {
      console.log("DOWNLOADED=====> ", r)
      onStoreVideoPath(`${RNFS.DocumentDirectoryPath}/${name}`, name)
    }).catch((error) => {
      console.log("DOWNLOAD ERROR====> ", error)
    })
  }
  const onLoadDownloaded = () => {
    RNFS.readDir(`${RNFS.DocumentDirectoryPath}`)
      .then((result) => {
        console.log("Directory OPENED===> ", result);
        setPicture(result[0].path)
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1]);
        }

        return 'no file';
      })
      .then((contents) => {
        // log the file contents
        console.log(contents);
      })
      .catch((e) => {
        console.log("ERROR FILE OPEN ====> ", e)
        console.log("ERROR MESSAGE - ERROR CODE ", e.message, " - ", e.code)
      })
  }
  const requestReadWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write Permission',
          message:
            'App needs access to your Storage ' +
            'so you can download videos and pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const grantedRead = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Write Permission',
          message:
            'App needs access to your Storage ' +
            'so you can View videos and pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You write now');
      } else {
        console.log('Write permission denied');
      }
      if (grantedRead === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You read now');
      } else {
        console.log('Read permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  React.useEffect(() => {
    console.log("VIDEOS====> ", videos)
  }, [videos])
  React.useEffect(() => {
    requestReadWritePermission()
    // ActivateDB()
    // onDownloadImagePress()
    // onLoadDownloaded()
    // fetchAllVideos()
    onSimulateAPI()
  }, [])
  const onProgress = (progress) => {
    const { currentTime, playableDuration } = progress
    // console.log("CURRENT TIME REF===> ", videoRef?.current?.onSeek)
    // console.log({currentTime})
    if (videos[currentVideoIndex]?.time <= currentTime && !isNext === true) {
      setIsNext(true)
      console.log("TIME LIMIT EXCEEDS: ", timeLimit <= currentTime, "\nVIDEO END: ", playableDuration <= currentTime)
      // playNext()
    }
  }
  const playNext = () => {
    if (videos[currentVideoIndex]?.repeat) {
      videoRef?.current?.seek(0);
    } else
      setCurrentVideoIndex((currentIndex) => (currentIndex + 1) % videos.length)
  }
  // React.useEffect(() => {
  //   // getDoctorAvailability(2);
  //   dispatch(getAllHospitals());
  //   (async () => {
  //     try {
  //       if (isFocus) {
  //         const res = await getHomeData(userInfo?.id);
  //         loadNotifications();
  //         setHomeData(res);
  //       }
  //     } catch (error) { }
  //   })();
  // }, [isFocus]);
  const loadNotifications = async () => {
    try {
      dispatch(getNotifications({ doctor_id: userInfo?.id }));
    } catch (error) {
      console.log('error=>', error);
    }
  };
  const onBuffer = (buffer) => {
    console.log("===============VIDEO BUFFRING=================== ", buffer)
    if (buffer?.isBuffering === false) setIsNext(false)
  }
  const videoError = (error) => {
    console.log("=======================VIDEO ERROR===================", error)
  }
  const onSimulateAPI = () => {
    let success = true;
    setTimeout(() => {
      if (success) {
        console.log("SIMULATING SUCCESS RESPONSE")
        setVideos(VIDEOLIST)
        VIDEOLIST.map((value, index) => {
          setTimeout(() => onDownloadVideo(value.uri), 500)
        })
      } else {
        console.log("SIMULATING 404 RESPONSE")
        fetchAllVideos()
      }
    }, 5000)
  };
  const position = 'center';
  const isTop = true;
  return (
    <View style={styles.container}>
      {/* <AppHeader
        unreadNotification={unreadNotification}
        title={`\t${userInfo?.name || t('guest')}`}
      /> */}

      <View style={styles.container}>

        {/* <View style={styles.videoView}> */}
        <Video
          // source={localVideo}   // Can be a URL or a local file.
          source={{ uri: videos[currentVideoIndex]?.uri?.indexOf("file") >= 0 ? videos[currentVideoIndex]?.uri : convertToProxyURL(videos[currentVideoIndex]?.uri || "no_video") }}   // Can be a URL or a local file.
          // source={{ uri: convertToProxyURL(videos[currentVideoIndex]?.uri || "no_video") }}   // Can be a URL or a local file.
          controls={false}
          resizeMode={'cover'}
          fullscreen={true}
          ref={videoRef}                                      // Store reference
          onBuffer={(b) => onBuffer(b)}                // Callback when remote video is buffering
          onError={(e) => videoError(e)}               // Callback when video cannot be loaded
          onProgress={onProgress}
          style={styles.backgroundVideo}
        // style={{ width: 400, height: 300, backgroundColor: "lightblue" }}
        />
        <View style={styles.marqueeView}>
          <MarqueeText
            style={{ fontSize: mvs(18) }}
            speed={0.1}
            marqueeOnStart={true}
            loop={true}
            delay={10000}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry.
          </MarqueeText>
        </View>
        <TouchableOpacity
          onPress={() => {
            try {
              url = 'whatsapp://send'
              return Linking.openURL(url);
            } catch (error) {
              console.log("RN Linking Error: ", error)
            }
          }}
          style={[{
            padding: mvs(10),
            borderTopRightRadius: mvs(20),
            borderBottomRightRadius: mvs(20),
            position: 'absolute',
            alignSelf: position,
            // left: position === 'left' ? 0 : undefined,
            // right: position === 'right' ? 0 : undefined,
            bottom: !isTop ? 0 : undefined,
            top: isTop ? 0 : undefined,

            backgroundColor: colors.primary
          },
          {
            transform: [
              {
                translateX: startValue,
              },
            ],
          }
          ]}>
          <Regular label={'Facebook'} color={colors.white} />
        </TouchableOpacity>
        {/* </View> */}
        <View>
          {/* <FlatList
            ListEmptyComponent={<EmptyList label={t('no_video')} />}
            // contentContainerStyle={styles.contentContainerStyle}
            // showsVerticalScrollIndicator={false}
            data={allVideos}
            renderItem={({ item, index }) => {
              return <Image
                resizeMode='contain'
                source={{ uri: `file://${item?.video_path}` }}
                style={{ width: "100%", height: 200, backgroundColor: 'lightblue', padding:5 }}
              />
            }}
            keyExtractor={(item, index) => index?.toString()}
          /> */}

        </View>
      </View>

    </View>
  );
};
export default Home;

