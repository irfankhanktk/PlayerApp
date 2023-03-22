import { SpecialistLocation } from 'assets/icons';
import { Row } from 'components/atoms/row';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import AntDesign from 'react-native-vector-icons/AntDesign'
const DoctorAvailabilityLocation = ({ item, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Row>
        <Medium label={item?.hospitals?.title} fontSize={mvs(15)} />
        <Regular label={`RS. ${item?.price}`} />
      </Row>
      <Row style={{ justifyContent: 'flex-start' }}>
        <SpecialistLocation />
        <Medium label={item?.hospitals?.address} style={{ marginHorizontal: mvs(10) }} />
      </Row>
      <Row>
        <Row style={styles.availableTime}>
          <View style={styles.dot} />
          <Regular label={`Available ${item?.day}`} color={colors.green} />
        </Row>
        <TouchableOpacity style={{ height: mvs(22), width: mvs(22), justifyContent: 'center', alignItems: 'center', borderRadius: mvs(11), backgroundColor: colors.blueHalf }}>
          <AntDesign name='right' size={mvs(12)} />
        </TouchableOpacity>
      </Row>
    </TouchableOpacity>
  );
};
export default React.memo(DoctorAvailabilityLocation);
const styles = StyleSheet.create({
  container: {
    padding: mvs(13),
    borderRadius: mvs(10),
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: mvs(20),
  },
  availableTime: { alignItems: 'center', },
  dot: {
    height: mvs(7),
    width: mvs(7),
    borderRadius: mvs(3.5),
    backgroundColor: colors.green,
    marginRight: mvs(6)
  }
});
