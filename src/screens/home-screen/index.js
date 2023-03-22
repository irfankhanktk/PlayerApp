import { useIsFocused } from '@react-navigation/native';
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
import localVideo from "./local.mp4"
import { FlatList, ImageBackground, ScrollView, View, Text } from 'react-native';
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
let videoURL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const Home = props => {
  const { userInfo, unreadNotification, location } = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const { t } = i18n;
  const [homeData, setHomeData] = React.useState({});
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
            source={{ uri: videoURL }}   // Can be a URL or a local file.
            controls={true}
            ref={(ref) => {
              let player = ref
              console.log("PLAYER===> ")
            }}                                      // Store reference
            onBuffer={(b) => onBuffer(b)}                // Callback when remote video is buffering
            onError={(e) => videoError(e)}               // Callback when video cannot be loaded
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

