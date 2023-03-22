import React from 'react';
import { StyleSheet, View } from 'react-native';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';

const DescriptionCard = ({ description, style, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <Regular
        style={{ lineHeight: mvs(16) }}
        numberOfLines={3} color={colors.white}
        fontSize={mvs(12)} label={description || 'Short description will be here'} />
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
      </View>
    </View>
  );
};
export default React.memo(DescriptionCard);
const styles = StyleSheet.create({
  container: {
    marginVertical: mvs(15),
    backgroundColor: colors.primary,
    height: mvs(79),
    borderRadius: mvs(15),
    paddingHorizontal: mvs(20),
    paddingTop: mvs(20),
    paddingBottom: mvs(10)
  },
  dotContainer: {
    position: 'absolute',
    top: mvs(-13),
    borderRadius: mvs(20),
    left: mvs(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: mvs(20),
    width: mvs(20)
  },
  dot: {
    height: mvs(9),
    width: mvs(9),
    borderRadius: mvs(4.5),
    backgroundColor: colors.red
  }
});
