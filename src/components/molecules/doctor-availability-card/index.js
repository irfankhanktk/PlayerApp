import { Row } from 'components/atoms/row';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Icon from 'react-native-vector-icons/AntDesign';

const DoctorAvailabilityCard = ({
  startTime,
  endTime,
  day,
  hospitals
  , style,
  onPressEdit = () => { },
  onPressDel = () => { },
  deleteLoading = false
}) => {
  return (
    <View style={styles.container}>
      <Row>
        <Medium style={styles.address} label={`${day || ''}`} fontSize={mvs(16)} />
        <Row>
          <TouchableOpacity
            onPress={onPressDel}
            disabled={deleteLoading}
            style={{ padding: mvs(3), marginHorizontal: mvs(10) }}>
            {deleteLoading ? <ActivityIndicator size={'small'} color={colors.primary} />
              : <Icon name={'delete'} color={colors.primary} size={mvs(15)} />}
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ padding: mvs(3) }}>
            <Icon name={'edit'} color={colors.primary} size={mvs(15)} />
          </TouchableOpacity> */}
        </Row>
      </Row>
      <Row style={{ borderBottomWidth: StyleSheet.hairlineWidth, justifyContent: 'flex-start', marginVertical: mvs(5), alignItems: 'center', }}>
        <Icon name={'clockcircle'} color={colors.primary} size={mvs(15)} />
        <Regular label={`${startTime} -> ${endTime}`} style={{ color: colors.primary, marginHorizontal: mvs(5), fontSize: mvs(18), lineHeight: mvs(25), }} />
      </Row>
    </View>
  );
};
export default React.memo(DoctorAvailabilityCard);
const styles = StyleSheet.create({
  container: {
    padding: mvs(13),
    flex: 1,
    marginBottom: mvs(20),
    borderRadius: mvs(10),
    backgroundColor: colors.white,
    ...colors.shadow,
    // borderWidth: StyleSheet.hairlineWidth,
  },
  address: { width: mvs(250) },
  availableTime: { alignItems: 'center', },
  dot: {
    height: mvs(7),
    width: mvs(7),
    borderRadius: mvs(3.5),
    backgroundColor: colors.green,
    marginRight: mvs(6)
  }
});
