import { colors } from 'config/colors';
import { mvs, width } from 'config/metrices';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
const SwiperCard = () => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        scrollEnabled={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        style={styles.wrapper}
        showsButtons={false}>
        <View style={styles.slide}>
          {/* <Image source={Img_Slider1} style={styles.sliderImage} /> */}
        </View>
        <View style={styles.slide}>
          {/* <Image source={Img_Slider2} style={styles.sliderImage} /> */}
        </View>
        <View style={styles.slide}>
          {/* <Image source={Img_Slider3} style={styles.sliderImage} /> */}
        </View>
      </Swiper>
    </View>
  );
};
export default SwiperCard;

const styles = StyleSheet.create({
  container: {
    height: mvs(220),
    // marginHorizontal: mvs(20),
    marginTop: mvs(30),
  },
  sliderImage: {
    width: width - mvs(40),
    height: mvs(180),
    borderRadius: mvs(18),
    resizeMode: 'cover',
  },
  dotStyle: { marginBottom: -mvs(40) },
  activeDotStyle: { marginBottom: -mvs(40), backgroundColor: colors.primary },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
