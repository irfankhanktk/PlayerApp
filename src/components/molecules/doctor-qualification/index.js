import * as IMG from 'assets/images';
import { Row } from 'components/atoms/row';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Medium from '../../../typography/medium-text';

const DoctorQualification = ({
  experience,
  wait,
  rate,
  style,
  onPress
}) => {
  return (
    <Row style={styles.container}>
      <View style={styles.portion}>
        <Medium label={`${wait} Min`} />
        <Regular label={'Wait Time'} />
      </View>
      <View style={styles.portion}>
        <Medium label={`${experience || 0} Years`} />
        <Regular label={'Experience'} />
      </View>
      <View style={styles.portion}>
        <Medium label={`${rate} (5.0)`} />
        <Regular label={'Satisfied'} />
      </View>
    </Row>
  );
};
export default React.memo(DoctorQualification);
const styles = StyleSheet.create({
  container: {
    marginTop: mvs(20)
  },
  portion: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  }
});
