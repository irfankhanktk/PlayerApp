import * as IMG from 'assets/images';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
import Medium from '../../../typography/medium-text';

const PopularPatientCard = ({
  name = 'Dr. Shruti Kedia',
  subTitle = 'Dermatalogist, Cosmetologist',
  experience = '',
  rating = '',
  image,
  fee = 0,
  style,
  onPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imgContainer}>
        <Image
          source={image ? {uri: image} : IMG.login_bg}
          style={styles.img}
        />
      </View>
      <View style={styles.profile}>
        <Medium label={name} fontSize={mvs(20)} />
        {/* <Medium label={subTitle} fontSize={mvs(14)} color={colors.primary} /> */}
      </View>
    </View>
  );
};
export default React.memo(PopularPatientCard);
const styles = StyleSheet.create({
  container: {
    marginRight: mvs(10),
    // width: width - mvs(120)
  },
  imgContainer: {
    height: mvs(180),
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: mvs(5),
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },
  img: {
    height: mvs(170),
    width: mvs(140),
    borderTopRightRadius: mvs(10),
    borderTopLeftRadius: mvs(10),
  },
  profile: {
    marginTop: mvs(15),
    flex: 1,
    justifyContent: 'center',
  },
  title: {justifyContent: 'center', textAlign: 'center'},
});
