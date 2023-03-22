import * as IMG from 'assets/images';
import { Row } from 'components/atoms/row';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Medium from '../../../typography/medium-text';

const PatientCheckoutCard = ({
  name = 'Dr. Shruti Kedia',
  address = '',
  experience = '1 Years experience',
  image,
  style,
  onPress
}) => {
  return (
    <Row style={[styles.container, style]}>
      <View style={styles.imgContainer}>
        <Image source={image ? { uri: image } : IMG.login_bg} style={styles.img} />
      </View>
      <View style={styles.profile}>
        <Medium label={name} fontSize={mvs(20)} />
        <Regular numberOfLines={2} label={address} fontSize={mvs(13)} color={colors.primary} />
        <Regular label={experience} fontSize={mvs(13)} color={colors.lightGray} />
      </View>
    </Row>
  );
};
export default React.memo(PatientCheckoutCard);
const styles = StyleSheet.create({
  container: {
    // width: width - mvs(120)
    backgroundColor: colors.white,
    ...colors.shadow,
    borderRadius: mvs(10),
    padding: mvs(15),

  },
  imgContainer: {
    height: mvs(120),
    width: mvs(120),
    backgroundColor: colors.secondary,
    borderRadius: mvs(5),
    alignItems: 'center'
  },
  img: {
    height: mvs(100),
    width: mvs(100),
    borderTopRightRadius: mvs(10),
    borderTopLeftRadius: mvs(10)
  },
  profile: {
    marginHorizontal: mvs(10),
    flex: 1,
    // justifyContent: 'center'
  },
  title: { justifyContent: 'center', textAlign: 'center' },
  heart: {
    position: 'absolute',
    alignSelf: 'flex-end',
  }
});
