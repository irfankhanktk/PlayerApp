import { Liked, SpecialistLocation } from 'assets/icons';
import * as IMG from 'assets/images';
import { Row } from 'components/atoms/row';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Medium from '../../../typography/medium-text';

const DoctorPersonalInfo = ({
  name = 'Dr. Shruti Kedia',
  subTitle = 'Dermatalogist, Cosmetologist',
  qualification = '',
  rating = '',
  location = '',
  image,
  fee = 0,
  style,
  onPress
}) => {
  return (
    <Row style={[styles.container, style]}>
      <View style={styles.imgContainer}
      >
        <Image source={image ? { uri: image } : IMG.Doctor_Appointment} style={{ height: mvs(80), width: mvs(60), }} />
      </View>
      <View style={styles.leftContainer}>
        <Bold label={name} fontSize={mvs(20)} />
        <Medium label={subTitle} fontSize={mvs(14)} />
        {!qualification ? null : <>
          <Medium label={qualification} fontSize={mvs(14)} />
        </>}
        {!rating ? null : <>
          <Row style={{ justifyContent: 'flex-start' }}>
            <Liked />
            <Regular fontSize={mvs(12)} label={rating} style={{ marginLeft: mvs(10), }} />
          </Row>
        </>}
        {!location ? null : <>
          <Row style={{ justifyContent: 'flex-start' }}>
            <SpecialistLocation />
            <Regular fontSize={mvs(12)} label={location} style={{ marginLeft: mvs(10), }} />
          </Row>
          <Regular fontSize={mvs(12)} label={`Fee: Rs. ${fee}`} />
        </>}
      </View>
    </Row>
  );
};
export default React.memo(DoctorPersonalInfo);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  imgContainer: {
    height: mvs(99),
    width: mvs(105),
    backgroundColor: colors.secondary,
    borderRadius: mvs(5),
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  img: { height: mvs(33), width: mvs(33) },
  leftContainer: {
    marginLeft: mvs(15),
    flex: 1,
    justifyContent: 'center'
  },
  title: { justifyContent: 'center', textAlign: 'center' },
});
