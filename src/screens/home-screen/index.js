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
import { FlatList, ImageBackground, ScrollView, View, Text,PermissionsAndroid } from 'react-native';
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
let videoURL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
let videoURL2 = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1";
let videoURL3 = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
let videoURL4 = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const VIDEOLIST = [
  {
    uri:videoURL,
    title: "VIDEO 1",
    time: 20,
    repeat:true
  },
  {
    uri:videoURL2,
    title: "VIDEO 2",
    time: 10,
    repeat:false
  },
  {
    uri:videoURL3,
    title: "VIDEO 3",
    time: 10,
    repeat:false
  },
  {
    uri:videoURL4,
    title: "VIDEO 4",
    time: 15,
    repeat:false
  },
]
const Home = props => {
  const { userInfo, unreadNotification, location } = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const { t } = i18n;
  const [homeData, setHomeData] = React.useState({});
  const [videos, setVideos] = React.useState(VIDEOLIST)
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0)
  const [timeLimit, setTimeLimit] = React.useState(20)
  const [isNext, setIsNext] = React.useState(null)
  const videoRef = React.useRef()
  React.useEffect(() => {
    if(isNext){
      console.log("Play next ? ", isNext)
      playNext()
      // setIsNext(false)
    }else{
    }
  }, [isNext])
  React.useEffect(() => {
    // const intervalId = setInterval(()=>setCurrentVideoIndex((currentIndex)=>(currentIndex + 1) % videos.length), 35000)
    // return ()=>clearInterval(intervalId)
  }, [])
  const onDownloadImagePress=()=> {
    RNFS.downloadFile({
      fromUrl: 'https://facebook.github.io/react-native/img/header_logo.png',
      toFile: `${RNFS.DocumentDirectoryPath}/react-native.png`,
    }).promise.then((r) => {
      console.log("DOWNLOADED=====> ", r)
    });
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
      console.log('You write now');
    } else {
      console.log('Write permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

React.useEffect(()=>{},[])
  const onProgress = (progress) => {
    const { currentTime, playableDuration } = progress
    // console.log("CURRENT TIME REF===> ", videoRef?.current?.onSeek)
    // console.log({currentTime})
    if (videos[currentVideoIndex].time <= currentTime && !isNext === true) {
      setIsNext(true)
      console.log("TIME LIMIT EXCEEDS: ", timeLimit <= currentTime, "\nVIDEO END: ", playableDuration <= currentTime)
      // playNext()
    }
  }
  const playNext = () => {
    if(videos[currentVideoIndex].repeat){
      videoRef?.current?.seek(0);
    }else
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
    if(buffer?.isBuffering === false) setIsNext(false)
  }
  const videoError = (error) => {
    console.log("=======================VIDEO ERROR===================", error)
  }
  return (
    <View style={styles.container}>
      <AppHeader
        unreadNotification={unreadNotification}
        title={`\t${userInfo?.name || t('guest')}`}
      />
      {/* <View style={styles.search}>
        <SearchInput value="" />
      </View> */}
      <View style={styles.container}>
        {/* <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <ImageBackground source={appointment_bg} style={styles.bgImg}>
            <Regular
              label={t('appointments')}
              style={{ fontSize: mvs(24), color: colors.primary }}
            />
          </ImageBackground>
          <Row
            style={{
              ...colors.shadow,
              borderRadius: mvs(15),
              backgroundColor: colors.white,
              paddingVertical: mvs(10),
              marginVertical: mvs(20),
            }}>
            <AppointmentCounter
              onPress={() => navigate('AppointmentsList', { status: 'total' })}
              value={homeData?.counterAppointment?.total ?? '-'}
              label={t('total')}
            />
            <AppointmentCounter
              onPress={() => navigate('AppointmentsList', { status: 'waiting' })}
              value={homeData?.counterAppointment?.waiting ?? '-'}
              label={t('waiting')}
            />
            <AppointmentCounter
              onPress={() =>
                navigate('AppointmentsList', { status: 'confirmed' })
              }
              value={homeData?.counterAppointment?.confirmed ?? '-'}
              label={t('confirmed')}
            />
            <AppointmentCounter
              onPress={() =>
                navigate('AppointmentsList', { status: 'completed' })
              }
              value={homeData?.counterAppointment?.completed ?? '-'}
              label={t('completed')}
            />
          </Row>
          <Row>
            <IconButton icon={'user'} title={t('patients')} />
            <IconButton
              icon={'wallet'}
              title={t('payments')}
              containerStyle={{
                backgroundColor: colors.green,
              }}
            />
          </Row>
          <Bold
            label={t('popular_patients')}
            style={{
              fontSize: mvs(20),
              marginBottom: mvs(10),
              marginTop: mvs(20),
            }}
          />
          <FlatList
            horizontal
            ListEmptyComponent={<EmptyList label={t('no_patients')} />}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            data={homeData?.patients}
            renderItem={({ item, index }) => {
              return <PopularPatientCard key={index} name={item?.name} />;
            }}
            keyExtractor={(item, index) => index?.toString()}
          />
        </ScrollView> */}
        <View style={styles.videoView}>
          <Video
            // source={localVideo}   // Can be a URL or a local file.
            source={{ uri:convertToProxyURL(videos[currentVideoIndex]?.uri)}}   // Can be a URL or a local file.
            controls={true}
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
        </View>
      </View>
    </View>
  );
};
export default Home;

