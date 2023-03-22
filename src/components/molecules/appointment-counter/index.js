import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';

const AppointmentCounter = ({ value, label, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Medium
        style={styles.value}
        numberOfLines={1}
        color={colors.primary}
        label={value} />
      <Regular
        style={styles.label}
        label={label} />

    </TouchableOpacity>
  );
};
export default React.memo(AppointmentCounter);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blueHalf,
    flex: 1,
    marginHorizontal: mvs(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: mvs(10),
    paddingHorizontal: mvs(5),
    paddingTop: mvs(20),
    paddingBottom: mvs(10)
  },
  value: {
    lineHeight: mvs(22),
    fontSize: mvs(18)
  },
  label: {
    lineHeight: mvs(16), fontSize: mvs(12), color: colors.primary
  }
});
